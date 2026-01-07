// src/pages/ProofUpload.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProofUpload() {
  const { token } = useParams(); // email token
  const [app, setApp] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const API = process.env.REACT_APP_API_BASE;

  // Load application by token
  useEffect(() => {
    axios
      .get(`${API}/api/applications/access/${token}`)
      .then(res => setApp(res.data))
      .catch(() => alert("Link expired or invalid"));
  }, [token]);

  const submit = async e => {
    e.preventDefault();
    if (!proofFile || !resumeFile) {
      return alert("Select both files");
    }

    const fd = new FormData();
    fd.append("proofFile", proofFile);
    fd.append("resumeFile", resumeFile);

    await axios.patch(
      `${API}/api/applications/upload/${token}`,
      fd
    );

    alert("Files uploaded successfully");
  };

  if (!app) return null;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-3">Upload Proof & CV</h2>

      <p>
        Hello <b>{app.fullname}</b>, upload your files for
        <b> {app.jobPosition}</b>
      </p>

      <form onSubmit={submit} className="space-y-3 mt-3">
        <input type="file" onChange={e => setProofFile(e.target.files[0])} required />
        <input type="file" onChange={e => setResumeFile(e.target.files[0])} required />
        <button className="btn w-full">Submit Files</button>
      </form>
    </div>
  );
}