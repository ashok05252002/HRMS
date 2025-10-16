import React from 'react';
import { Filter } from 'lucide-react';

const AppraisalTracker = () => {
    const trackerData = [
        { id: 'EMP001', name: 'John Doe', department: 'Engineering', role: 'Sr. Software Engineer', cycle: 'Annual 2024', selfReview: 'Completed', managerReview: 'Completed', hrFinalization: 'Pending', overall: 'In Progress', lastAction: '2025-01-15' },
        { id: 'EMP002', name: 'Jane Smith', department: 'Design', role: 'UI/UX Designer', cycle: 'Annual 2024', selfReview: 'Completed', managerReview: 'Pending', hrFinalization: 'Pending', overall: 'In Progress', lastAction: '2025-01-10' },
        { id: 'EMP003', name: 'Mike Johnson', department: 'Marketing', role: 'Marketing Lead', cycle: 'Annual 2024', selfReview: 'Completed', managerReview: 'Completed', hrFinalization: 'Completed', overall: 'Completed', lastAction: '2025-01-18' },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return 'badge-success';
            case 'Pending': return 'badge-warning';
            case 'In Progress': return 'badge-info';
            default: return 'badge-ghost';
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Appraisal Completion Tracker</h1>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                        <h2 className="card-title">Tracker Data</h2>
                        <div className="flex flex-wrap gap-2">
                            <select className="select select-bordered select-sm"><option>All Cycles</option></select>
                            <select className="select select-bordered select-sm"><option>All Departments</option></select>
                            <button className="btn btn-sm btn-ghost"><Filter size={16} /> Filter</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Department</th>
                                    <th>Role</th>
                                    <th>Self Review</th>
                                    <th>Manager Review</th>
                                    <th>HR Finalization</th>
                                    <th>Overall Status</th>
                                    <th>Last Action Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trackerData.map((data) => (
                                    <tr key={data.id}>
                                        <td><div>{data.name}</div><div className="text-xs opacity-50">{data.id}</div></td>
                                        <td>{data.department}</td>
                                        <td>{data.role}</td>
                                        <td><div className={`badge ${getStatusBadge(data.selfReview)}`}>{data.selfReview}</div></td>
                                        <td><div className={`badge ${getStatusBadge(data.managerReview)}`}>{data.managerReview}</div></td>
                                        <td><div className={`badge ${getStatusBadge(data.hrFinalization)}`}>{data.hrFinalization}</div></td>
                                        <td><div className={`badge ${getStatusBadge(data.overall)}`}>{data.overall}</div></td>
                                        <td>{data.lastAction}</td>
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
