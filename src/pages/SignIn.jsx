import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API = "https://joblinkbackend.onrender.com/api";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API}/auth/login`,
        form
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful");

      if (data.user.role === "employer") {
        navigate("/employer-dashboard");
      } else {
        navigate("/jobs");
      }

    } catch (err) {
      alert("Invalid login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">

      <h2 className="text-xl font-bold mb-4 text-center">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD FIELD */}
        <div className="relative">
          <input
            type={show