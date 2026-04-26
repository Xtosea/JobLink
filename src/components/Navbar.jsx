import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">

      {/* LEFT - BRAND */}
      <Link to="/jobs" className="font-bold text-xl text-blue-600">
        JobLink
      </Link>

      {/* CENTER - NAV LINKS */}
      <div className="flex gap-4 items-center">

        <Link to="/jobs" className="text-gray-700">
          Jobs
        </Link>

  <Link to="/terms" className="text-gray-700">
          Terms And Conditions 

  <Link to="/about" className="text-gray-700">
          About Us


  <Link to="/apply" className="text-gray-700">
          Apply


        {/* 👇 EMPLOYER ONLY */}
        {user?.role === "employer" && (
          <Link
            to="/employer-dashboard"
            className="text-green-600 font-medium"
          >
            Dashboard
          </Link>
        )}

        {/* 👇 APPLICANT ONLY */}
        {user?.role === "applicant" && (
          <Link to="/jobs" className="text-purple-600">
            Find Jobs
          </Link>
        )}
      </div>

      {/* RIGHT - AUTH AREA */}
      <div className="flex items-center gap-3">

        {user ? (
          <>
            <span className="text-sm text-gray-700">
              👋 {user.name}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              SignOut
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              className="text-blue-600 font-medium"
            >
              SignIn
            </Link>

            <Link
              to="/signup"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}