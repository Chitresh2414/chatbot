import axios from 'axios';

const api = axios.create({
  baseURL: '', // ✅ use Vite proxy
});

export default api;
