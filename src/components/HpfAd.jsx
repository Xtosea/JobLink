// src/components/HpfAd.jsx
import { useEffect } from "react";

export default function HpfAd({ position }) {
  useEffect(() => {
    if (document.getElementById("hpf-script")) return;

    // Define global options
    window.atOptions = {
      key: "0698f40cc0211ce2e04185b62213da66",
      format: "iframe",
      height: 60,
      width: 320,
      params: {}
    };

    // Add script dynamically
    const script = document.createElement("script");
    script.id = "hpf-script";
    script.src = "https://www.highperformanceformat.com/0698f40cc0211ce2e04185b62213da66/invoke.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id={`hpf-container-${position}`}
      style={{ width: "100%", textAlign: "center", margin: "20px 0" }}
    ></div>
  );
}