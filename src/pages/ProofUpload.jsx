// pages/ProofUpload.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadFiles } from "../api/api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProofUpload() {
  const query = useQuery();
  const id = query.get("id"); // must match /upload/:id
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
      const formData = new FormData();
      formData.append("proofFile", proofFile);
      formData.append("resumeFile", resumeFile);

      const res = await uploadFiles(id, formData); // id matches route param

      console.log("UPLOAD RESPONSE:", res.data);
      alert("Files uploaded successfully!");
      navigate("/");
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setProofFile(e.target.files[0])} required />
      <input type="file" onChange={(e) => setResumeFile(e.target.files[0])} required />
      <button type="submit">Submit</button>
    </form>
  );
}