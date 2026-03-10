// src/components/HpfAd.jsx
import { useEffect } from "react";

export default function HpfAd({ position }) {
  useEffect(() => {
    if (document.getElementById("hpf-script")) return;

    // Define global options
    window.atOptions = {
      'key' : 'b0720d2c534017e7cd46839c5a24c035',
    'format' : 'iframe',
    'height' : 50,
    'width' : 320,
    'params' : {}
  };
    // Add script dynamically
    const script = document.createElement("script");
    script.id = "hpf-script";
    script.src = "https://www.highperformanceformat.com/b0720d2c534017e7cd46839c5a24c035/invoke.js";
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