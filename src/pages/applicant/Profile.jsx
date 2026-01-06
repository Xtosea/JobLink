import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { token, user } = useContext(AuthContext);
  const [form, setForm] = useState({ fullname: "", email: "", mobile: "" });

  useEffect(() => {
    if (!token) return;
    axios.get(`${process.env.REACT_APP_API_BASE}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setForm(res.data))
      .catch(console.error);
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_API_BASE}/api/users/me`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-3">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="fullname" value={form.fullname} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="mobile" value={form.mobile} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full p-2 bg-green-600 text-white rounded">Update Profile</button>
      </form>
      <div className="mt-3">
        <a href="/application" className="text-blue-600 underline">Submit New Application</a> <br />
        <a href="/history" className="text-blue-600 underline">View Application History</a>
      </div>
    </div>
  );
}