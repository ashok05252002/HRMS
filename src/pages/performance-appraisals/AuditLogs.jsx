import React from 'react';
import { Search, Filter } from 'lucide-react';

const AuditLogs = () => {
  const logs = [
    { id: 1, empId: 'EMP001', name: 'John Doe', change: 'CTC: $80,000 -> $92,000', approvedBy: 'HR Admin', timestamp: '2025-01-20 10:30 AM', reason: 'Annual Increment', sourceIp: '192.168.1.101' },
    { id: 2, empId: 'EMP002', name: 'Jane Smith', change: 'Status: Pending -> Approved', approvedBy: 'Finance Lead', timestamp: '2025-01-19 04:15 PM', reason: 'Final Approval', sourceIp: '10.0.0.54' },
    { id: 3, empId: 'EMP003', name: 'Mike Johnson', change: 'Hike %: 15% -> 18%', approvedBy: 'HR Manager', timestamp: '2025-01-18 11:00 AM', reason: 'Score Correction', sourceIp: '172.16.0.12' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Salary Revision Audit Logs</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <h2 className="card-title">Change History</h2>
            <div className="flex flex-wrap gap-2">
              <div className="form-control">
                <input type="text" placeholder="Search Employee ID/Name..." className="input input-bordered input-sm" />
              </div>
              <div className="form-control">
                <input type="date" className="input input-bordered input-sm" />
              </div>
              <button className="btn btn-sm btn-ghost"><Filter size={16} /> Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Change Details</th>
                  <th>Approved By</th>
                  <th>Timestamp</th>
                  <th>Reason</th>
                  <th>Source IP</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <div>{log.name}</div>
                      <div className="text-xs text-gray-500">{log.empId}</div>
                    </td>
                    <td className="font-mono text-sm">{log.change}</td>
                    <td>{log.approvedBy}</td>
                    <td>{log.timestamp}</td>
                    <td>{log.reason}</td>
                    <td>{log.sourceIp}</td>
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

export default AuditLogs;
