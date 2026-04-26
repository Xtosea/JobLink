import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const API = "https://joblinkbackend.onrender.com/api";

  // ✅ Move fetchJobs OUTSIDE useEffect so we can reuse it
  const fetchJobs = async () => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get(
        `${API}/jobs/employer/jobs`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // 🔥 BOOST FUNCTION
  const boostJob = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.patch(
        `${API}/jobs/${id}/boost`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Job boosted 🔥");

      fetchJobs(); // refresh list
    } catch (err) {
      alert("Failed to boost job");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Employer Dashboard 🏢
      </h1>

      {jobs.length === 0 ? (
        <p>No jobs posted yet</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="border p-4 mb-3 rounded bg-white"
          >
            <h2 className="font-bold text-lg">{job.title}</h2>
            <p>{job.company}</p>

            <p>
              Applicants: {job.applicationsCount || 0}
            </p>

            {/* 🔵 VIEW APPLICANTS */}
            <button
              onClick={() =>
                navigate(`/jobs/${job._id}/applicants`)
              }
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded mr-2"
            >
              View Applicants
            </button>

            {/* 🔥 BOOST BUTTON */}
            {!job.isFeatured ? (
              <button
                onClick={() => boostJob(job._id)}
                className="bg-yellow-500 text-black px-3 py-1 rounded mt-2"
              >
                🔥 Boost Job
              </button>
            ) : (
              <span className="text-green-600 mt-2 block">
                ✅ Boosted
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}