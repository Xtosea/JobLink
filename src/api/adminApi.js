import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "https://joblinknigeria.onrender.com";

// ================== Admin Login ==================
export const adminLogin = (data) => {
  // ✅ No withCredentials
  return axios.post(`${API_BASE}/api/admin/login`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

// ================== Admin: Protected Requests ==================
export const listApplications = (token) =>
  axios.get(`${API_BASE}/api/admin/applications`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const replyToApplication = (id, data, token) =>
  axios.put(`${API_BASE}/api/admin/applications/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const resendApplicationEmail = (id, token) =>
  axios.patch(`${API_BASE}/api/admin/applications/resend/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });