import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Jobs() {
  const API = "https://joblinkbackend.onrender.com/api";

  const [jobs, setJobs] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);

  const type = query.get("jobType") || "";
  const category = query.get("category") || "";
  const search = query.get("search") || "";

  // ❤️ SAVE JOB
  const saveJob = async (jobId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!user || !token) {
        alert("Please login to save jobs");
        return;
      }

      await axios.post(
        `${API}/jobs/save/${jobId}`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      alert("Job saved ❤️");
    } catch (err) {
      console.error(err);
      alert("Failed to save job");
    }
  };

  // 🔄 FETCH + SORT JOBS
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let url = `${API}/jobs?`;

        if (type) url += `jobType=${type}&`;
        if (category) url += `category=${category}&`;
        if (search) url += `search=${search}`;

        const { data } = await axios.get(url);

        // 🔥 Sort featured jobs first
        const sortedJobs = data.sort(
          (a, b) => (b.isFeatured === true) - (a.isFeatured === true)
        );

        setJobs(sortedJobs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, [type, category, search]);

  // 🔎 FILTER
  const handleFilter = (e) => {
    e.preventDefault();

    const form = e.target;

    navigate(
      `/jobs?jobType=${form.jobType.value}&category=${form.category.value}&search=${form.search.value}`
    );
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">
        Available Jobs
      </h2>

      {/* FILTER */}
      <form
        onSubmit={handleFilter}
        className="bg-white p-4 rounded shadow mb-6 grid md:grid-cols-4 gap-3"
      >
        <input
          name="search"
          placeholder="Search jobs..."
          defaultValue={search}
          className="border p-2"
        />

        <select name="jobType" defaultValue={type} className="border p-2">
          <option value="">All Types</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Remote</option>
          <option>Contract</option>
        </select>

        <select name="category" defaultValue={category} className="border p-2">
          <option value="">All Categories</option>
          <option>Engineering</option>
          <option>Design</option>
          <option>Marketing</option>
        </select>

        <button className="bg-black text-white rounded">
          Filter
        </button>
      </form>

      {/* JOB LIST */}
      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs found</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="border p-4 mb-4 rounded hover:shadow bg-white cursor-pointer"
            onClick={() => navigate(`/jobs/${job._id}`)}
          >

            {/* 🔥 FEATURED BADGE (FIXED) */}
            {job.isFeatured && (
              <span className="bg-yellow-400 text-black px-2 py-1 text-xs rounded">
                🔥 Featured
              </span>
            )}

            <h3 className="font-bold text-lg">{job.title}</h3>

            <p className="text-gray-600">{job.company}</p>

            {job.salary && (
              <p className="text-green-600 font-semibold">
                💰 {job.salary}
              </p>
            )}

            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-500">
                📍 {job.location} • {job.jobType}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  saveJob(job._id);
                }}
                className="text-red-500 text-xl"
              >
                ❤️
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
}