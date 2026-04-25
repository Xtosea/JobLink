import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Jobs() {
  const API = "https://joblinkbackend.onrender.com/api";

  const [jobs, setJobs] = useState([]);

const type = query.get("type");

const url = type
  ? `${API}/jobs?jobType=${type}`
  : `${API}/jobs`;

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await axios.get(`${API}/jobs`);
      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>

      {jobs.map((job) => (
        <Link key={job._id} to={`/jobs/${job._id}`}>
          <div className="border p-4 mb-4 rounded hover:shadow bg-white cursor-pointer">

            <h3 className="font-bold text-lg">{job.title}</h3>

            <p className="text-gray-600">{job.company}</p>

            <p className="text-sm text-gray-500">
              📍 {job.location} • {job.jobType}
            </p>

            {job.salary && (
  <p className="text-green-600 font-semibold mt-1">
    💰 {job.salary}
  </p>
)}

            {job.isFeatured && (
              <span className="text-yellow-500 text-sm">
                🔥 Featured
              </span>
            )}

          </div>
        </Link>
      ))}
    </div>
  );
}