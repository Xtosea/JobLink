// api/api.js
import axios from 'axios';

const BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
const API = axios.create({ baseURL: `${BASE}/api` });

// Applicant
export const createApplication = (data) => API.post('/applications', data);
export const uploadFiles = (id, formData) =>
  API.post(`/applications/upload/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Admin
export const adminLogin = (creds) => API.post('/admin/login', creds);
export const listApplications = (token) =>
  API.get('/applications', { headers: { Authorization: `Bearer ${token}` } });
export const replyToApplication = (id, payload, token) =>
  API.post(`/applications/reply/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } });