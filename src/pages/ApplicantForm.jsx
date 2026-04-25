import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = "https://joblinkbackend.onrender.com";

/* =========================
   JOB POSITIONS DATA
========================= */
const JOB_POSITIONS_BY_TYPE = {
  "Full-time": [
    "Accountant",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "Teacher",
    "Nurse",
    "Driver",
    "Digital Marketer",
  ].sort(),

  "Part-time": [
    "Content Creator",
    "Tutor",
    "Security Guard",
    "Cleaner",
    "Driver",
  ].sort(),
};

export default function ApplicantForm() {
  const user = JSON.parse(localStorage.getItem("user"));

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

  const [showOtherJob, setShowOtherJob] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  /* =========================
     UPDATE JOB OPTIONS
  ========================= */
  useEffect(() => {
    setJobOptions(JOB_POSITIONS_BY_TYPE[form.jobType] || []);
    setForm((prev) => ({ ...prev, jobPosition: "" }));
    setShowOtherJob(false);
  }, [form.jobType]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (name === "jobPosition") {
      setShowOtherJob(value === "Other");
    }
  };

  const validateWhatsApp = (number) => {
    return /^\+234\d{10}$/.test(number);
  };

  /* =========================
     SUBMIT FORM
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateWhatsApp(form.mobile)) {
      alert("Invalid WhatsApp number format");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_BASE}/api/applications`, form);

      setSuccessMsg("Application submitted successfully 🎉");

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
    <div className="max-w-5xl mx-auto p-4">

      {/* =========================
          ROLE BASED ACTIONS
      ========================= */}
      <div className="flex justify-between mb-6">

        {/* Applicant View */}
        {user?.role === "applicant" && (
          <Link to="/jobs">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Browse Jobs
            </button>
          </Link>
        )}

        {/* Employer View */}
        {user?.role === "employer" && (
          <Link to="/post-job">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Post a Job
            </button>
          </Link>
        )}
      </div>

      {/* =========================
          JOB CATEGORY CARDS
      ========================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

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

      {/* =========================
          APPLICATION FORM
      ========================= */}
      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4">
          Job Application
        </h2>

        {successMsg && (
          <p className="text-green-600 mb-3">{successMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="tel"
            name="mobile"
            placeholder="+2348012345678"
            value={form.mobile}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* JOB TYPE */}
          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            {Object.keys(JOB_POSITIONS_BY_TYPE).map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          {/* JOB POSITION */}
          {!showOtherJob ? (
            <select
              name="jobPosition"
              value={form.jobPosition}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Position</option>
              {jobOptions.map((job) => (
                <option key={job}>{job}</option>
              ))}
              <option>Other</option>
            </select>
          ) : (
            <input
              type="text"
              name="jobPosition"
              placeholder="Enter position"
              value={form.jobPosition}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>

    </div>
  );
}