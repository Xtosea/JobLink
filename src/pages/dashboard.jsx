import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ApplicantDashboard() {
  const { token } = useParams();
  const [app, setApp] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/applications/access/${token}`)
      .then(res => setApp(res.data))
      .catch(() => alert("Link expired"));
  }, [token]);

  if (!app) return null;

  return (
    <div>
      <h2>{app.jobPosition}</h2>
      <p>Status: {app.status}</p>
      <p>Admin Reply: {app.reply || "No reply yet"}</p>
    </div>
  );
}