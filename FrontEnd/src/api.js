// FrontEnd/src/api.js
import axios from "axios";

/**
 * =========================
 * 🔗 API CONFIGURATION
 * =========================
 */
const API_URL = "http://127.0.0.1:5080/api";

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * =========================
 * 🔐 TOKEN INTERCEPTOR
 * =========================
 * Automatically attach JWT token
 */
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * =========================
 * 🔐 AUTH APIs
 * =========================
 */

// REGISTER USER
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// LOGIN USER
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

/**
 * =========================
 * 👤 USER APIs
 * =========================
 */

// GET CURRENT USER PROFILE
export const getCurrentUser = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

// GET ALL USERS (ADMIN)
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// DELETE USER (ADMIN)
export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

// UPDATE USER ROLE (ADMIN)
export const updateUserRole = async (userId, role) => {
  const response = await api.put(`/users/${userId}/role`, { role });
  return response.data;
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

export default api;
