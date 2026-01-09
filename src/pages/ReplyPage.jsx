import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listApplications,
  replyToApplication,
  resendApplicationEmail,
} from "../api/adminApi";

export default function ReplyPage() {
  const navigate = useNavigate();

  // 🔐 Admin token
  const token = localStorage.getItem("adminToken");

  const [apps, setApps] = useState([]);
  const [selectedReply, setSelectedReply] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔐 Protect page
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchApps();
  }, []);

  // 🔐 Fetch applications with token
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

  // 🔐 Save reply
  const sendReply = async (id) => {
    const reply = selectedReply[id] || "";
    if (!reply) return alert("Reply cannot be empty");

    try {
      await replyToApplication(
        id,
        { reply, status: "Replied" },
        token
      );
      alert("Reply saved successfully");
      fetchApps();
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
    }
  };

  // 🔁 Optional: resend email
  const resendEmail = async (id) => {
    try {
      await resendApplicationEmail(id, token);
      alert("Email resent successfully");
    } catch (err) {
      alert("Failed to resend email");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading applications...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto grid gap-4">
      <h2 className="text-xl font-bold">Applications / Admin Reply</h2>

      {apps.length === 0 && (
        <p className="text-gray-500">No applications found.</p>
      )}

      {apps.map((app) => (
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
              {app.resumeFile && (
                <a
                  href={app.resumeFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View CV
                </a>
              )}
              <br />
              {app.proofFile && (
                <a
                  href={app.proofFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline"
                >
                  View Proof
                </a>
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
    </div>
  );
}