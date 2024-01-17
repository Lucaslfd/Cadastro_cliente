import axios from 'axios';

// URL base da sua API
// URL = 'http://127.0.0.1:5000/';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/'
})

export default api;
