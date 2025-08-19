import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Check, X, Filter, Search } from 'lucide-react';

const indianNames = ['Aarav Sharma', 'Vivaan Singh', 'Aditya Kumar', 'Vihaan Patel', 'Arjun Reddy', 'Sai Gupta', 'Reyansh Mishra', 'Krishna Verma', 'Ishaan Yadav', 'Rohan Mehra', 'Priya Patel', 'Saanvi Sharma', 'Ananya Singh', 'Aadhya Gupta', 'Diya Kumar'];

const generatePunchRequest = () => ({
  id: faker.string.uuid(),
  employee: faker.helpers.arrayElement(indianNames),
  date: faker.date.recent({ days: 7 }).toLocaleDateString('en-CA'),
  inTime: '09:05 AM',
  outTime: '06:00 PM',
  reason: faker.helpers.arrayElement(['Forgot to punch in', 'Client meeting outside', 'System error']),
  status: faker.helpers.arrayElement(['Pending', 'Approved', 'Rejected']),
});

const PunchRequests = () => {
  const [requests, setRequests] = useState(Array.from({ length: 8 }, generatePunchRequest));

  const handleAction = (id, newStatus) => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manual Attendance (Punch Requests)</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <h2 className="card-title">Pending Requests</h2>
            <div className="flex flex-wrap gap-2">
              <div className="form-control">
                <input type="text" placeholder="Search Employee..." className="input input-bordered input-sm" />
              </div>
              <div className="form-control">
                <select className="select select-bordered select-sm">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
              <button className="btn btn-sm btn-ghost"><Filter size={16} /> Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>In-Time</th>
                  <th>Out-Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.employee}</td>
                    <td>{req.date}</td>
                    <td>{req.inTime}</td>
                    <td>{req.outTime}</td>
                    <td className="text-xs max-w-xs">{req.reason}</td>
                    <td>
                      <div className={`badge ${
                        req.status === 'Approved' ? 'badge-success' :
                        req.status === 'Rejected' ? 'badge-error' : 'badge-warning'
                      }`}>{req.status}</div>
                    </td>
                    <td>
                      {req.status === 'Pending' ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleAction(req.id, 'Approved')} className="btn btn-xs btn-success btn-outline">
                            <Check size={14} /> Approve
                          </button>
                          <button onClick={() => handleAction(req.id, 'Rejected')} className="btn btn-xs btn-error btn-outline">
                            <X size={14} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-base-content/60">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PunchRequests;
