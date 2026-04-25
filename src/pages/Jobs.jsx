import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

export default function Jobs() {
  const API = "https://joblinkbackend.onrender.com/api";

  const [jobs, setJobs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type") || "";
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchJobs = async () => {
      let url = `${API}/jobs?`;

      if (type) url += `jobType=${type}&`;
      if (search) url += `search=${search}`;

      const { data } = await axios.get(url);
      setJobs(data);
    };

    fetchJobs();
  }, [type, search]);

  return (
    <div className="flex gap-4 p-4 bg-gray-100 min-h-screen">

      {/* ================= LEFT SIDEBAR ================= */}
      <div className="w-1/4 bg-white p-4 rounded shadow">

        <h3 className="font-bold mb-3">Filters</h3>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search jobs..."
          defaultValue={search}
          onChange={(e) =>
            setSearchParams({
              type,
              search: e.target.value,
            })
          }
          className="w-full border p-2 mb-3 rounded"
        />

        {/* JOB TYPES */}
        <div className="space-y-2">

          <Link
            to="/jobs"
            className="block p-2 hover:bg-gray-100 rounded"
          >
            All Jobs
          </Link>

          <Link
            to="/jobs?type=Full-time"
            className="block p-2 hover:bg-gray-100 rounded"
          >
            Full-time
          </Link>

          <Link
            to="/jobs?type=Part-time"
            className="block p-2 hover:bg-gray-100 rounded"
          >
            Part-time
          </Link>

          <Link
            to="/jobs?type=Remote"
            className="block p-2 hover:bg-gray-100 rounded"
          >
            Remote
          </Link>

        </div>
      </div>

      {/* ================= JOB LIST ================= */}
      <div className="w-2/4">

        <h2 className="text-xl font-bold mb-4">
          Available Jobs
        </h2>

        {jobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          jobs.map((job) => (
            <Link key={job._id} to={`/jobs/${job._id}`}>

              <div className="bg-white p-4 mb-3 rounded shadow hover:shadow-md cursor-pointer">

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

      {/* ================= RIGHT PANEL ================= */}
      <div className="w-1/4 hidden lg:block">

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">
            Job Tips 💡
          </h3>

          <ul className="text-sm text-gray-600 space-y-2">
            <li>✔ Keep your CV updated</li>
            <li>✔ Apply early</li>
            <li>✔ Tailor your resume</li>
          </ul>
        </div>

      </div>

    </div>
  );
}