// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const registerUser = async (userData) => {
  try {
    // We send JSON. Pydantic aliases handle 'studentName' -> 'full_name' mapping
const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const loginUser = async (credentials) => {
  try {
    // Just pass the credentials object directly!
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// Add this to your api.js file
export const getAllUsers = async () => {
  try {
    const token = sessionStorage.getItem('accessToken'); 
    
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}` // This proves you are a logged-in admin!
      }
    });
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// Update user role
export const updateUserRole = async (userId, role) => {
  try {
    const token = sessionStorage.getItem('accessToken');
    // We send the new role in the body, and the token in the headers
    const response = await axios.put(`${API_URL}/users/${userId}/role`, 
      { user_role: role }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const token = sessionStorage.getItem('accessToken');
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const getCurrentUser = async () => {
  const token = sessionStorage.getItem('accessToken');
  const response = await axios.get(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Example of how your api.js should look for the lessons now:

// Fetch all lessons
export const getAllLessons = async () => {
  try {
    // Make sure this points to your Node.js endpoint!
    const response = await axios.get(`${API_URL}/lessons`); 
    return response.data;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return []; // Return empty array so map() doesn't crash
  }
};

// Fetch specific lesson content
export const getLessonContent = async (lessonId) => {
  try {
    const response = await axios.get(`${API_URL}/lessons/${lessonId}/content`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lesson content:", error);
    return [];
  }
};