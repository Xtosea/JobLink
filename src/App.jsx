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
import About from "./pages/About";
import Terms from "./pages/Terms";

export default function App() {
  const [applicationToken, setApplicationToken] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6">

        {/* ================= NAVIGATION ================= */}
        <nav className="max-w-4xl mx-auto flex flex-wrap gap-4 mb-6">
          {/* Applicant */}
          <Link to="/apply" className="underline">
            Apply
          </Link>

          {applicationToken && (
            <Link to={`/upload/${applicationToken}`} className="underline">
              Upload Proof
            </Link>
          )}

          

                {/* About */}
          <Link to="/about" className="underline">
            About Us
          </Link>

                {/* Terms */}
          <Link to="/terms" className="underline">
            Terms And Conditions 
          </Link>
        </nav>

        {/* ================= ROUTES ================= */}
        <Routes>
          {/* Applicant Routes */}
          <Route
            path="/apply"
            element={<ApplicantForm setApplicationToken={setApplicationToken} />}
          />

          {/* ✅ THIS IS THE IMPORTANT ROUTE */}
          <Route
            path="/upload/:token"
            element={<ProofUpload />}
          />

          <Route
            path="/history/:token"
            element={<HistoryPage />}
          />

          {/* Admin Routes */}
          <Route path="/reply" element={<ReplyPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Default */}
          <Route
            path="/"
            element={<ApplicantForm setApplicationToken={setApplicationToken} />}
          />
  
        <Route path="/about" 
        element={<About />} />
        <Route path="/terms"
        element={<Terms />} />
        </Routes>
      </div>
    </Router>
  );
}