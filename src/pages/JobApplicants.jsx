import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function JobApplicants() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);

  const API =
    "https://joblinkbackend.onrender.com/api";

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${API}/jobs/${id}/applicants`,
        {
          headers: { Authorization: token },
        }
      );

      setApplicants(data);
    };

    fetchApplicants();
  }, [id]);


  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Job Applicants 👨‍💼
      </h1>

      {applicants.length === 0 ? (
        <p>No applicants yet</p>
      ) : (
        applicants.map((app) => (
          <div
            key={app._id}
            <div className="border p-4 mb-3 rounded bg-white">

  <h2 className="font-bold">{app.name}</h2>

  <p>Email: {app.email}</p>

  <p className="text-sm text-gray-500">
    Applied: {new Date(app.appliedAt).toLocaleString()}
  </p>

  <p className="mt-1">
    Status: <b>{app.status || "Pending"}</b>
  </p>

  {app.cvFile && (
    <a
      href={app.cvFile}
      target="_blank"
      className="text-blue-600 underline"
    >
      View CV
    </a>
  )}

  {/* ACTION BUTTONS */}
  <div className="flex gap-2 mt-3">

    <button
      onClick={() => updateStatus(app._id, "Accepted")}
      className="bg-green-500 text-white px-3 py-1 rounded"
    >
      Accept
    </button>

    <button
      onClick={() => updateStatus(app._id, "Rejected")}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      Reject
    </button>

  </div>
</div>
  );
}