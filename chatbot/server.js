// node --version # Should be >= 18
// npm install @google/generative-ai express dotenv

const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Prefer a supported free/low-cost Gemini model ID; allow override via env
const MODEL_NAME = process.env.MODEL_NAME || "gemini-2.5-flash";
const API_KEY = process.env.API_KEY;
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
  
  // Use v1beta to ensure newer models like 2.5 Flash are reliably fetched
  const endpoints = [
    `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(API_KEY)}`,
  ];
  
  const results = [];
  for (const url of endpoints) {
    try {
      const r = await fetch(url, { method: 'GET' });
      if (!r.ok) continue;
      
      const data = await r.json();
      const models = Array.isArray(data.models) ? data.models : [];
      for (const m of models) {
        results.push({
          name: m.name.replace('models/', ''), // Strip prefix for cleaner usage
          displayName: m.displayName,
          methods: m.supportedGenerationMethods || [],
        });
      }
    } catch (_) {
      // ignore endpoint errors, try next
    }
  }
  
  // De-duplicate by name
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

async function runChat(userInput, preferredModel = MODEL_NAME) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  
  // Updated list of the most current and cost-effective active models
  let modelCandidates = [
    preferredModel,
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-1.5-flash"

   
  ].filter((m, idx, arr) => m && arr.indexOf(m) === idx);

  let lastErr;

  const generationConfig = {
    temperature: isMathLike(userInput) ? 0 : 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    }
  ];

  for (const m of modelCandidates) {
    try {
      console.log(`[gemini] trying model: ${m}`);
      
      // Pass the system prompt directly into the model initialization
      const model = genAI.getGenerativeModel({ 
        model: m,
        systemInstruction: "You are a helpful assistant. Answer user questions clearly and concisely. For math, show correct steps and prefer exact forms when reasonable."
      });
      
      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [] // Start with an empty history array to avoid role alternation errors
      });
      
      const result = await chat.sendMessage(userInput);
      return result.response.text();
      
    } catch (err) {
      lastErr = err;
      const msg = String(err && err.message ? err.message : err);
      const isModelNotFound = msg.includes("404 Not Found") || msg.includes("is not found") || msg.includes("not supported");
      
      if (!isModelNotFound) {
        // Non-model error (e.g. invalid API key, safety block); stop trying further
        break;
      }
      // Else continue to the next fallback candidate
    }
  }
  
  throw lastErr || new Error("No working Gemini model found. Please check your API key and network.");
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
    console.log('Incoming /chat req:', userInput);
    
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
  // Warm the model cache in the background
  fetchAvailableModels().catch(() => {});
});