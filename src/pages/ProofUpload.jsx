import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ProofUpload() {
  const { token: rawToken } = useParams();
  const token = rawToken.split("/").pop(); // handle tracking links
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const apiBase = process.env.REACT_APP_API_BASE;

  // Fetch application by token
  useEffect(() => {
    axios
      .get(`${apiBase}/api/applications/access/${token}`)
      .then((res) => setApplication(res.data))
      .catch(() => {
        alert("Invalid or expired link");
        navigate("/");
      });
  }, [token, apiBase, navigate]);

  // Upload file to Cloudinary with progress
  const uploadToCloudinary = (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );

      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
        if (response.secure_url) resolve(response.secure_url);
        else reject(new Error("Cloud upload failed"));
      };

      xhr.onerror = () => reject(new Error("Upload error"));

      xhr.send(formData);
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!proofFile || !resumeFile) {
      return alert("Please select both files");
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      // Upload proof → 0–50%
      const proofUrl = await uploadToCloudinary(proofFile, (p) =>
        setUploadProgress(Math.round(p / 2))
      );

      // Upload resume → 50–100%
      const resumeUrl = await uploadToCloudinary(resumeFile, (p) =>
        setUploadProgress(50 + Math.round(p / 2))
      );

      // Save URLs to backend
      const res = await axios.post(
        `${apiBase}/api/applications/upload/cloud/${token}`,
        { proofUrl, resumeUrl }
      );

      alert("Files uploaded successfully!");
      navigate(`/history/${res.data.publicToken}`);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again");
    } finally {
      setLoading(false);
      setUploadProgress(0);
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

        {/* Progress Bar */}
        {loading && (
          <>
            <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
              <div
                className="h-3 bg-green-600 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-center mt-1">
              Uploading... {uploadProgress}%
            </p>
          </>
        )}

        <button
          disabled={loading}
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Files"}
        </button>

        <label className="text-sm">
          <input type="checkbox" required /> I agree to the{" "}
          <a href="/terms" className="text-green-600 underline">
            Terms & Conditions
          </a>
        </label>
      </form>
    </div>
  );
}