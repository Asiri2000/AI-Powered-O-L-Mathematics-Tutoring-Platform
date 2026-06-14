// src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const loginUser = async (credentials) => {
  try {
    const params = new URLSearchParams();
    params.append('username', credentials.username);
    params.append('password', credentials.password);

    const response = await api.post('/users/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

export const getAllUsers = async () => {
  const response = await api.get('/users/');
  return response.data;
};

export const updateUserRole = async (userId, newRole) => {
  const response = await api.put(
    `/users/${userId}/role`,
    { user_role: newRole } // Body
  );
  return response.data;
};

export const deleteUser = async (userId) => {
  await api.delete(`/users/${userId}`);
};

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

/**
 * =========================
 * 📊 ANALYTICS APIs
 * =========================
 */

// CHAPTER ANALYTICS (LOGGED USER)
export const getChapterAnalytics = async () => {
  const response = await api.get('/analytics/chapters');
  return response.data;
};

// OVERALL SUMMARY (LOGGED USER)
export const getOverallSummary = async () => {
  const response = await api.get('/analytics/summary');
  return response.data;
};

/**
 * =========================
 * 🧠 DIAGNOSIS APIs
 * =========================
 */

export const getErrorBreakdown = async () => {
  const response = await api.get('/diagnosis/errors');
  return response.data;
};

export const getWeakChapters = async () => {
  const response = await api.get('/diagnosis/weaknesses');
  return response.data;
};

/**
 * =========================
 * 📝 QUIZ APIs
 * =========================
 */

// GENERATE QUIZ (JWT REQUIRED)
export const generateQuiz = async (payload) => {
  const response = await api.post('/quiz/generate', payload);
  return response.data;
};

// ✅ SUBMIT QUIZ ATTEMPT (CRITICAL)
export const submitQuizAttempt = async (payload) => {
  const response = await api.post('/quiz/submit', payload);
  return response.data;
};

// GENERATE MOCK EXAM
export const generateMockExam = async (grade) => {
  const response = await api.post('/mock-exam/generate', { grade });
  return response.data;
};

/**
 * =========================
 * 🤖 MATHEMATICS TUTOR CHAT APIs
 * =========================
 */

// SEND CHAT MESSAGE TO GEMINI AI
export const sendChatMessage = async (userInput) => {
  const response = await api.post('/chat', { userInput });
  return response.data;
};

// GET AVAILABLE GEMINI MODELS
export const getAvailableModels = async () => {
  const response = await api.get('/chat/models');
  return response.data;
};

export default api;
