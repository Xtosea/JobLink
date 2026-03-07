import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function ReplyPage() {

  const [params] = useSearchParams();

  const token = params.get("token");

  const API = process.env.REACT_APP_API_URL;

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("processing");
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {

    if (!token) return;

    axios
      .get(`${API}/api/applications/${token}`)
      .then((res) => setApplicant(res.data))
      .catch(console.error);

  }, [token]);

  const sendReply = async () => {

    try {

      await axios.post(`${API}/api/admin/reply`, {
        token,
        message,
        status,
      });

      alert("Reply sent successfully");

      setMessage("");

    } catch (err) {

      console.error(err);
      alert("Failed to send reply");

    }

  };

  if (!applicant) {
    return <p>Loading applicant...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        Reply to Applicant
      </h1>

      <p className="mb-2">
        <strong>Name:</strong> {applicant.fullname}
      </p>

      <p className="mb-4">
        <strong>Email:</strong> {applicant.email}
      </p>

      <label className="block mb-2">
        Status
      </label>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="processing">Processing</option>
        <option value="reviewing">Reviewing</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
        <option value="completed">Completed</option>
      </select>

      <label className="block mb-2">
        Message
      </label>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="6"
        className="border p-2 w-full mb-4"
      />

      <button
        onClick={sendReply}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Send Reply
      </button>

    </div>
  );
}