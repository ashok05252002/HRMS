import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const AuditLogs = () => {
    const initialLogs = [
        { id: 1, user: 'Akash (Admin)', role: 'Admin', code: '-', action: "User logged in", type: 'Login', timestamp: '2025-08-01 11:45 AM' },
        { id: 2, user: 'Priya Sharma', role: 'Manager', code: 'EMP004', action: "Approved sick leave request for 'Sai Gupta (EMP006)'", type: 'Leave', timestamp: '2025-08-01 11:40 AM' },
        { id: 3, user: 'Lokesh (HR)', role: 'HR', code: '-', action: "Updated company work time policy", type: 'Settings', timestamp: '2025-08-01 10:55 AM' },
        { id: 4, user: 'Ram (Manager)', role: 'Manager', code: 'EMP002', action: "Checkout time added for employee 'Aarav Sharma' for Aug 01, 2025.", type: 'Manual Attendance', timestamp: '2025-08-01 10:30 AM' },
        { id: 5, user: 'System', role: 'System', code: 'EMP003', action: "Employee checked out.", type: 'Attendance', timestamp: '2025-08-01 09:15 AM' },
        { id: 6, user: 'System', role: 'System', code: 'EMP005', action: "Employee checked out.", type: 'Attendance', timestamp: '2025-08-01 09:05 AM' },
        { id: 7, user: 'Akash (Admin)', role: 'Admin', code: '-', action: "User changed their password", type: 'Security', timestamp: '2025-08-01 09:02 AM' },
        { id: 8, user: 'Priya Sharma', role: 'Manager', code: 'EMP004', action: "Added new employee: 'Diya Kumar (EMP007)'", type: 'Employee', timestamp: '2025-08-01 09:00 AM' },
        { id: 9, user: 'Unknown', role: 'N/A', code: '-', action: "Failed login attempt with wrong credentials from IP: 103.48.198.142", type: 'Security', timestamp: '2025-08-01 08:55 AM' },
        { id: 10, user: 'Lokesh (HR)', role: 'HR', code: '-', action: "Shift 'Night Shift' was added.", type: 'Settings', timestamp: '2025-08-01 08:50 AM' },
    ];

    const [logs, setLogs] = useState(initialLogs);
    const [logTypeFilter, setLogTypeFilter] = useState('All');

    const getBadgeClass = (type) => {
        switch (type) {
            case 'Login':
            case 'Leave':
            case 'Employee':
                return 'badge-success';
            case 'Settings':
                return 'badge-info';
            case 'Security':
                return 'badge-error';
            case 'Manual Attendance':
                return 'badge-warning';
            case 'Attendance':
                return 'badge-primary';
            default:
                return 'badge-ghost';
        }
    };

    const filteredLogs = logs.filter(log => logTypeFilter === 'All' || log.type === logTypeFilter);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Change History</h1>
                <div className="flex items-center gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search..." className="input input-bordered input-sm w-48" />
                    </div>
                    <div className="form-control">
                        <select 
                            className="select select-bordered select-sm"
                            value={logTypeFilter}
                            onChange={(e) => setLogTypeFilter(e.target.value)}
                        >
                            <option>All</option>
                            <option>Login</option>
                            <option>Leave</option>
                            <option>Settings</option>
                            <option>Security</option>
                            <option>Manual Attendance</option>
                            <option>Attendance</option>
                            <option>Employee</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <input type="date" className="input input-bordered input-sm" />
                    </div>
                    <button className="btn btn-sm btn-outline btn-primary"><Filter size={16} /> Filter</button>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Log Type</th>
                                    <th>Employee Code</th>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Action/Details</th>
                                    <th>Timestamp (GMT+5:30)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map((log) => (
                                    <tr key={log.id} className="hover">
                                        <td><span className={`badge ${getBadgeClass(log.type)}`}>{log.type}</span></td>
                                        <td>{log.code}</td>
                                        <td>{log.user}</td>
                                        <td>{log.role}</td>
                                        <td>{log.action}</td>
                                        <td>{log.timestamp}</td>
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
