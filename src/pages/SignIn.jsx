export import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
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
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border p-2 rounded pr-16"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-blue-600"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded flex justify-center items-center"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* SWITCH */}
      <p className="text-sm text-center mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
} function Login() {
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
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="w-full border p-2 rounded"
    onChange={(e) =>
      setForm({ ...form, password: e.target.value })
    }
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-2 top-2 text-sm text-blue-600"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

<button
  type="submit"
  disabled={loading}
  className="w-full bg-blue-600 text-white py-2 rounded"
>
  {loading ? "Logging in..." : "Login"}
</button>

</form>

<p className="text-sm text-center mt-4">
  Don't have an account?{" "}
  <Link to="/signup" className="text-blue-600">
    SignUp
  </Link>
</p>

</div>
);