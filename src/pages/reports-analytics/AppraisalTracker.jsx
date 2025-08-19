import React from 'react';
import { Filter } from 'lucide-react';

const AppraisalTracker = () => {
  const data = [
    { empName: 'John Doe', empId: 'EMP001', dept: 'IT', role: 'Sr. Dev', cycle: 'Annual 2024', self: 'Completed', manager: 'Completed', hr: 'Pending', overall: 'In Progress', lastAction: '2025-01-15' },
    { empName: 'Jane Smith', empId: 'EMP002', dept: 'IT', role: 'Dev', cycle: 'Annual 2024', self: 'Completed', manager: 'Pending', hr: 'Pending', overall: 'In Progress', lastAction: '2025-01-12' },
    { empName: 'Emily White', empId: 'EMP003', dept: 'Sales', role: 'Manager', cycle: 'Annual 2024', self: 'Completed', manager: 'Completed', hr: 'Completed', overall: 'Completed', lastAction: '2025-01-20' },
    { empName: 'Mike Johnson', empId: 'EMP004', dept: 'Design', role: 'UI/UX Designer', cycle: 'Annual 2024', self: 'Pending', manager: 'Pending', hr: 'Pending', overall: 'Not Started', lastAction: '2025-01-10' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Appraisal Completion Tracker</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <h2 className="card-title">Tracker</h2>
            <div className="flex flex-wrap gap-2">
              <select className="select select-bordered select-sm" defaultValue="Annual 2024">
                <option>Annual 2024</option>
                <option>Mid-Year 2023</option>
              </select>
              <select className="select select-bordered select-sm"><option>All Departments</option></select>
              <button className="btn btn-sm btn-ghost"><Filter size={16} /> Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Appraisal Cycle</th>
                  <th>Self Review</th>
                  <th>Manager Review</th>
                  <th>HR Finalization</th>
                  <th>Overall Status</th>
                  <th>Last Action Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.empId}>
                    <td>{row.empName}</td>
                    <td>{row.empId}</td>
                    <td>{row.dept}</td>
                    <td>{row.role}</td>
                    <td>{row.cycle}</td>
                    <td><div className={`badge ${row.self === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{row.self}</div></td>
                    <td><div className={`badge ${row.manager === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{row.manager}</div></td>
                    <td><div className={`badge ${row.hr === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{row.hr}</div></td>
                    <td><div className={`badge ${row.overall === 'Completed' ? 'badge-success' : row.overall === 'In Progress' ? 'badge-info' : 'badge-ghost'}`}>{row.overall}</div></td>
                    <td>{row.lastAction}</td>
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

export default AppraisalTracker;
