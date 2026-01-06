import axios from "axios";

// ✅ Automatically use localhost in development and Render in production
const BASE =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL // https://joblinknigeria.onrender.com/api
    : process.env.REACT_APP_API_LOCAL; // http://localhost:5000/api

const API = axios.create({
  baseURL: BASE,
});

// 🧩 Applicant APIs
export const createApplication = (data) =>
  API.post("/applications", data);

export const createApplication = (data) => API.post("/applications", data);

export const uploadFiles = (id, formData) => API.post(`/applications/upload/${id}`, formData, {
  headers: { "Content-Type": "multipart/form-data" },
});

// 🧩 Admin APIs
export const adminLogin = (creds) => API.post("/admin/login", creds);

export const listApplications = (token) =>
  API.get("/applications", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const replyToApplication = (id, payload, token) =>
  API.post(`/applications/reply/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });