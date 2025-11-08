// pages/ApplicantForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApplication } from '../api/api';

export default function ApplicantForm() {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    mobile: '',
    jobType: '',
    jobPosition: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createApplication(form);
      navigate(`/upload?id=${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert('Error submitting application');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-3">Applicant Submission</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="fullname" value={form.fullname} onChange={handleChange} required placeholder="Full name" className="w-full p-2 border rounded" />
        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email" className="w-full p-2 border rounded" />
        <input name="mobile" value={form.mobile} onChange={handleChange} required placeholder="Mobile" className="w-full p-2 border rounded" />
        <select name="jobType" value={form.jobType} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
        <input name="jobPosition" value={form.jobPosition} onChange={handleChange} required placeholder="Type of job position" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Continue to Upload</button>
      </form>
    </div>
  );
}