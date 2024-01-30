import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gestoraapi.onrender.com',
})

export default api