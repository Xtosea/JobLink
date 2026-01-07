import { useState } from "react";
import axios from "axios";

export default function ApplicantForm() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    mobile: "",
    jobType: "",
    jobPosition: "",
  });

  const submit = async e => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/applications`,
        form
      );
      alert("Application submitted. Check your email!");
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-4 space-y-3">
      <input placeholder="Full Name" onChange={e => setForm({...form, fullname: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Mobile" onChange={e => setForm({...form, mobile: e.target.value})} />
      <select onChange={e => setForm({...form, jobType: e.target.value})}>
        <option value="">Select Job Type</option>
        <option>Full-time</option>
        <option>Part-time</option>
      </select>
      <input placeholder="Job Position" onChange={e => setForm({...form, jobPosition: e.target.value})} />
      <button className="btn">Submit Application</button>
    </form>
  );
}