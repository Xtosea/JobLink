import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ProofUpload() {
  const { token: rawToken } = useParams();

// handle email tracking links
const token = rawToken.split("/").pop();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiBase = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    axios
      .get(`${apiBase}/api/applications/access/${token}`)
      .then((res) => setApplication(res.data))
      .catch(() => {
        alert("Invalid or expired link");
        navigate("/");
      });
  }, [token, apiBase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!proofFile || !resumeFile) {
      return alert("Please select both files");
    }

    const formData = new FormData();
    formData.append("proofFile", proofFile);
    formData.append("resumeFile", resumeFile);

    try {
      setLoading(true);

      const res = await axios.patch(
        `${apiBase}/api/applications/upload/cloud/${token}`,
        formData
      );

      alert("Files uploaded successfully!");
      navigate(`/history/${res.data.publicToken}`);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

  if (!application) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-3">Upload Proof & CV</h2>

      <p className="mb-4 text-gray-700">
        Hello <strong>{application.fullname}</strong>, upload your{" "}
        <strong>Proof of Payment</strong> and <strong>Resume/CV</strong> for{" "}
        <strong>{application.jobPosition}</strong>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Proof of Payment</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => setProofFile(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Resume / CV</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Files"}
        </button>
      </form>
    </div>
  );
}