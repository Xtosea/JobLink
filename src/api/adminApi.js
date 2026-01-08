import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://joblinkbackend.onrender.com";

// ✅ ADMIN: LIST APPLICATIONS
export const listApplications = (token) =>
  axios.get(`${API_BASE}/api/admin/applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// ✅ ADMIN: UPDATE / REPLY
export const replyToApplication = (id, data, token) =>
  axios.put(`${API_BASE}/api/admin/applications/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// ✅ ADMIN: RESEND EMAIL
export const resendApplicationEmail = (id, token) =>
  axios.patch(
    `${API_BASE}/api/admin/applications/resend/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );