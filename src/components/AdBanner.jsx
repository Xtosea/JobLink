import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://pl28748982.effectivegatecpm.com/872356e7bdfe5cfb68809141542a5ee2/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    document.getElementById(
      "container-872356e7bdfe5cfb68809141542a5ee2"
    )?.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      id="container-872356e7bdfe5cfb68809141542a5ee2"
      style={{ margin: "20px 0", textAlign: "center" }}
    ></div>
  );
}