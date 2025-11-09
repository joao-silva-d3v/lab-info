import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const createCrudService = (endpoint) => {
  return {
    getAll: () => api.get(endpoint),
    getById: (id) => api.get(`${endpoint}/${id}`),
    create: (data) => api.post(endpoint, data),
    update: (id, data) => api.put(`${endpoint}/${id}`, data),
    delete: (id) => api.delete(`${endpoint}/${id}`)
  };
};

export default api;