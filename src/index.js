import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
<React.StrictMode>
<AuthProvider>
<App />
</AuthProvider>
</React.StrictMode>
);

// Register Service Worker
if ("serviceWorker" in navigator) {
window.addEventListener("load", () => {
navigator.serviceWorker
.register("/service-worker.js")
.then((reg) => console.log("Service worker registered", reg))
.catch((err) => console.log("Service worker failed", err));
});
}