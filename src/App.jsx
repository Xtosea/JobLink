// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Applicant pages
import ApplicantForm from "./pages/ApplicantForm";
import ProofUpload from "./pages/ProofUpload";
import HistoryPage from "./pages/History";

// Admin pages
import ReplyPage from "./pages/ReplyPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  // Track last submitted applicant ID (optional, for showing upload link)
  const [applicationId, setApplicationId] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* ================= NAVIGATION ================= */}
        <nav className="max-w-4xl mx-auto flex flex-wrap gap-4 mb-6">
          {/* Applicant Links */}
          <Link to="/apply" className="underline">
            Apply
          </Link>

          {applicationId && (
            <Link to={`/applicant/upload?id=${applicationId}`} className="underline">
              Upload
            </Link>
          )}

          <Link to="/history/:token" className="underline">
            My History
          </Link>

          {/* Admin Links */}
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

        {/* ================= ROUTES ================= */}
        <Routes>
          {/* Applicant Routes */}
          <Route
            path="/apply"
            element={<ApplicantForm setApplicationId={setApplicationId} />}
          />
          <Route path="/applicant/:token" element={<ProofUpload />} />
          <Route path="/history/:token" element={<HistoryPage />} />

          {/* Admin Routes */}
          <Route path="/reply" element={<ReplyPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Optional: redirect "/" to apply */}
          <Route path="/" element={<ApplicantForm setApplicationId={setApplicationId} />} />
        </Routes>
      </div>
    </Router>
  );
}