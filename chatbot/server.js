// node --version # Should be >= 18
// npm install @google/generative-ai express

const express = require('express');
const path = require('path');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// Serve static files from chatbot directory and KaTeX assets from node_modules
app.use(express.static(__dirname));
app.use('/katex', express.static(path.join(__dirname, 'node_modules', 'katex', 'dist')));
// Prefer a supported free Gemini model; allow override via env
const MODEL_NAME = process.env.MODEL_NAME || "gemini-1.5-flash-latest";
const API_KEY = process.env.API_KEY;
// New: configurable output tokens (increase default)
const MAX_OUTPUT_TOKENS = Math.max(1, Number(process.env.MAX_OUTPUT_TOKENS) || 8192);
let MODEL_CACHE = { models: [], fetchedAt: 0 };
const MATH_SOLVER_ENABLED = process.env.MATH_SOLVER_ENABLED !== 'false';

function isMathLike(text) {
  if (!text || typeof text !== 'string') return false;
  const t = text.toLowerCase();
  return /[=^]/.test(t) || /(solve|equation|simplify|derivative|integral|roots?|factor)/.test(t);
}

function parseQuadratic(text) {
  if (!text || typeof text !== 'string') return null;
  let s = text.replace(/\s+/g, '');
  // Find the part before '=0' and ignore trailing text
  const mEq = s.match(/(.+)=0/);
  if (!mEq) return null;
  const lhs = mEq[1];

  // Extract coefficients (supports optional +/- and omitted 1)
  const aMatch = lhs.match(/([+-]?\d*\.?\d*)x\^2/);
  const bMatch = lhs.match(/([+-]?\d*\.?\d*)x(?!\^)/);
  // constant: numbers not followed by x
  const cMatch = lhs.match(/([+-]?\d*\.?\d+)(?!x)/);
  if (!aMatch || !bMatch || !cMatch) return null;
  const parseCoeff = (m, defaultVal) => {
    if (!m) return defaultVal;
    let v = m[1];
    if (v === '' || v === '+' || v === '-') {
      return v === '-' ? -1 : 1;
    }
    return parseFloat(v);
  };
  const a = parseCoeff(aMatch, null);
  const b = parseCoeff(bMatch, 0);
  const c = parseCoeff(cMatch, 0);
  if (a === null) return null;
  return { a, b, c };
}

function solveQuadratic({ a, b, c }) {
  const D = b * b - 4 * a * c;
  const twoA = 2 * a;
  if (D > 0) {
    const r1 = (-b + Math.sqrt(D)) / twoA;
    const r2 = (-b - Math.sqrt(D)) / twoA;
    return `Real roots: x1 = ${r1}, x2 = ${r2}`;
  } else if (D === 0) {
    const r = -b / twoA;
    return `Repeated real root: x = ${r}`;
  } else {
    const real = -b / twoA;
    const imag = Math.sqrt(-D) / twoA;
    return `Complex roots: x1 = ${real} + ${imag}i, x2 = ${real} - ${imag}i`;
  }
}

async function fetchAvailableModels() {
  if (!API_KEY) {
    throw new Error('Missing API_KEY in server environment');
  }
  const endpoints = [
    `https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(API_KEY)}`,
    `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(API_KEY)}`,
  ];
  const results = [];
  for (const url of endpoints) {
    try {
      const r = await fetch(url, { method: 'GET' });
      if (!r.ok) {
        continue;
      }
      const data = await r.json();
      const models = Array.isArray(data.models) ? data.models : [];
      for (const m of models) {
        results.push({
          name: m.name,
          displayName: m.displayName,
          methods: m.supportedGenerationMethods || [],
        });
      }
    } catch (_) {
      // ignore endpoint errors, try next
    }
  }
  // de-duplicate by name
  const dedup = [];
  const seen = new Set();
  for (const m of results) {
    if (!seen.has(m.name)) {
      seen.add(m.name);
      dedup.push(m);
    }
  }
  MODEL_CACHE = { models: dedup, fetchedAt: Date.now() };
  return dedup;
}

