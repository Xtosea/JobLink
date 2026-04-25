import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = "https://joblinkbackend.onrender.com";

const JOB_POSITIONS_BY_TYPE = {
  "Full-time": ["Accountant", "Developer", "Designer"],
  "Part-time": ["Cleaner", "Tutor", "Driver"],
};

export default function ApplicantForm() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    mobile: "",
    jobType: "Full-time",
    jobPosition: "",
  });

  const [jobOptions, setJobOptions] = useState(
    JOB_POSITIONS_BY_TYPE["Full-time"]
  );

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ SAFE USER PARSE (IMPORTANT FIX)
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    setJobOptions(JOB_POSITIONS_BY_TYPE[form.jobType]);
    setForm((prev) => ({ ...prev, jobPosition: "" }));
  }, [form.jobType]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_BASE}/api/applications`, form);

      setSuccessMsg("Application submitted!");
      setForm({
        fullname: "",
        email: "",
        mobile: "",
        jobType: "Full-time",
        jobPosition: "",
      });
    } catch (err) {
      alert("Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">

      {/* ================= TOP NAV BUTTONS ================= */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">

        {/* ALWAYS SHOW */}
        <Link to="/jobs">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Browse Jobs
          </button>
        </Link>

        {/* ROLE: EMPLOYER */}
        {user?.role === "employer" && (
          <Link to="/post-job">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Post a Job
            </button>
          </Link>
        )}

        {/* ROLE: APPLICANT */}
        {user?.role === "applicant" && (
          <Link to="/jobs">
            <button className="bg-purple-600 text-white px-4 py-2 rounded">
              Find Jobs
            </button>
          </Link>
        )}
      </div>

      {/* ================= CATEGORY CARDS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">

        <Link to="/jobs?jobType=Full-time" className="p-4 bg-white shadow rounded text-center">
          Full-time Jobs
        </Link>

        <Link to="/jobs?jobType=Part-time" className="p-4 bg-white shadow rounded text-center">
          Part-time Jobs
        </Link>

        <Link to="/jobs?category=Engineering" className="p-4 bg-white shadow rounded text-center">
          Engineering
        </Link>

        <Link to="/jobs?category=Design" className="p-4 bg-white shadow rounded text-center">
          Design
        </Link>

      </div>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-md mx-auto"
      >
        <h2 className="text-xl font-bold mb-4">Job Application</h2>

        <input
          name="fullname"
          placeholder="Full Name"
          value={form.fullname}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          name="mobile"
          placeholder="Phone"
          value={form.mobile}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        >
          <option>Full-time</option>
          <option>Part-time</option>
        </select>

        <select
          name="jobPosition"
          value={form.jobPosition}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        >
          <option value="">Select Position</option>
          {jobOptions.map((job) => (
            <option key={job}>{job}</option>
          ))}
        </select>

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {successMsg && (
          <p className="text-green-600 mt-3 text-center">
            {successMsg}
          </p>
        )}
      </form>
    </div>
  );
}