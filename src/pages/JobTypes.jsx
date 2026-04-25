import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function JobTypes() {
  const API = "https://joblinkbackend.onrender.com/api";
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get(`${API}/jobs/types`)
      .then(res => setTypes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-6 text-center">
        Job Types
      </h1>

      <div className="grid gap-4">

        {types.map((type) => (
          <div
            key={type._id}
            className="flex justify-between items-center border p-4 rounded bg-white shadow"
          >
            <div>
              <h2 className="font-bold text-lg">
                {type._id || "Other"}
              </h2>
              <p className="text-gray-500">
                {type.count} jobs
              </p>
            </div>

            <Link
              to={`/jobs?type=${type._id}`}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              View Jobs
            </Link>
          </div>
        ))}

      </div>

      {/* Back */}
      <div className="flex justify-center mt-6">
        <Link to="/" className="text-blue-600 underline">
          ← Back to Home
        </Link>
      </div>

    </div>
  );
}