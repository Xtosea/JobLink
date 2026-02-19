import { useEffect } from "react";

export default function AdBanner({ position }) {
  useEffect(() => {
    if (document.getElementById("effectivegate-script")) return;

    const script = document.createElement("script");
    script.id = "effectivegate-script";
    script.src =
      "https://pl28748982.effectivegatecpm.com/872356e7bdfe5cfb68809141542a5ee2/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    document.body.appendChild(script);
  }, []);

  return (
    <div
      id={`container-872356e7bdfe5cfb68809141542a5ee2-${position}`}
      style={{
        margin: "20px 0",
        textAlign: "center",
        width: "100%",
      }}
    >
      <div id="container-872356e7bdfe5cfb68809141542a5ee2"></div>
    </div>
  );
}