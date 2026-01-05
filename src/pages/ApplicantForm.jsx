import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitApplication } from "../api/api"; // your API function

export default function ApplicantForm({ setApplicationId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await submitApplication({ name, email });

      // Get the ID of the newly created application
      const id = res.data.application._id;

      // Save ID in App state
      setApplicationId(id);

      // Redirect to upload page with proper query parameter
      navigate(`/upload?id=${id}`);
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-3">Application Form</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}