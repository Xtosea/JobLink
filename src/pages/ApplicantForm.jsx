import React, { useState } from "react";
import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://joblinkbackend.onrender.com"
    : "http://localhost:5000";

export default function ApplicantForm() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    mobile: "",
    jobType: "Full-time",
    jobPosition: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      await axios.post(`${API_BASE}/api/applications`, form);

      setSuccessMsg("Application submitted! Check your email for next steps.");
      setForm({
        fullname: "",
        email: "",
        mobile: "",
        jobType: "Full-time",
        jobPosition: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-3">Job Application Form</h2>

      {successMsg && <p className="mb-3 text-green-600">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="fullname" value={form.fullname} onChange={handleChange} required />
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
        <input name="mobile" value={form.mobile} onChange={handleChange} required />
        <select name="jobType" value={form.jobType} onChange={handleChange}>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
        <input name="jobPosition" value={form.jobPosition} onChange={handleChange} required />

        <button disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}