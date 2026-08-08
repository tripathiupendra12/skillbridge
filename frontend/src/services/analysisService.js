import api from './api';

export const analyzeResume = (data) => api.post('/analysis/run', data);
export const getHistory = () => api.get('/history');