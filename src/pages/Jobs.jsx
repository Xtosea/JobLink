import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Jobs() {
  const API = "https://joblinkbackend.onrender.com/api";

  const [jobs, setJobs] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);

  const type = query.get("jobType") || "";
  const category = query.get("category") || "";
  const search = query.get("search") || "";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let url = `${API}/jobs?`;

        if (type) url += `jobType=${type}&`;
        if (category) url += `category=${category}&`;
        if (search) url += `search=${search}`;

        const { data } = await axios.get(url);
        setJobs(data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, [type, category, search]);

  // 🔎 HANDLE FILTER CHANGE
  const handleFilter = (e) => {
    e.preventDefault();

    const form = e.target;

    const newType = form.jobType.value;
    const newCategory = form.category.value;
    const newSearch = form.search.value;

    navigate(
      `/jobs?jobType=${newType}&category=${newCategory}&search=${newSearch}`
    );
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">
        Available Jobs
      </h2>

      {/* 🔥 FILTER BAR */}
      <form
        onSubmit={handleFilter}
        className="bg-white p-4 rounded shadow mb-6 grid md:grid-cols-4 gap-3"
      >
        {/* SEARCH */}
        <input
          name="search"
          placeholder="Search jobs..."
          defaultValue={search}
          className="border p-2"
        />

        {/* TYPE */}
        <select
          name="jobType"
          defaultValue={type}
          className="border p-2"
        >
          <option value="">All Types</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Remote</option>
          <option>Contract</option>
        </select>

        {/* CATEGORY */}
        <select
          name="category"
          defaultValue={category}
          className="border p-2"
        >
          <option value="">All Categories</option>
          <option>Engineering</option>
          <option>Design</option>
          <option>Marketing</option>
        </select>

        {/* BUTTON */}
        <button className="bg-black text-white">
          Filter
        </button>
      </form>

      {/* 📦 JOB LIST */}
      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job) => (
          <Link key={job._id} to={`/jobs/${job._id}`}>
            <div className="border p-4 mb-4 rounded hover:shadow bg-white">

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
                <p className="text-green-600 font-semibold">
                  💰 {job.salary}
                </p>
              )}

            </div>
          </Link>
        ))
      )}
    </div>
  );
}