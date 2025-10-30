import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    if (config.data) {
      console.log('Request Data:', config.data);
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Trains API
export const getTrains = () => api.get('/train');
export const getTrain = (id) => api.get(`/train/${id}`);
export const createTrain = (train) => api.post('/train', train);
export const updateTrain = (id, train) => api.put(`/train/${id}`, train);
export const deleteTrain = (id) => api.delete(`/train/${id}`);

// Sensors API
export const getSensors = () => api.get('/sensor');
export const getSensor = (id) => api.get(`/sensor/${id}`);
export const createSensor = (sensor) => api.post('/sensor', sensor);
export const updateSensor = (id, sensor) => api.put(`/sensor/${id}`, sensor);
export const deleteSensor = (id) => api.delete(`/sensor/${id}`);

// Accidents API
export const getAccidents = () => api.get('/accident');
export const getAccident = (id) => api.get(`/accident/${id}`);
export const createAccident = (accident) => api.post('/accident', accident);
export const updateAccident = (id, accident) => api.put(`/accident/${id}`, accident);
export const deleteAccident = (id) => api.delete(`/accident/${id}`);

// Alerts API
export const getAlerts = () => api.get('/alert');
export const getAlert = (id) => api.get(`/alert/${id}`);
export const createAlert = (alert) => api.post('/alert', alert);
export const updateAlert = (id, alert) => api.put(`/alert/${id}`, alert);
export const deleteAlert = (id) => api.delete(`/alert/${id}`);

// Response Teams API
export const getResponseTeams = () => api.get('/response-team');
export const getResponseTeam = (id) => api.get(`/response-team/${id}`);
export const createResponseTeam = (team) => api.post('/response-team', team);
export const updateResponseTeam = (id, team) => api.put(`/response-team/${id}`, team);
export const deleteResponseTeam = (id) => api.delete(`/response-team/${id}`);

// Response Actions API
export const getResponseActions = () => api.get('/response-action');
export const getResponseAction = (id) => api.get(`/response-action/${id}`);
export const createResponseAction = (action) => api.post('/response-action', action);
export const updateResponseAction = (id, action) => api.put(`/response-action/${id}`, action);
export const deleteResponseAction = (id) => api.delete(`/response-action/${id}`);

export default api;