function formatMathResponse(text) {
  if (!text || typeof text !== 'string') return '';
  
  // Protect math ($...$, $$...$$) and code (`...`, ```...```) from formatting
  const protectRegex = /(\$\$[\s\S]*?\$\$|\$[^$]+\$|```[\s\S]*?```|`[^`]+`)/g;
  const parts = [];
  let last = 0;
  let m;
  
  while ((m = protectRegex.exec(text)) !== null) {
    if (m.index > last) {
      parts.push({ type: 'text', value: text.slice(last, m.index) });
    }
    parts.push({ type: 'protected', value: m[0] });
    last = protectRegex.lastIndex;
  }
  if (last < text.length) {
    parts.push({ type: 'text', value: text.slice(last) });
  }

  const processText = (s) => {
    s = s.replace(/\r\n/g, '\n');
    
    // Bold: **any text** → <strong>any text</strong>
    // Match ** followed by at least one character (non-greedy) until closing **
    // Allow any content between (including spaces, newlines, punctuation)
    s = s.replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>');
    
    // Make common headings bold
    s = s.replace(/(^|\n)\s*Solution:\s*/gi, '$1<strong>Solution</strong>\n');
    s = s.replace(/(^|\n)\s*(Step\s*\d+:)/gi, (match, p1, p2) => `${p1}<strong>${p2}</strong>`);
    s = s.replace(/(^|\n)\s*(The Core Formula)\s*(:)?/gi, (match, p1, title, colon) => `${p1}<strong>${title}</strong>${colon ? ':' : ''}\n`);
    
    // Collapse excessive blank lines
    s = s.replace(/\n{3,}/g, '\n\n');
    
    return s;
  };

  const formatted = parts.map(p => (p.type === 'text' ? processText(p.value) : p.value)).join('');
  return formatted.trim();
}

function getFinishReason(resp) {
  try {
    const c = resp?.candidates?.[0];
    // Library may use different casing/keys; handle both
    return c?.finishReason || c?.finish_reason || null;
  } catch {
    return null;
  }
}

async function runChat(userInput, preferredModel = MODEL_NAME) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  let modelCandidates = [
    // Prefer Pro first for longer, more complete outputs
    preferredModel,
    "gemini-1.5-pro-latest",
    "gemini-1.5-pro",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
    "gemini-1.0-pro",
  ].filter((m, idx, arr) => m && arr.indexOf(m) === idx);
  // If we have cached models, prefer those that support generateContent
  if (MODEL_CACHE.models && MODEL_CACHE.models.length) {
    const allowed = new Set(
      MODEL_CACHE.models
        .filter(m => Array.isArray(m.methods) && m.methods.includes('generateContent'))
        .map(m => m.name)
    );
    modelCandidates = modelCandidates.filter(m => allowed.has(m));
    // If env-specified preferred model is not allowed, append the first allowed model
    if (!modelCandidates.length && allowed.size) {
      modelCandidates = Array.from(allowed);
    }
  }
  let lastErr;

  const generationConfig = {
    temperature: isMathLike(userInput) ? 0 : 0.9,
    topK: 1,
    topP: 1,
    // New: larger budget for longer answers
    maxOutputTokens: MAX_OUTPUT_TOKENS,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];

  const startChatWith = (model) => model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "You are a helpful math tutor. Answer user questions clearly and concisely. For math problems:\n1. Show all steps in order\n2. Separate each major step on a new line\n3. Use proper mathematical notation\n4. For equations, put each significant equation on its own line\n5. List final solutions clearly at the end\nIf the solution is long, continue in additional messages until complete.\nFormat your response for readability with proper spacing between steps." }],
      },
    ],
  });

  for (const m of modelCandidates) {
    try {
      console.log(`[gemini] trying model: ${m}`);
      const model = genAI.getGenerativeModel({ model: m });
      const chat = startChatWith(model);

      // First message
      const first = await chat.sendMessage(userInput);
      let aggregated = first.response.text();
      let finish = getFinishReason(first.response);
      console.log('finishReason:', finish);

      // Auto-continue if the model stopped due to token limit
      let continues = 0;
      const MAX_CONTINUES = 4; // guard to avoid infinite loops
      while (finish && String(finish).toUpperCase().includes('MAX') && continues < MAX_CONTINUES) {
        const cont = await chat.sendMessage("Continue the solution from where you stopped. Do not repeat previous steps.");
        aggregated += "\n" + cont.response.text();
        finish = getFinishReason(cont.response);
        continues++;
      }

      if (isMathLike(userInput)) {
        return formatMathResponse(aggregated);
      }
      return aggregated;
    } catch (err) {
      lastErr = err;
      const msg = String(err && err.message ? err.message : err);
      const isModelNotFound = msg.includes("404 Not Found") || msg.includes("is not found") || msg.includes("not supported for generateContent");
      if (!isModelNotFound) {
        break;
      }
    }
  }
  throw lastErr || new Error("No working Gemini model found");
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
// Utility endpoint to list available models and supported methods
app.get('/models', async (req, res) => {
  try {
    const models = await fetchAvailableModels();
    res.json({ models });
  } catch (e) {
    console.error('Error listing models:', e);
    res.status(500).json({ error: 'Failed to list models', details: String(e.message || e) });
  }
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    if (MATH_SOLVER_ENABLED) {
      const quad = parseQuadratic(userInput);
      if (quad) {
        const solution = solveQuadratic(quad);
        return res.json({ response: solution, source: 'deterministic' });
      }
    }
    const response = await runChat(userInput);
    res.json({ response, source: 'model' });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  // Warm the model cache in background
  fetchAvailableModels().catch(() => {});
});
