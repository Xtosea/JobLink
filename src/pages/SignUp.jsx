import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "applicant",
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
        `${API}/auth/register`,
        form
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Registered successfully");

      navigate("/jobs");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">

      <h2 className="text-xl font-bold mb-4 text-center">
        Register
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Name"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border p-2 rounded pr-16"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-green-600"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* ROLE */}
        <select
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="applicant">Applicant</option>
          <option value="employer">Employer</option>
        </select>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded flex justify-center items-center"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Register"
          )}
        </button>
      </form>

      {/* SWITCH */}
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-green-600 font-semibold">
          SignIn
        </Link>
      </p>
    </div>
  );
}