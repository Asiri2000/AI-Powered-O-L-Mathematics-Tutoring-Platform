// src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

export const registerUser = async (userData) => {
  try {
    // We send JSON. Pydantic aliases handle 'studentName' -> 'full_name' mapping
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const loginUser = async (credentials) => {
  try {
    // FastAPI OAuth2 expects form-data, NOT JSON. We must convert it.
    const params = new URLSearchParams();
    params.append('username', credentials.username);
    params.append('password', credentials.password);

    const response = await axios.post(`${API_URL}/users/login`, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

export const getAllUsers = async () => {
  const token = sessionStorage.getItem('accessToken');
  const response = await axios.get(`${API_URL}/users/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateUserRole = async (userId, newRole) => {
  const token = sessionStorage.getItem('accessToken');
  const response = await axios.put(
    `${API_URL}/users/${userId}/role`, 
    { user_role: newRole }, // Body
    { headers: { Authorization: `Bearer ${token}` } } // Headers
  );
  return response.data;
};

export const deleteUser = async (userId) => {
  const token = sessionStorage.getItem('accessToken');
  await axios.delete(`${API_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getCurrentUser = async () => {
  const token = sessionStorage.getItem('accessToken');
  const response = await axios.get(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
<<<<<<< Updated upstream
};
=======
};

/**
 * =========================
 * 📊 ANALYTICS APIs
 * =========================
 */

// CHAPTER ANALYTICS (LOGGED USER)
export const getChapterAnalytics = async () => {
  const response = await api.get("/analytics/chapters");
  return response.data;
};

// OVERALL SUMMARY (LOGGED USER)
export const getOverallSummary = async () => {
  const response = await api.get("/analytics/summary");
  return response.data;
};

/**
 * =========================
 * 🧠 DIAGNOSIS APIs
 * =========================
 */

export const getErrorBreakdown = async () => {
  const response = await api.get("/diagnosis/errors");
  return response.data;
};

export const getWeakChapters = async () => {
  const response = await api.get("/diagnosis/weaknesses");
  return response.data;
};

/**
 * =========================
 * 📝 QUIZ APIs
 * =========================
 */

// GENERATE QUIZ (JWT REQUIRED)
export const generateQuiz = async (payload) => {
  const response = await api.post("/quiz/generate", payload);
  return response.data;
};

// ✅ SUBMIT QUIZ ATTEMPT (CRITICAL)
export const submitQuizAttempt = async (payload) => {
  const response = await api.post("/quiz/submit", payload);
  return response.data;
};

// GENERATE MOCK EXAM
export const generateMockExam = async (grade) => {
  const response = await api.post("/mock-exam/generate", { grade });
  return response.data;
};

/**
 * =========================
 * 🤖 MATHEMATICS TUTOR CHAT APIs
 * =========================
 */

// SEND CHAT MESSAGE TO GEMINI AI
export const sendChatMessage = async (userInput) => {
  const response = await api.post("/chat", { userInput });
  return response.data;
};

// GET AVAILABLE GEMINI MODELS
export const getAvailableModels = async () => {
  const response = await api.get("/chat/models");
  return response.data;
};

export default api;
>>>>>>> Stashed changes
