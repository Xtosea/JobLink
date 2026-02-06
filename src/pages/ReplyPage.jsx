import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import {
  listApplications,
  replyToApplication,
  resendApplicationEmail,
} from "../api/adminApi";

export default function ReplyPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [apps, setApps] = useState([]);
  const [selectedReply, setSelectedReply] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const apiBase = process.env.REACT_APP_API_BASE || "https://joblinknigeria.vercel.app";
  const appName = process.env.REACT_APP_NAME || "JobLink Admin Dashboard";
  const logoUrl = process.env.REACT_APP_LOGO_URL || "/logo192.png";
  const brandColor = "#22c55e";

  // 🔐 Protect page
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const res = await listApplications(token);
      setApps(res.data);
    } catch (err) {
      console.error(err);
      alert("Unauthorized. Please login again.");
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleReplyChange = (id, value) =>
    setSelectedReply((prev) => ({ ...prev, [id]: value }));

  const sendReply = async (id) => {
    const reply = selectedReply[id] || "";
    if (!reply) return alert("Reply cannot be empty");

    try {
      await replyToApplication(id, { reply, status: "Replied" }, token);
      alert("Reply saved successfully");
      fetchApps();
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
    }
  };

  const resendEmail = async (id) => {
    try {
      await resendApplicationEmail(id, token);
      alert("Email resent successfully");
    } catch (err) {
      alert("Failed to resend email");
    }
  };

  // ✅ Pagination
  const totalPages = Math.ceil(apps.length / pageSize);
  const paginated = apps.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ✅ Generate PDF
  const generatePDF = (appsToExport, filename) => {
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

      appsToExport.forEach((app, i) => {
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
        doc.text(
          `Resume: ${app.resumeFile ? apiBase + app.resumeFile : "None"}`,
          10,
          y
        );
        y += 6;
        doc.text(
          `Proof: ${app.proofFile ? apiBase + app.proofFile : "None"}`,
          10,
          y
        );
        y += 8;
      });

      doc.save(filename);
    };
  };

  const downloadCurrentPage = () => generatePDF(paginated, "current_page.pdf");
  const downloadAll = () => generatePDF(apps, "all_applications.pdf");

  if (loading) return <p className="text-center mt-10">Loading applications...</p>;

  return (
    <div className="max-w-4xl mx-auto grid gap-4">
      <h2 className="text-xl font-bold">Applications / Admin Reply</h2>

      {apps.length === 0 && (
        <p className="text-gray-500">No applications found.</p>
      )}

      {/* PDF buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={downloadCurrentPage}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Download Current Page PDF
        </button>
        <button
          onClick={downloadAll}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Download All Applications PDF
        </button>
      </div>

      {paginated.map((app) => (
        <div key={app._id} className="p-4 bg-white rounded shadow">
          <div className="flex justify-between gap-4">
            <div>
              <div className="font-semibold">
                {app.fullname} — {app.jobPosition} ({app.jobType})
              </div>
              <div className="text-sm">
                {app.email} | {app.mobile}
              </div>
              <div className="text-xs text-gray-500">
                Submitted: {new Date(app.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="text-sm">
              {app.resumeFile ? (
                <a
                  href={`${apiBase}${app.resumeFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View CV
                </a>
              ) : (
                <span className="text-gray-400 italic">No CV</span>
              )}
              <br />
              {app.proofFile ? (
                <a
                  href={`${apiBase}${app.proofFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline"
                >
                  View Proof
                </a>
              ) : (
                <span className="text-gray-400 italic">No Proof</span>
              )}
            </div>
          </div>

          <div className="mt-3">
            <textarea
              placeholder="Write reply to applicant"
              value={selectedReply[app._id] ?? app.reply ?? ""}
              onChange={(e) =>
                handleReplyChange(app._id, e.target.value)
              }
              className="w-full p-2 border rounded h-24"
            />

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => sendReply(app._id)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save Reply
              </button>

              <button
                onClick={() => resendEmail(app._id)}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Resend Email
              </button>
            </div>

            {app.reply && (
              <div className="mt-2 p-2 bg-gray-100 text-sm">
                <strong>Current reply:</strong> {app.reply}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
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