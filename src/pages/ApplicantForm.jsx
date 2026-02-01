import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://joblinkbackend.onrender.com"
    : "http://localhost:5000";

// Full list of Nigerian job positions (alphabetical) with Other option
const JOB_POSITIONS_BY_TYPE = {
  "Full-time": [
    "Accountant",
    "Admin Assistant",
    "Advertising Executive",
    "Agricultural Officer",
    "Airline Cabin Crew",
    "Analyst",
    "Architect",
    "Art Director",
    "Backend Developer",
    "Bank Teller",
    "Barista",
    "Business Development Executive",
    "Call Center Agent",
    "Cleaner / Housekeeper",
    "Content Creator",
    "Content Writer",
    "Construction Worker",
    "Customer Support Officer",
    "Data Analyst",
    "Data Entry Clerk",
    "Delivery Rider / Messenger",
    "Digital Marketer",
    "Driver",
    "Electrician",
    "Event Planner",
    "Event Staff",
    "Fashion Designer",
    "Finance Officer",
    "Front Desk Officer",
    "Frontend Developer",
    "Full Stack Developer",
    "Gardener / Groundskeeper",
    "Graphic Designer",
    "Hair Stylist / Barber",
    "HR Officer",
    "IT Support",
    "Junior Developer",
    "Lawyer",
    "Logistics Officer",
    "Machine Operator",
    "Maintenance Officer",
    "Manager",
    "Marketing Executive",
    "Mobile App Developer",
    "Nurse",
    "Nutritionist",
    "Operations Officer",
    "Office Assistant",
    "Photographer",
    "Procurement Officer",
    "Project Coordinator",
    "Public Relations Officer",
    "Receptionist",
    "Research Analyst",
    "Sales Associate",
    "Sales Executive",
    "Security Officer",
    "Social Media Manager",
    "Store Attendant",
    "Teacher",
    "Technician",
    "Translator / Interpreter",
    "UI/UX Designer",
    "Volunteer Fundraiser",
    "Warehouse Worker",
    "Waiter / Waitress",
    "Web Developer",
    "Other"
  ].sort(),

  "Part-time": [
    "Administrative Assistant",
    "Cleaner / Housekeeper",
    "Content Creator",
    "Driver",
    "Event Staff",
    "Graphic Designer",
    "Sales Associate",
    "Security Guard",
    "Social Media Manager",
    "Tutor",
    "Volunteer Fundraiser",
    "Other"
  ].sort()
};

export default function ApplicantForm() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    mobile: "",
    jobType: "Full-time",
    jobPosition: "",
  });

  const [jobOptions, setJobOptions] = useState(JOB_POSITIONS_BY_TYPE["Full-time"]);
  const [showOtherJob, setShowOtherJob] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Update job positions when jobType changes
  useEffect(() => {
    const options = JOB_POSITIONS_BY_TYPE[form.jobType] || [];
    setJobOptions(options);
    setForm((prev) => ({ ...prev, jobPosition: "" }));
    setShowOtherJob(false);
  }, [form.jobType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "jobPosition" && value === "Other") {
      setShowOtherJob(true);
    } else if (name === "jobPosition") {
      setShowOtherJob(false);
    }
  };

  const validateWhatsApp = (number) => {
    const regex = /^\+234\d{10}$/;
    return regex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    if (!validateWhatsApp(form.mobile)) {
      alert("Please enter a valid Nigerian WhatsApp number starting with +234 followed by 10 digits.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/applications`, form, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });

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

      {successMsg && <p className="mb-4 text-green-600 text-center">{successMsg}</p>}

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

        {/* WhatsApp Number */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            WhatsApp Number{" "}
            <span className="ml-1 text-gray-400 cursor-pointer" title="Include country code. Example: +2348012345678">
              ℹ️
            </span>
            <span className="text-xs text-gray-500 block">(Include country code, e.g., +234)</span>
          </label>
          <input
            type="tel"
            name="mobile"
            placeholder="+2348012345678"
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
            required
          >
            {Object.keys(JOB_POSITIONS_BY_TYPE).sort().map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Job Position */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Position</label>
          {!showOtherJob ? (
            <select
              name="jobPosition"
              value={form.jobPosition}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a position</option>
              {jobOptions.map((position) => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name="jobPosition"
              placeholder="Enter your job position"
              value={form.jobPosition}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          )}
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