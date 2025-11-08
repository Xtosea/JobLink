import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);

  const login = (token) => {
    localStorage.setItem("adminToken", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};