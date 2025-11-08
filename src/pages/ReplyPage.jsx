import React, { useEffect, useState } from 'react';
import { listApplications, replyToApplication } from '../api/api';

export default function ReplyPage() {
  const [apps, setApps] = useState([]);
  const [selectedReply, setSelectedReply] = useState({});

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const res = await listApplications();
      setApps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplyChange = (id, value) => setSelectedReply(prev => ({ ...prev, [id]: value }));

  const sendReply = async (id) => {
    const text = selectedReply[id] || '';
    try {
      await replyToApplication(id, text);
      alert('Reply saved');
      fetchApps();
    } catch (err) {
      console.error(err);
      alert('Failed to send reply');
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid gap-4">
      <h2 className="text-xl font-bold">Applications / Reply</h2>
      {apps.map(app => (
        <div key={app._id} className="p-3 bg-white rounded shadow">
          <div className="flex justify-between">
            <div>
              <div><strong>{app.fullname}</strong> — {app.position} ({app.jobType})</div>
              <div>{app.email} | {app.mobile}</div>
              <div className="text-sm text-gray-600">Submitted: {new Date(app.createdAt).toLocaleString()}</div>
            </div>
            <div>
              {app.cvFile && <a href={`${process.env.REACT_APP_API_BASE || 'http://localhost:5000'}/uploads/${app.cvFile}`} target="_blank" rel="noreferrer">View CV</a>}
              <br />
              {app.proofFile && <a href={`${process.env.REACT_APP_API_BASE || 'http://localhost:5000'}/uploads/${app.proofFile}`} target="_blank" rel="noreferrer">View Proof</a>}
            </div>
          </div>

          <div className="mt-2">
            <textarea placeholder="Write reply" value={selectedReply[app._id] || app.reply || ''} onChange={(e)=>handleReplyChange(app._id, e.target.value)} className="w-full p-2 border rounded h-24" />
            <div className="flex gap-2 mt-2">
              <button onClick={()=>sendReply(app._id)} className="p-2 bg-blue-600 text-white rounded">Save Reply</button>
            </div>
            {app.reply && <div className="mt-2 p-2 bg-gray-50">Current reply: <strong>{app.reply}</strong></div>}
          </div>
        </div>
      ))}
    </div>
  );
}