// src/components/HpfAd.jsx
import { useEffect } from "react";

export default function HpfAd({ position }) {

  useEffect(() => {

    window.atOptions = {
      key: "b0720d2c534017e7cd46839c5a24c035",
      format: "iframe",
      height: 50,
      width: 320,
      params: {}
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/b0720d2c534017e7cd46839c5a24c035/invoke.js";
    script.async = true;

    const container = document.getElementById(`hpf-container-${position}`);

    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }

  }, [position]);

  return (
    <div
      id={`hpf-container-${position}`}
      style={{
        width: "100%",
        textAlign: "center",
        margin: "20px 0"
      }}
    />
  );
}