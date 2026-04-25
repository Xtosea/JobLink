import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function Jobs() {
  const API = "https://joblinkbackend.onrender.com/api";

  const [jobs, setJobs] = useState([]);

  // ✅ GET QUERY PARAMS
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const type = query.get("type");
  const search = query.get("search");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let url = `${API}/jobs`;

        // ✅ FILTER BY TYPE
        if (type) {
          url += `?jobType=${type}`;
        }

        // ✅ SEARCH SUPPORT
        if (search) {
          url += type
            ? `&search=${search}`
            : `?search=${search}`;
        }

        const { data } = await axios.get(url);
        setJobs(data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, [type, search]);

  return (
    <div className="p-4">

      <h2 className="text-2xl font-bold mb-4">
        Available Jobs
      </h2>

      {/* 🔎 SEARCH BAR */}
      <form
        className="mb-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const value = e.target.search.value;
          window.location.href = `/jobs?search=${value}`;
        }}
      >
        <input
          name="search"
          placeholder="Search jobs..."
          className="border p-2 flex-1"
        />
        <button className="bg-black text-white px-4">
          Search
        </button>
      </form>

      {/* 🏷 FILTER BUTTONS */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <Link to="/jobs" className="border px-3 py-1">
          All
        </Link>

        <Link to="/jobs?type=Full-time" className="border px-3 py-1">
          Full-time
        </Link>

        <Link to="/jobs?type=Part-time" className="border px-3 py-1">
          Part-time
        </Link>

        <Link to="/jobs?type=Remote" className="border px-3 py-1">
          Remote
        </Link>
      </div>

      {/* 📦 JOB LIST */}
      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job) => (
          <Link key={job._id} to={`/jobs/${job._id}`}>
            <div className="border p-4 mb-4 rounded hover:shadow bg-white cursor-pointer">

              <h3 className="font-bold text-lg">
                {job.title}
              </h3>

              <p className="text-gray-600">
                {job.company}
              </p>

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
        ))
      )}
    </div>
  );
}