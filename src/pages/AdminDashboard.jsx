import React, { useEffect, useState } from "react";
import axios from "axios";
import { appHashLink } from "../utils/routes";

export default function AdminDashboard() {

  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/applications`);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const start = (page - 1) * perPage;
  const current = applications.slice(start, start + perPage);

  const totalPages = Math.ceil(applications.length / perPage);

  return (
    <div className="max-w-6xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid gap-4">

        {current.map((app) => (

          <div
            key={app._id}
            className="border rounded p-4 bg-white shadow"
          >

            <h2 className="font-semibold text-lg">
              {app.fullname}
            </h2>

            <p>Email: {app.email}</p>

            <p>Position: {app.jobPosition}</p>

            <p>Status: {app.status}</p>

            <div className="mt-3 flex flex-wrap gap-4">

              {app.resumeUrl && (
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              )}

              {app.proofUrl && (
                <a
                  href={app.proofUrl}
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

      <div className="flex gap-2 mt-6">

        {Array.from({ length: totalPages }).map((_, i) => (

          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>

        ))}

      </div>

    </div>
  );
}