// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-manager-backend-06hr.onrender.com/api', // Cambia esto a tu URL real
});

export default api;
