import React from "react";
import EmployerDashboard from "./pages/EmployerDashboard";
import ApplicantDashboard from "./pages/ApplicantDashboard";
import AdminDashboard from "./AdminDashboard";

export function DashboardRouter() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <div>Please login</div>;

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