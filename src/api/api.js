import axios from "axios";

// ✅ Automatically use localhost in development and Render in production
const BASE =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL // e.g., https://joblinkbackend.onrender.com/api
    : process.env.REACT_APP_API_LOCAL; // e.g., http://localhost:5000/api

const API = axios.create({
  baseURL: BASE,
});

// 🧩 Applicant APIs
export const createApplication = (data) => API.post("/applications", data);

export const uploadFiles = (token, formData) =>
  API.patch(`/applications/upload/${token}`, formData, {
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

// ✅ Resend application email (Admin)
export const resendApplicationEmail = (id, token) =>
  API.patch(`/applications/resend/${id}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });