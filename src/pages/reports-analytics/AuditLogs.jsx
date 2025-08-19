import React from 'react';
import { Search, Filter as FilterIcon } from 'lucide-react';

const logs = [
    { id: 1, role: 'System', employeeCode: 'N/A', user: 'N/A', logType: 'Security', details: "Failed login attempt with wrong credentials for user 'Rohan Mehra'. IP: 49.36.87.121", timestamp: 'August 01, 2025, 02:10 PM' },
    { id: 2, role: 'HR Admin', employeeCode: 'EMP001', user: 'Akash', logType: 'Manual Attendance', details: "Checkout time added for employee 'Vikram Menon (EMP007)' for Aug 01, 2025.", timestamp: 'August 01, 2025, 01:15 PM' },
    { id: 3, role: 'System', employeeCode: 'EMP003', user: 'Lokesh', logType: 'Attendance', details: "Employee checked out.", timestamp: 'August 01, 2025, 11:30 AM' },
    { id: 4, role: 'HR Admin', employeeCode: 'EMP001', user: 'Akash', logType: 'Settings', details: "New shift 'Night Shift (10 PM - 6 AM)' was added.", timestamp: 'August 01, 2025, 09:05 AM' },
    { id: 5, role: 'Manager', employeeCode: 'EMP002', user: 'Ram', logType: 'Leave', details: "Approved sick leave request for 'Sai Gupta (EMP006)'.", timestamp: 'August 01, 2025, 08:45 AM' },
    { id: 6, role: 'Employee', employeeCode: 'EMP003', user: 'Lokesh', logType: 'Logout', details: 'User logged out successfully.', timestamp: 'August 01, 2025, 08:30 AM' },
    { id: 7, role: 'System', employeeCode: 'EMP005', user: 'Ananya Nair', logType: 'Attendance', details: "Employee checked out.", timestamp: 'August 01, 2025, 08:25 AM' },
    { id: 8, role: 'Employee', employeeCode: 'EMP004', user: 'Arjun Reddy', logType: 'User Management', details: 'User changed their password.', timestamp: 'August 01, 2025, 08:00 AM' },
    { id: 9, role: 'HR Admin', employeeCode: 'EMP001', user: 'Akash', logType: 'User Management', details: "Added new employee: 'Diya Kumar (EMP009)'.", timestamp: 'August 01, 2025, 07:20 AM' },
    { id: 10, role: 'Employee', employeeCode: 'EMP003', user: 'Lokesh', logType: 'Login', details: 'Successful login.', timestamp: 'August 01, 2025, 07:01 AM' },
];

const logTypesForFilter = ['Login', 'Logout', 'Leave', 'Settings', 'User Management', 'Security', 'Attendance', 'Manual Attendance'];

const getBadgeClass = (logType) => {
    switch (logType) {
        case 'Leave': return 'bg-purple-500 text-purple-900';
        case 'Settings': return 'bg-yellow-400 text-yellow-900';
        case 'Login': return 'bg-green-500 text-green-900';
        case 'Logout': return 'bg-gray-500 text-gray-900';
        case 'User Management': return 'bg-pink-500 text-pink-900';
        case 'Security': return 'bg-red-500 text-red-900';
        case 'Manual Attendance': return 'bg-teal-500 text-teal-900';
        case 'Attendance': return 'bg-blue-500 text-blue-900';
        default: return 'bg-base-300 text-base-content';
    }
};

const AuditLogs = () => {
  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Change History</h1>
        <div className="flex items-center gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search..." className="input input-bordered input-sm w-40" />
          </div>
          <div className="form-control">
            <select className="select select-bordered select-sm">
              <option>All Log Types</option>
              {logTypesForFilter.map(type => <option key={type}>{type}</option>)}
            </select>
          </div>
          <div className="form-control">
            <input type="date" placeholder="dd-mm-yyyy" className="input input-bordered input-sm w-40" />
          </div>
          <button className="btn btn-sm btn-ghost">
            <FilterIcon size={16} className="mr-1" />
            Filter
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-[15%]">Role</th>
              <th className="w-[15%]">Employee Code</th>
              <th className="w-[15%]">User</th>
              <th className="w-[15%]">Log Type</th>
              <th className="w-[25%]">Action/Details</th>
              <th className="w-[15%]">Timestamp (GMT+5:30)</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.role}</td>
                <td className="font-mono text-xs">{log.employeeCode}</td>
                <td>{log.user}</td>
                <td>
                  <span className={`badge badge-lg border-0 ${getBadgeClass(log.logType)}`}>
                    {log.logType}
                  </span>
                </td>
                <td className="text-sm text-base-content/80">{log.details}</td>
                <td className="text-sm text-base-content/80">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
