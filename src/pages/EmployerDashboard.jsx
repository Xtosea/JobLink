import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate()

  const API =
    "https://joblinkbackend.onrender.com/api";

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${API}/jobs/employer/jobs`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setJobs(data);
    };

    fetchJobs();
  }, []);

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
            className="border p-4 mb-3 rounded"
          >
            <h2 className="font-bold">{job.title}</h2>
            <p>{job.company}</p>

            <p>
              Applicants: {job.applicationsCount || 0}
            </p>

            <button
  onClick={() => navigate(`/jobs/${job._id}/applicants`)}
  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
>
  View Applicants
</button>

          </div>
        ))
      )}
    </div>
  );
}