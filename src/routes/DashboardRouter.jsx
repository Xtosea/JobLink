import React from "react";
import EmployerDashboard from "../pages/EmployerDashboard";
import JobApplicants from "../pages/ApplicantDashboard";
import AdminDashboard from "../pages/AdminDashboard";

export function DashboardRouter() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    user = null;
  }

  if (!user || !user.role) {
    return <div>Please login</div>;
  }

  if (user.role === "employer") {
    return <EmployerDashboard />;
  }

  if (user.role === "applicant") {
    return <ApplicantDashboard />;
  }

  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  return <div>Invalid role</div>;
}