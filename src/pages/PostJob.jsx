import React, { useState } from "react";
import axios from "axios";

export default function PostJob() {
  const API = "https://joblinkbackend.onrender.com/api";

  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    jobType: "Full-time",
    salary: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await axios.post(`${API}/jobs`, form);
      setMsg("✅ Job posted successfully!");
      setForm({
        title: "",
        company: "",
        description: "",
        location: "",
        jobType: "Full-time",
        salary: "",
      });
    } catch (err) {
      alert("❌ Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Post a Job</h2>

      {msg && <p className="text-green-600 mb-3 text-center">{msg}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">

        <input name="title" placeholder="Job Title"
          value={form.title} onChange={handleChange}
          className="w-full border p-2 rounded" required />

        <input name="company" placeholder="Company Name"
          value={form.company} onChange={handleChange}
          className="w-full border p-2 rounded" required />

        <input name="location" placeholder="Location"
          value={form.location} onChange={handleChange}
          className="w-full border p-2 rounded" required />

        {/* 🆕 Job Type */}
        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Remote</option>
          <option>Work From Home</option>
          <option>Online</option>
        </select>

        {/* 💰 Salary */}
        <input
          name="salary"
          placeholder="Salary (₦50,000 - ₦200,000)"
          value={form.salary}
          onChange={handleChange}
          className="w-full border p-2 rounded text-green-600 font-semibold"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>

      </form>
    </div>
  );
}