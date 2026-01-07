import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ProofUpload() {
  const { token } = useParams(); // token from email link
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const apiBase = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const res = await axios.get(`${apiBase}/api/applications/access/${token}`);
        setApplication(res.data);
      } catch (err) {
        console.error(err);
        alert("Invalid or expired link");
        navigate("/");
      }
    };
    fetchApp();
  }, [token, navigate, apiBase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!proofFile || !resumeFile) return alert("Please select both files");

    const formData = new FormData();
    formData.append("proofFile", proofFile);
    formData.append("resumeFile", resumeFile);

    try {
      await axios.patch(`${apiBase}/api/applications/upload/${token}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Files uploaded successfully!");
      navigate("/history");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again");
    }
  };

  if (!application) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-3">Upload Proof & CV</h2>
      <p className="mb-3 text-gray-700">
        Hello {application.fullname}, upload your <strong>Proof of Payment</strong> and <strong>Resume/CV</strong> for <strong>{application.jobPosition}</strong>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label>Proof of Payment</label>
          <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={e => setProofFile(e.target.files[0])} required />
        </div>
        <div>
          <label>Resume/CV</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={e => setResumeFile(e.target.files[0])} required />
        </div>
        <button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">Upload Files</button>
      </form>
    </div>
  );
}