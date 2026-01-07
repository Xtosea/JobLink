import React, { useEffect, useState, useContext } from "react";
import { jsPDF } from "jspdf";
import { AuthContext } from "../context/AuthContext";
import {
  listApplications,
  replyToApplication,
  resendApplicationEmail,
} from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const apiBase = process.env.REACT_APP_API_BASE || "https://joblinknigeria.vercel.app";
  const appName = process.env.REACT_APP_NAME || "JobLink Admin Dashboard";
  const logoUrl = process.env.REACT_APP_LOGO_URL || "/logo192.png";
  const brandColor = "#22c55e";

  // ✅ Fetch applications
  useEffect(() => {
    if (!token) return navigate("/admin/login");

    const fetchApps = async () => {
      try {
        const res = await listApplications(token);
        setApplications(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load applications");
      }
    };
    fetchApps();
  }, [token, navigate]);

  const handleReplyChange = (id, value) => {
    setReplyText((prev) => ({ ...prev, [id]: value }));
  };

  const handleReply = async (id) => {
    const reply = replyText[id] || "";
    try {
      const payload = { reply, status: "Replied" };
      const res = await replyToApplication(id, payload, token);
      setApplications((prev) =>
        prev.map((a) => (a._id === id ? res.data : a))
      );
      alert("Reply sent successfully!");
      setReplyText((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error(err);
      alert("Failed to send reply.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const payload = { status: newStatus };
      const res = await replyToApplication(id, payload, token);
      setApplications((prev) =>
        prev.map((a) => (a._id === id ? res.data : a))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  // ✅ Resend Email
  const handleResendEmail = async (id) => {
    try {
      await resendApplicationEmail(id, token);
      alert("Application email resent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to resend email.");
    }
  };

  // ✅ Filter + Pagination
  const filtered = applications.filter((app) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      app.fullname.toLowerCase().includes(search) ||
      app.email.toLowerCase().includes(search) ||
      app.jobType.toLowerCase().includes(search) ||
      app.jobPosition.toLowerCase().includes(search);
    const status = app.status || "Pending";
    const matchesStatus = filterStatus === "All" || status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ✅ Generate PDF
  const generatePDF = (apps, filename) => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = logoUrl;

    img.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const drawHeader = () => {
        doc.setFillColor(brandColor);
        doc.rect(0, 0, pageWidth, 30, "F");
        doc.addImage(img, "PNG", 10, 5, 20, 20);
        doc.setFontSize(14);
        doc.setTextColor(255, 255, 255);
        doc.text(appName, pageWidth / 2, 15, { align: "center" });
        doc.setTextColor(0, 0, 0);
      };

      drawHeader();
      let y = 40;
      apps.forEach((app, i) => {
        if (y > pageHeight - 30) {
          doc.addPage();
          drawHeader();
          y = 40;
        }
        doc.setFontSize(12);
        doc.text(`Application #${i + 1}`, 10, y);
        y += 6;
        doc.text(`Name: ${app.fullname}`, 10, y);
        y += 6;
        doc.text(`Email: ${app.email}`, 10, y);
        y += 6;
        doc.text(`Job Type: ${app.jobType}`, 10, y);
        y += 6;
        doc.text(`Status: ${app.status || "Pending"}`, 10, y);
        y += 6;
        doc.text(`Reply: ${app.reply || "-"}`, 10, y);
        y += 6;
      });
      doc.save(filename);
    };
  };

  const downloadCurrentPage = () => generatePDF(paginated, "current_page.pdf");
  const downloadAll = () => generatePDF(applications, "all_applications.pdf");

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{appName}</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search applicants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/3"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Replied">Replied</option>
          <option value="Approved">Approved</option>
          <option value="Declined">Declined</option>
        </select>
      </div>

      {/* Top Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => {
            logout();
            navigate("/admin/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
        <button
          onClick={downloadCurrentPage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download Current Page
        </button>
        <button
          onClick={downloadAll}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Download All Applications
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Applicant</th>
              <th className="px-4 py-3 text-left font-semibold">Job Type</th>
              <th className="px-4 py-3 text-left font-semibold">Reply</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                {/* Applicant Info */}
                <td className="px-4 py-3">
                  <div>
                    <p className="font-semibold">{app.fullname}</p>
                    <p className="text-sm text-gray-500">{app.email}</p>
                    <p className="text-sm text-gray-400">{app.mobile}</p>

                    {/* Uploaded files */}
                    <div className="mt-2 space-y-1">
                      {app.proofFile ? (
                        <a
                          href={app.proofFile}
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
                          href={app.resumeFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm text-green-600 underline"
                        >
                          View CV / Resume
                        </a>
                      ) : (
                        <p className="text-xs text-gray-400 italic">No CV uploaded</p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Job Info */}
                <td className="px-4 py-3">{app.jobType}</td>

                {/* Reply Section */}
                <td className="px-4 py-3">
                  <textarea
                    placeholder="Write reply..."
                    value={replyText[app._id] || app.reply || ""}
                    onChange={(e) => handleReplyChange(app._id, e.target.value)}
                    className="border rounded p-1 w-full text-sm"
                  />
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <select
                    value={app.status || "Pending"}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
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

                {/* Actions */}
                <td className="px-4 py-3 text-center space-x-1">
                  <button
                    onClick={() => handleReply(app._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Send Reply
                  </button>
                  <button
                    onClick={() => handleResendEmail(app._id)}
                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm"
                  >
                    Resend Email
                  </button>
                </td>
              </tr>
            ))}

            {paginated.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Prev
          </button>
          <span className="px-3 py-1 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}