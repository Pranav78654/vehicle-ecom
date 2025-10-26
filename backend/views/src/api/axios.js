// src/api/axios.js
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true, // ✅ allows sending cookies to backend
});

export default instance;
