import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function History() {
  const { token } = useParams(); // publicToken
  const [application, setApplication] = useState(null);

  const apiBase = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    axios
      .get(`${apiBase}/api/applications/history/${token}`)
      .then((res) => setApplication(res.data))
      .catch(() => alert("Invalid or expired history link"));
  }, [token, apiBase]);

  if (!application) return <p className="text-center mt-10">Loading...</p>;

  // 🔹 Handle both Cloudinary & local URLs
  const getFileUrl = (file) => {
    if (!file) return null;
    return file.startsWith("http") ? file : `${apiBase}${file}`;
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Application Status</h2>

      <div className="space-y-1 text-gray-800">
        <p><strong>Name:</strong> {application.fullname}</p>
        <p><strong>Job:</strong> {application.jobPosition}</p>
        <p><strong>Status:</strong> {application.status}</p>
        <p><strong>Reply:</strong> {application.reply || "No reply yet"}</p>
      </div>

      <div className="mt-4 space-y-2">
        {application.proofFile && (
          <a
            href={getFileUrl(application.proofFile)}
            target="_blank"
            rel="noreferrer"
            className="block text-blue-600 underline"
          >
            View Proof of Payment
          </a>
        )}

        {application.resumeFile && (
          <a
            href={getFileUrl(application.resumeFile)}
            target="_blank"
            rel="noreferrer"
            className="block text-blue-600 underline"
          >
            View Resume / CV
          </a>
        )}
      </div>
    </div>
  );
}