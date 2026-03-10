// App.js
import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

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
import AdBanner from "./components/AdBanner"; // Bottom ad


import Footer from "./components/Footer";

import HashLink from "./components/HashLink";
import InstallPWAButton from "./components/InstallPWAButton";
import HpfAd from "./components/HpfAd";

export default function App() {
  const [applicationToken, setApplicationToken] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col">

        {/* ================= NAVIGATION ================= */}
        <nav className="max-w-4xl mx-auto flex flex-wrap gap-4 mb-6">
          <HashLink to="/apply" className="underline">Apply</HashLink>

          {applicationToken && (
            <>
              <HashLink to={`/upload/${applicationToken}`} className="underline">
                Upload Proof
              </HashLink>

              <HashLink to={`/history/${applicationToken}`} className="underline">
                History
              </HashLink>
            </>
          )}

          <HashLink to="/about" className="underline">About Us</HashLink>
          <HashLink to="/terms" className="underline">Terms And Conditions</HashLink>
        </nav>

<nav>...</nav>

<div className="max-w-4xl mx-auto w-full flex justify-center">
  <HpfAd position="top" />
</div>

{/* ================= ROUTES ================= */}
<div className="flex-grow">
  <Routes>
    <Route path="/apply" element={<ApplicantForm setApplicationToken={setApplicationToken} />} />
    <Route path="/upload/:token" element={<ProofUpload />} />
    <Route path="/history/:token" element={<HistoryPage />} />

    <Route path="/reply" element={<ReplyPage />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminDashboard />} />

    <Route path="/about" element={<About />} />
    <Route path="/terms" element={<Terms />} />

    <Route path="/" element={<ApplicantForm setApplicationToken={setApplicationToken} />} />
  </Routes>

  <InstallPWAButton />
</div>

<div className="max-w-4xl mx-auto w-full flex justify-center">
  <HpfAd position="bottom" />
</div>

<div className="max-w-4xl mx-auto w-full p-6 flex flex-col items-center gap-6">
  <AdBanner position="bottom" />
</div>


       <Footer />
      </div>
    </Router>
  );
    }        
