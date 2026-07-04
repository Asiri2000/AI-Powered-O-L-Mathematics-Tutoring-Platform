const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');

const DEFAULT_MODEL = 'gemini-1.5-flash-latest';

const MODEL_FALLBACKS = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-1.5-flash"
];

let MODEL_CACHE = { models: [], fetchedAt: 0 };

/**
 * Detects whether the input is math-related to adjust generation
 * temperature (0 for math, 0.9 for general conversation).
 */
function isMathLike(text) {
  if (!text || typeof text !== 'string') return false;
  const t = text.toLowerCase();
  return /[=^]/.test(t) || /(solve|equation|simplify|derivative|integral|roots?|factor)/.test(t);
}

/**
 * Parse a quadratic equation string like "x^2 + 5x + 6 = 0"
 * into { a, b, c } coefficients.
 * Supports implicit 1, negative coefficients, decimals.
 */
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
    const v = m[1];
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

/**
 * Solve a quadratic equation given { a, b, c }.
 * Returns real, repeated, or complex roots as a formatted string.
 */
function solveQuadratic({ a, b, c }) {
  const D = b * b - 4 * a * c;
  const twoA = 2 * a;

  if (D > 0) {
    const r1 = (-b + Math.sqrt(D)) / twoA;
    const r2 = (-b - Math.sqrt(D)) / twoA;
    return `Real roots: x\u2081 = ${r1}, x\u2082 = ${r2}`;
  } else if (D === 0) {
    const r = -b / twoA;
    return `Repeated real root: x = ${r}`;
  } else {
    const real = -b / twoA;
    const imag = Math.sqrt(-D) / twoA;
    return `Complex roots: x\u2081 = ${real} + ${imag}i, x\u2082 = ${real} - ${imag}i`;
  }
}

/**
 * Fetch available Gemini models from the Google API, deduplicate by name,
 * and warm MODEL_CACHE for use by runChat().
 */
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
      // endpoint unreachable, try next
    }
  }

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

/**
 * Build a system prompt tailored to the requested language.
 * @param {'en'|'si'} lang
 * @returns {string}
 */
function buildSystemPrompt(lang) {
  const base = `You are a mathematics tutor for G.C.E. Ordinary Level students in Sri Lanka (grades 10-11).

CRITICAL FORMATTING RULES — follow these exactly:
1. NEVER use LaTeX or dollar-sign math: no $...$ or $$...$$. The chat app cannot render it.
2. Use PLAIN Unicode math symbols instead:
   - π (pi), ² ³ (squared/cubed), √ (root), ÷ (divide), × (multiply)
   - ± (plus-minus), ∠ (angle), △ (triangle), ° (degrees), ₁ ₂ (subscripts)
   - → (arrow), ≤ ≥ (inequalities), ≠ (not equal), ≈ (approximately)
3. Write formulas as plain text. Examples:
   - "Area = π × r²"    NOT  "$Area = \\pi r^2$"
   - "x = (-b ± √(b² - 4ac)) / 2a"   NOT  "$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$"
   - "sin²θ + cos²θ = 1"   NOT  "$\\sin^2\\theta + \\cos^2\\theta = 1$"
4. Use **bold** for headings and important terms: **Step 1:**, **Formula:**, **Answer:**
5. Use plain numbered steps: 1. 2. 3. (not markdown lists)

STYLE RULES:
- Be CONCISE: 4-8 short paragraphs, not long essays
- Focus on Sri Lankan O/L syllabus: algebra, geometry, trigonometry, stats, probability, sets, graphs, mensuration, number systems
- Show each step clearly like a teacher writing on a blackboard
- End every response with **Answer:** followed by the final result`;

  if (lang === 'si') {
    return `${base}

LANGUAGE: Respond COMPLETELY in SINHALA (සිංහල). Write every word, every explanation, every step in Sinhala. Use Sinhala mathematical terms familiar to O/L students (e.g., අරය for radius, වර්ගඵලය for area, පරිමිතිය for perimeter, සමීකරණය for equation, පයිතගරස් ප්‍රමේය for Pythagorean theorem). Keep mathematical symbols and formulas in standard notation (π, ², √, =, +, -, ×, ÷) — only the explanatory text should be in Sinhala.`;
  }

  return `${base}

LANGUAGE: Respond in ENGLISH. Use simple, clear English suitable for Sri Lankan students.`;
}
/**
 * Run a chat message through Gemini AI with model fallback.
 * Tries preferredModel first, then MODEL_FALLBACKS,
 * filtering by cached models that support generateContent.
 *
 * @param {string} userInput - The user's chat message
 * @param {'en'|'si'} language - Response language ('en' = English, 'si' = Sinhala)
 * @param {string|null} preferredModel - Optional model override
 */
async function runChat(userInput, language = 'en', preferredModel = null) {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    throw new Error('Missing GEMINI_API_KEY in server environment');
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const modelName = preferredModel || process.env.GEMINI_MODEL_NAME || DEFAULT_MODEL;

  let modelCandidates = [modelName, ...MODEL_FALLBACKS].filter(
    (m, idx, arr) => m && arr.indexOf(m) === idx
  );

  if (MODEL_CACHE.models && MODEL_CACHE.models.length) {
    const allowed = new Set(
      MODEL_CACHE.models
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
    maxOutputTokens: 4096,
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
                text: buildSystemPrompt(language),
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

module.exports = {
  isMathLike,
  parseQuadratic,
  solveQuadratic,
  fetchAvailableModels,
  runChat,
  buildSystemPrompt,
  getModelCache: () => MODEL_CACHE,
};
