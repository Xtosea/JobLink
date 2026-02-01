import React, { useState } from "react";
import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://joblinkbackend.onrender.com"
    : "http://localhost:5000";

// ✅ Job types (Nigeria-relevant)
const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Remote",
  "Hybrid",
  "Internship",
  "Freelance",
  "Volunteer",
];

// ✅ Job positions (Nigeria-relevant)
const JOB_POSITIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile App Developer",
  "UI/UX Designer",
  "Digital Marketer",
  "Content Creator",
  "Business Development Executive",
  "Sales Executive",
  "Customer Support Officer",
  "Data Analyst",
  "Project Coordinator",
  "Volunteer Fundraiser",
  "Optometrist",
];

export default function ApplicantForm() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    mobile: "",
    jobType: "",
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
      await axios.post(`${API_BASE}/api/applications`, form, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccessMsg(
        "Application submitted successfully. Check your email for next steps."
      );

      setForm({
        fullname: "",
        email: "",
        mobile: "",
        jobType: "",
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
      <h2 className="text-2xl font-bold mb-6 text-center">Job Application Form</h2>

      {successMsg && (
        <p className="mb-4 text-green-600 text-center">{successMsg}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

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

        {/* Email Address */}
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

        {/* WhatsApp Number */}
        <div>
          <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
          <input
            type="tel"
            name="mobile"
            placeholder="+234 801 234 5678"
            value={form.mobile}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Please provide a number active on WhatsApp.
          </p>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Type</label>
          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select job type</option>
            {JOB_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Job Position */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Position</label>
          <select
            name="jobPosition"
            value={form.jobPosition}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select position</option>
            {JOB_POSITIONS.map((pos) => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
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