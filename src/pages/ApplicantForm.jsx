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
      setSuccessMsg("Application submitted successfully. Check your email for next steps.");
      setForm({
        fullname: "",
        email: "",
        mobile: "",
        jobType: "Full-time",
        jobPosition: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Job Application</h2>

      {successMsg && (
        <p className="mb-4 text-green-600 text-center">{successMsg}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullname"
            placeholder="John Doe"
            value={form.fullname}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium mb-1">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            placeholder="+234 801 234 5678"
            value={form.mobile}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Type</label>
          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>

        {/* Job Position */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Position</label>
          <input
            type="text"
            name="jobPosition"
            placeholder="e.g. Frontend Developer"
            value={form.jobPosition}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}