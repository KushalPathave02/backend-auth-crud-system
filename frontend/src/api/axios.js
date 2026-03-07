import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-auth-crud-system-backend.onrender.com/api/v1',
});

// Add a request interceptor to include JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
