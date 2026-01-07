import React, { useState } from "react";
import axios from "axios";

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
      const res = await axios.post(`${process.env.REACT_APP_API_BASE}/api/applications`, form);
      setSuccessMsg("Application submitted! Check your email for next steps.");
      setForm({ fullname: "", email: "", mobile: "", jobType: "Full-time", jobPosition: "" });
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
        <input
          name="fullname"
          placeholder="Full Name"
          value={form.fullname}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
        <input
          name="jobPosition"
          placeholder="Job Position"
          value={form.jobPosition}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}