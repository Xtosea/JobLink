import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { appHashLink } from "../utils/routes";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const API =
    process.env.REACT_APP_API_URL ||
    "https://joblinkbackend.onrender.com/api";

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  // 🔊 SOUND
  const notificationSound = new Audio("/sounds/notify.mp3");
  const prevNotifCount = useRef(0);

  useEffect(() => {
    fetchApplications();
    fetchNotifications();
  }, []);

  // FETCH APPLICATIONS
  const fetchApplications = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/applications`);

      let data = res.data;

      if (res.data.applications) {
        data = res.data.applications;
      }

      if (!Array.isArray(data)) data = [];

      setApplications(data);

    } catch (err) {
      console.error(err);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  // FETCH NOTIFICATIONS
  const fetchNotifications = async () => {
    try {

      const res = await axios.get(`${API}/notifications`);
      const newData = res.data.notifications || [];

      if (newData.length > prevNotifCount.current) {
        notificationSound.play().catch(() => {});
      }

      prevNotifCount.current = newData.length;
      setNotifications(newData);

    } catch (err) {
      console.error(err);
    }
  };

  // AUTO REFRESH
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {

      await axios.patch(`${API}/applications/${id}/status`, {
        status
      });

      fetchApplications();
      fetchNotifications();

    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  // FILTER
  const filteredApplications = applications.filter((app) => {

    const matchesStatus =
      statusFilter === "All" || app.status === statusFilter;

    const matchesSearch =
      app.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const start = (page - 1) * perPage;
  const current = filteredApplications.slice(start, start + perPage);
  const totalPages = Math.ceil(filteredApplications.length / perPage);

  const totalApplicants = applications.length;

  const formatDate = (date) => {
    if (!date) return "No date";
    return new Date(date).toLocaleString();
  };

  const statusColor = {
    Approved: "bg-green-500",
    Declined: "bg-red-500",
    Pending: "bg-yellow-500",
    Processing: "bg-blue-500",
    Shortlisted: "bg-purple-500",
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>

        <div className="flex items-center gap-4">

          {/* NOTIFICATIONS */}
          <div className="relative">

            <button
              onClick={() => setShowNotif(!showNotif)}
              className="text-2xl"
            >
              🔔
            </button>

            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {notifications.length}
              </span>
            )}

            {showNotif && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded z-50">

                <div className="p-2 border-b font-semibold">
                  Notifications
                </div>

                {notifications.length === 0 ? (
                  <p className="p-2 text-sm text-gray-500">
                    No notifications
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div key={n._id} className="p-2 border-b text-sm">
                      <p>{n.message}</p>
                      <span className="text-xs text-gray-400">
                        {formatDate(n.createdAt)}
                      </span>
                    </div>
                  ))
                )}

              </div>
            )}

          </div>

          {/* TOTAL */}
          <div className="bg-gray-100 px-3 py-1 rounded">
            Total: <b>{totalApplicants}</b>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search name or email..."
        className="border p-2 w-full md:w-1/2 rounded mb-4"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
      />

      {/* FILTER */}
      <div className="mb-2 flex items-center gap-3">

        <label className="font-medium">Filter:</label>

        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Approved">Approved</option>
          <option value="Declined">Declined</option>
        </select>

      </div>

      <p className="text-sm text-gray-600 mb-4">
        Showing {current.length} of {filteredApplications.length}
      </p>

      {/* LIST */}
      <div className="grid gap-4">

        {current.map((app) => (

          <div
            key={app._id || app.token}
            className="border p-4 rounded shadow bg-white"
          >

            <h2 className="font-bold text-lg">
              {app.fullname || "Unknown"}
            </h2>

            <p>Email: {app.email}</p>
            <p>Position: {app.jobPosition}</p>

            <p className="text-sm text-gray-500">
              Applied: {formatDate(app.createdAt)}
            </p>

            {/* STATUS */}
            <div className="mt-2">

              <span
                className={`px-2 py-1 text-white rounded ${
                  statusColor[app.status] || "bg-gray-400"
                }`}
              >
                {app.status || "Pending"}
              </span>

              <select
                className="border ml-2 p-1"
                value={app.status || "Pending"}
                onChange={(e) =>
                  updateStatus(app._id, e.target.value)
                }
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Shortlisted</option>
                <option>Approved</option>
                <option>Declined</option>
              </select>

            </div>

            {/* LINKS */}
            <div className="mt-3 flex flex-wrap gap-4">

              {app.resumeFile && (
                <a
                  href={app.resumeFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              )}

              {app.proofFile && (
                <a
                  href={app.proofFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline"
                >
                  View Payment Proof
                </a>
              )}

              <a
                href={appHashLink(`/reply?token=${app.token}`)}
                className="text-purple-600 underline"
              >
                Reply
              </a>

              <a
                href={appHashLink(`/history/${app.token}`)}
                className="text-gray-700 underline"
              >
                History
              </a>

            </div>

          </div>

        ))}

      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-6 flex-wrap">

          {Array.from({ length: totalPages }).map((_, i) => (

            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              {i + 1}
            </button>

          ))}

        </div>
      )}

    </div>
  );
}