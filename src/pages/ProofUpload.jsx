// src/pages/ProofUpload.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProofUpload() {
  const { token, user } = useContext(AuthContext);
  const query = useQuery();
  const id = query.get("id"); // application ID from email link
  const navigate = useNavigate();

  const [proofFile, setProofFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [application, setApplication] = useState(null);

  const apiBase = process.env.REACT_APP_API_BASE || "http://localhost:5000";

  // ✅ Load application and check ownership
  useEffect(() => {
    if (!token) return navigate("/login");
    if (!id) {
      alert("Missing application ID.");
      return navigate("/");
    }

    const fetchApplication = async () => {
      try {
        const res = await axios.get(`${apiBase}/api/applications/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.user !== user._id) {
          alert("You are not allowed to upload files for this application.");
          return navigate("/");
        }
        setApplication(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load application.");
        navigate("/");
      }
    };
    fetchApplication();
  }, [id, token, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!proofFile || !resumeFile) return alert("Please select both files.");

    const formData = new FormData();
    formData.append("proofFile", proofFile);
    formData.append("resumeFile", resumeFile);

    try {
      const res = await axios.patch(`${apiBase}/api/applications/upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Files uploaded successfully!");
      navigate("/history"); // redirect to applicant history page
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-3">Upload Proof & CV</h2>

      {application && (
        <p className="mb-3 text-gray-700">
          Hello {user.fullname}, please upload your <strong>Proof of Payment</strong> and <strong>Resume/CV</strong> for your application to <strong>{application.jobPosition}</strong>.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1 font-medium">Proof of Payment</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => setProofFile(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">CV / Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit Files
        </button>
      </form>
    </div>
  );
}