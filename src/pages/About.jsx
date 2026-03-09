import React from "react";

export default function About() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        TailwindCSS Test
      </h1>

      <p className="text-lg text-gray-700 mb-4">
        If you see this styled text, TailwindCSS is working correctly in your app!
      </p>

      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
        Test Button
      </button>
    </div>
  );
}