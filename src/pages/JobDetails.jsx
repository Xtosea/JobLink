import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function JobDetails() {
  const { id } = useParams();

  const API =
    process.env.REACT_APP_API_URL ||
    "https://joblinkbackend.onrender.com/api";

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🆕 Application form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    cv: null,
  });

  const [submitting, setSubmitting] = useState(false);

  // 📄 Fetch job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`${API}/jobs/${id}`);
        setJob(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // ☁️ Upload CV to Cloudinary
  const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "joblink_unsigned");

      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/djt1zq25a/auto/upload"
      );

      xhr.onload = () => {
        try {
          const res = JSON.parse(xhr.responseText);
          if (res.secure_url) resolve(res.secure_url);
          else reject("Upload failed");
        } catch {
          reject("Invalid response");
        }
      };

      xhr.onerror = () => reject("Upload error");

      xhr.send(formData);
    });
  };

  // 📥 Apply to job (REAL FLOW)
  const handleApply = async () => {
    if (!form.name || !form.email || !form.cv) {
      return alert("Please fill all fields and upload CV");
    }

    try {
      setSubmitting(true);

      // 1️⃣ Upload CV
      const cvUrl = await uploadToCloudinary(form.cv);

      // 2️⃣ Send to backend
      await axios.post(`${API}/jobs/${id}/apply`, {
        name: form.name,
        email: form.email,
        cvUrl,
      });

      alert("Application submitted successfully!");

      // reset form
      setForm({
        name: "",
        email: "",
        cv: null,
      });

    } catch (err) {
      console.error(err);
      alert("Error applying");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!job) return <p className="text-center mt-10">Job not found</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow rounded">

      {/* 🔥 Featured */}
      {job.isFeatured && (
        <span className="bg-yellow-400 px-3 py-1 text-sm rounded">
          🔥 Featured
        </span>
      )}

      {/* 📌 Job Info */}
      <h1 className="text-2xl font-bold mt-2">{job.title}</h1>

      <p className="text-gray-600">{job.company}</p>

      <p className="text-sm text-gray-500">
        📍 {job.location}
        {job.jobType && ` • ${job.jobType}`}
      </p>

      {job.salary && (
        <p className="text-green-600 font-semibold mt-2">
          💰 {job.salary}
        </p>
      )}

      <p className="mt-4">{job.description}</p>

      {/* 📊 Stats */}
      <div className="mt-4 text-sm text-gray-500">
        👁️ {job.views} views • 📩 {job.applicationsCount} applications
      </div>

      {/* ================= APPLY SECTION ================= */}
      <div className="mt-6 space-y-3 border-t pt-4">

        <h3 className="font-semibold text-lg">Apply for this job</h3>

        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, cv: e.target.files[0] })
          }
          className="w-full"
        />

        <button
          onClick={handleApply}
          className="w-full bg-green-600 text-white py-3 rounded text-lg hover:bg-green-700"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Apply Now"}
        </button>

      </div>
    </div>
  );
}