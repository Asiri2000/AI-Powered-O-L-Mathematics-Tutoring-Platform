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
};