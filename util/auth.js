export const requireAuth = (navigate, message) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert(`Please login to ${message}`);
    navigate("/login");
    return false;
  }

  return true;
};