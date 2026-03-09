// src/pages/About.jsx
import React from "react";

export default function About() {
  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">About JobLink</h1>

      <p className="mb-4 text-base leading-relaxed">
        <strong>JobLink</strong> is a career support platform designed to help job seekers find suitable employment opportunities through guidance, preparation, and professional support.
      </p>

      <p className="mb-4 text-base leading-relaxed">
        Many applicants struggle not because they lack skills, but because they lack proper CVs, interview preparation, and access to job opportunities. JobLink bridges this gap by supporting applicants from application to interview readiness.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">What We Do</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Collect and review submitted CVs</li>
        <li>Update or create professional CVs</li>
        <li>Search and apply for suitable jobs on behalf of applicants</li>
        <li>Train applicants on interview preparation</li>
        <li>Provide structured job-hunting support</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">How It Works</h2>
      <ol className="list-decimal ml-6 mb-4">
        <li>Applicants submit their CV and application</li>
        <li>An auto-response email is sent with instructions</li>
        <li>Applicants submit proof of payment and CV</li>
        <li>JobLink reviews or creates the CV</li>
        <li>We begin job hunting and interview preparation</li>
      </ol>

      <h2 className="text-xl font-bold mt-6 mb-2">Our Goal</h2>
      <p className="mb-4 text-base leading-relaxed">
        Our goal is to reduce unemployment stress by helping applicants present themselves professionally and prepare confidently for interviews.
      </p>

      <a
        href="https://your-github-privacy-url" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors"
      >
        View Privacy Policy
      </a>
    </div>
  );
}