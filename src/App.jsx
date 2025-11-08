import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ApplicantForm from "./pages/ApplicantForm";
import ProofUpload from "./pages/ProofUpload";
import ReplyPage from "./pages/ReplyPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 p-6">
        <nav className="max-w-4xl mx-auto flex gap-4 mb-6">
          <Link to="/" className="underline">
            Apply
          </Link>
          <Link to="/upload" className="underline">
            Upload
          </Link>
          <Link to="/reply" className="underline">
            Admin Reply
          </Link>
          <Link to="/admin/login" className="underline">
            Admin Login
          </Link>
          <Link to="/admin" className="underline">
            Dashboard
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<ApplicantForm />} />
          <Route path="/upload" element={<ProofUpload />} />
          <Route path="/reply" element={<ReplyPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}