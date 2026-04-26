import React from "react";
import EmployerDashboard from "./EmployerDashboard";
import RoleDashboard from "./ApplicantDashboard";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <p>Please login</p>;
  }

  if (user.role === "employer") {
    return <EmployerDashboard />;
  }

  if (user.role === "applicant") {
    return <JobApplicants />;
  }

  if (user.role === "admin") {
    return <p>Admin Dashboard (coming soon)</p>;
  }

  return <p>Invalid role</p>;
}