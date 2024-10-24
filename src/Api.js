import axios from 'axios';

// Create an axios instance with the base URL of your backend
const API = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Flask backend URL
});

// Add the token to every request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Attach token to headers
  }
  return req;
});

export default API;
