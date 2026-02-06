import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function HistoryPage() {
  const { token } = useParams(); // publicToken
  const [application, setApplication] = useState(null);

  const apiBase = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    axios
      .get(`${apiBase}/api/applications/history/${token}`)
      .then((res) => setApplication(res.data))
      .catch(() => alert("Invalid history link"));
  }, [token, apiBase]);

  if (!application) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-3">Application Status</h2>

      <p><strong>Name:</strong> {application.fullname}</p>
      <p><strong>Job:</strong> {application.jobPosition}</p>
      <p><strong>Status:</strong> {application.status}</p>
      <p><strong>Reply:</strong> {application.reply || "No reply yet"}</p>

      {application.proofFile && (
        <a
          href={`${apiBase}${application.proofFile}`}
          target="_blank"
          rel="noreferrer"
          className="block text-blue-600 underline mt-2"
        >
          View Proof of Payment
        </a>
      )}

      {application.resumeFile && (
        <a
          href={`${apiBase}${application.resumeFile}`}
          target="_blank"
          rel="noreferrer"
          className="block text-blue-600 underline mt-2"
        >
          View Resume / CV
        </a>
      )}
    </div>
  );
}