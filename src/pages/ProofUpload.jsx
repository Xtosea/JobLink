import React, { useState, useEffect } from "react";
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
      alert("Missing application ID");
      navigate("/");
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!proofFile || !resumeFile) {
      alert("Please upload both files");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("proofFile", proofFile);
      formData.append("resumeFile", resumeFile);

      await axios.patch(
        `https://joblinkbackend.onrender.com/api/applications/upload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Application submitted successfully");
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

        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}