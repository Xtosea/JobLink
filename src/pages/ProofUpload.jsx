// src/pages/ProofUpload.jsx
import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProofUpload() {
  const query = useQuery();
  const id = query.get("id");
  const navigate = useNavigate();

  const [proofFile, setProofFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    if (!id) {
      alert("Missing application ID. Redirecting...");
      navigate("/");
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!proofFile || !resumeFile) return alert("Please upload both files");

    try {
      // Upload Proof File
      const proofRef = ref(storage, `proofs/${Date.now()}-${proofFile.name}`);
      await uploadBytes(proofRef, proofFile);
      const proofUrl = await getDownloadURL(proofRef);

      // Upload Resume File
      const resumeRef = ref(storage, `resumes/${Date.now()}-${resumeFile.name}`);
      await uploadBytes(resumeRef, resumeFile);
      const resumeUrl = await getDownloadURL(resumeRef);

      // Save URLs in backend
      await axios.patch(
        `https://joblinkbackend.onrender.com/api/applications/upload/${id}`,
        { proofFile: proofUrl, resumeFile: resumeUrl }
      );

      alert("Files uploaded successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-3">Upload Proof & CV</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">Proof of Payment</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => setProofFile(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label className="block mb-1">CV / Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-green-600 text-white rounded">
          Submit Application
        </button>
      </form>
    </div>
  );
}