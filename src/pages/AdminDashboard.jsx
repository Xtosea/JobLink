import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { appHashLink } from "../utils/routes";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const API =
    process.env.REACT_APP_API_URL ||
    "https://joblinkbackend.onrender.com/api";

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

      const res = await axios.get(`${API}/applications`);

      console.log("Applications API:", res.data);

      let data = res.data;

      // Handle backend response format
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

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {

      await axios.patch(`${API}/applications/${id}/status`, {
        status
      });

      fetchApplications();

    } catch (error) {
      console.error(error);
      alert("Failed to update status");
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

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

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


            {/* Status */}
            <div className="mt-2">

              <div className="flex items-center gap-3">

                <span className={`px-2 py-1 rounded text-white text-sm
                  ${app.status === "Approved" && "bg-green-500"}
                  ${app.status === "Declined" && "bg-red-500"}
                  ${app.status === "Pending" && "bg-yellow-500"}
                  ${app.status === "Processing" && "bg-blue-500"}
                  ${app.status === "Shortlisted" && "bg-purple-500"}
                `}>
                  {app.status || "Pending"}
                </span>

              </div>

              <select
                className="border p-2 rounded mt-2"
                value={app.status || "Pending"}
                onChange={(e) =>
                  updateStatus(app._id, e.target.value)
                }
              >

                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>

              </select>

            </div>


            {/* Actions */}
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

      {/* Pagination */}
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