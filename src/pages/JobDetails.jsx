import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function JobDetails() {
  const { id } = useParams();

  const API =
    process.env.REACT_APP_API_URL ||
    "http://localhost:5000/api";

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📄 Fetch job (this also increments views)
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

  // 📥 Apply to job
  const handleApply = async () => {
    try {
      await axios.post(`${API}/jobs/${id}/apply`);
      alert("Application submitted!");
    } catch (err) {
      alert("Error applying");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow rounded">

  {job.isFeatured && (
    <span className="bg-yellow-400 px-3 py-1 text-sm rounded">
      🔥 Featured
    </span>
  )}

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

  <div className="mt-4 text-sm text-gray-500">
    👁️ {job.views} views • 📩 {job.applicationsCount} applications
  </div>

  <button
    onClick={handleApply}
    className="mt-6 w-full bg-green-600 text-white px-4 py-3 rounded text-lg"
  >
    Apply Now
  </button>
</div>
  );
}