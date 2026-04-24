import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-native";


export default function Jobs() {
  const API = "http://localhost:5000/api";

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await axios.get(`${API}/jobs`);
      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>

      {jobs.map((job) => (
        <Link key={job._id} to={`/jobs/${job._id}`}>

   Button
  title="Browse Jobs"
  onPress={() => navigation.navigate("Jobs")}
/>
          <div className="border p-3 mb-3 rounded cursor-pointer">
            <h3 className="font-bold">{job.title}</h3>
            <p>{job.company}</p>

            {job.isFeatured && (
              <span className="text-yellow-500 text-sm">
                🔥 Featured
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}