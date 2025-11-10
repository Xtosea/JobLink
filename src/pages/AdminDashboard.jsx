import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminApplications = () => {
  const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [replyText, setReplyText] = useState({});
  const itemsPerPage = 10;

  // ✅ Fetch Applications
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${apiBase}/api/admin/applications`);
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  // ✅ Handle Reply Text Change
  const handleReplyChange = (id, value) => {
    setReplyText((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ Send Reply
  const handleReply = async (id) => {
    try {
      const reply = replyText[id];
      if (!reply) return alert("Please write a reply before sending.");

      await axios.put(`${apiBase}/api/admin/applications/${id}/reply`, { reply });
      alert("Reply sent successfully!");
      fetchApplications();
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Failed to send reply.");
    }
  };

  // ✅ Handle Status Change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${apiBase}/api/admin/applications/${id}/status`, {
        status: newStatus,
      });
      fetchApplications();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  // ✅ Pagination
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const paginated = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Component UI
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">All Job Applications</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3">Applicant Info</th>
              <th className="px-4 py-3">Job Type</th>
              <th className="px-4 py-3">Reply</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          {/* ✅ Main Table Body */}
          <tbody>
            {paginated.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                {/* ✅ Applicant Info */}
                <td className="px-4 py-3">
                  <div>
                    <p className="font-semibold">{app.fullname}</p>
                    <p className="text-sm text-gray-500">{app.email}</p>
                    <p className="text-sm text-gray-400">{app.mobile}</p>

                    {/* ✅ Uploaded Files */}
                    <div className="mt-2 space-y-1">
                      {app.proofFile ? (
                        <a
                          href={`${apiBase}/uploads/${app.proofFile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm text-blue-600 underline"
                        >
                          View Proof of Payment
                        </a>
                      ) : (
                        <p className="text-xs text-gray-400 italic">
                          No proof uploaded
                        </p>
                      )}

                      {app.resumeFile ? (
                        <a
                          href={`${apiBase}/uploads/${app.resumeFile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm text-green-600 underline"
                        >
                          View CV / Resume
                        </a>
                      ) : (
                        <p className="text-xs text-gray-400 italic">
                          No CV uploaded
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* ✅ Job Info */}
                <td className="px-4 py-3">{app.jobType}</td>

                {/* ✅ Reply Section */}
                <td className="px-4 py-3">
                  <textarea
                    placeholder="Write reply..."
                    value={replyText[app._id] || app.reply || ""}
                    onChange={(e) => handleReplyChange(app._id, e.target.value)}
                    className="border rounded p-1 w-full text-sm"
                  />
                </td>

                {/* ✅ Status */}
                <td className="px-4 py-3">
                  <select
                    value={app.status || "Pending"}
                    onChange={(e) =>
                      handleStatusChange(app._id, e.target.value)
                    }
                    className={`border rounded px-2 py-1 text-sm ${
                      app.status === "Approved"
                        ? "bg-blue-100 text-blue-700"
                        : app.status === "Replied"
                        ? "bg-green-100 text-green-700"
                        : app.status === "Declined"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Replied">Replied</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                  </select>
                </td>

                {/* ✅ Actions */}
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleReply(app._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Send Reply
                  </button>
                </td>
              </tr>
            ))}

            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages || 1}
        </p>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminApplications;