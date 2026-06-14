const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');

const DEFAULT_MODEL = 'gemini-1.5-flash-latest';

const MODEL_FALLBACKS = [
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash',
  'gemini-1.5-pro-latest',
  'gemini-1.5-pro',
  'gemini-1.0-pro',
];

/**
 * =========================
 * 🔢 QUADRATIC EQUATION SOLVER
 * =========================
 */

function isMathLike(text) {
  if (!text || typeof text !== 'string') return false;
  const t = text.toLowerCase();
  return (
    /[=^]/.test(t) ||
    /(solve|equation|simplify|derivative|integral|roots?|factor)/.test(t)
  );
}

function parseQuadratic(text) {
  if (!text || typeof text !== 'string') return null;
  const s = text.replace(/\s+/g, '');
  const mEq = s.match(/(.+)=0/);
  if (!mEq) return null;
  const lhs = mEq[1];

  const aMatch = lhs.match(/([+-]?\d*\.?\d*)x\^2/);
  const bMatch = lhs.match(/([+-]?\d*\.?\d*)x(?!\^)/);
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
    return `Real roots: x₁ = ${r1}, x₂ = ${r2}`;
  } else if (D === 0) {
    const r = -b / twoA;
    return `Repeated real root: x = ${r}`;
  } else {
    const real = -b / twoA;
    const imag = Math.sqrt(-D) / twoA;
    return `Complex roots: x₁ = ${real} + ${imag}i, x₂ = ${real} - ${imag}i`;
  }
}

/**
 * =========================
 * 🤖 GEMINI AI INTEGRATION
 * =========================
 */

let modelCache = { models: [], fetchedAt: 0 };

async function fetchAvailableModels() {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    throw new Error('Missing GEMINI_API_KEY in server environment');
  }

  const endpoints = [
    `https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(API_KEY)}`,
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
          name: m.name,
          displayName: m.displayName,
          methods: m.supportedGenerationMethods || [],
        });
      }
    } catch (_) {
      // skip endpoint errors
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

  modelCache = { models: dedup, fetchedAt: Date.now() };
  return dedup;
}

async function runChat(userInput, preferredModel = null) {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    throw new Error('Missing GEMINI_API_KEY in server environment');
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const modelName = preferredModel || process.env.GEMINI_MODEL_NAME || DEFAULT_MODEL;

  let modelCandidates = [modelName, ...MODEL_FALLBACKS].filter(
    (m, idx, arr) => m && arr.indexOf(m) === idx
  );

  // Filter by cached models that support generateContent
  if (modelCache.models && modelCache.models.length) {
    const allowed = new Set(
      modelCache.models
        .filter((m) => Array.isArray(m.methods) && m.methods.includes('generateContent'))
        .map((m) => m.name)
    );
    modelCandidates = modelCandidates.filter((m) => allowed.has(m));
    if (!modelCandidates.length && allowed.size) {
      modelCandidates = Array.from(allowed);
    }
  }

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
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  let lastErr;

  for (const m of modelCandidates) {
    try {
      console.log(`[chatService] trying model: ${m}`);
      const model = genAI.getGenerativeModel({ model: m });
      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          {
            role: 'user',
            parts: [
              {
                text: 'You are a helpful mathematics tutor for G.C.E. O/L students in Sri Lanka. Answer questions clearly with step-by-step explanations. For math problems, show correct steps and prefer exact forms when reasonable. Use simple language suitable for grade 10-11 students.',
              },
            ],
          },
        ],
      });

      const result = await chat.sendMessage(userInput);
      return result.response.text();
    } catch (err) {
      lastErr = err;
      const msg = String(err && err.message ? err.message : err);
      const isModelNotFound =
        msg.includes('404 Not Found') ||
        msg.includes('is not found') ||
        msg.includes('not supported for generateContent');

      if (!isModelNotFound) {
        break;
      }
    }
  }

  throw lastErr || new Error('No working Gemini model found');
}

function getModelCache() {
  return modelCache;
}

module.exports = {
  isMathLike,
  parseQuadratic,
  solveQuadratic,
  fetchAvailableModels,
  runChat,
  getModelCache,
};
