import React, { useEffect, useState } from "react";
import axios from "axios";
import { appHashLink } from "../utils/routes";

export default function AdminDashboard() {

  const API =
  process.env.REACT_APP_API_BASE ||
  "https://joblinkbackend.onrender.com";

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {

      setLoading(true);

      const res = await axios.get(`${API}/api/applications`);

      console.log("Applications API:", res.data);

      let data = res.data;

      // Handle different backend response formats
      if (res.data.applications) {
        data = res.data.applications;
      }

      if (!Array.isArray(data)) {
        data = [];
      }

      setApplications(data);

    } catch (err) {

      console.error(err);
      setError("Failed to load applications");

    } finally {
      setLoading(false);
    }
  };

  const start = (page - 1) * perPage;
  const current = applications.slice(start, start + perPage);
  const totalPages = Math.ceil(applications.length / perPage);

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading applications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {applications.length === 0 && (
        <p>No applications found.</p>
      )}

      <div className="grid gap-4">

        {current.map((app) => (

          <div
            key={app._id || app.token}
            className="border rounded p-4 bg-white shadow"
          >

            <h2 className="font-semibold text-lg">
              {app.fullname || "Unknown"}
            </h2>

            <p>Email: {app.email}</p>

            <p>Position: {app.jobPosition}</p>

            <p>Status: {app.status || "Pending"}</p>

            <div className="mt-3 flex flex-wrap gap-4">

              {app.resumeFile && (
                <a
                  href={app.resumeFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              )}

              {app.proofFile && (
                <a
                  href={app.proofFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline"
                >
                  View Payment Proof
                </a>
              )}

              <a
                href={appHashLink(`/reply?token=${app.token}`)}
                className="text-purple-600 underline"
              >
                Reply
              </a>

              <a
                href={appHashLink(`/history/${app.token}`)}
                className="text-gray-700 underline"
              >
                History
              </a>

            </div>

          </div>

        ))}

      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 mt-6 flex-wrap">

          {Array.from({ length: totalPages }).map((_, i) => (

            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              {i + 1}
            </button>

          ))}

        </div>
      )}

    </div>
  );
}