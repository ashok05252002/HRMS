import React from 'react';
import { Link } from 'react-router-dom';
import { FilePlus2, ListChecks } from 'lucide-react';

const CustomReport = () => {
    const savedReports = [
        { name: 'Monthly Attendance Summary', date: '2025-07-10' },
        { name: 'Q2 Performance Ratings', date: '2025-07-01' },
        { name: 'New Joiners - IT Department', date: '2025-06-25' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FilePlus2 size={24} className="text-primary" />
                    <h1 className="text-2xl font-bold">Custom Reports</h1>
                </div>
                <Link to="/custom-report-builder/create" className="btn btn-primary">
                    <FilePlus2 size={20} />
                    Create New Report
                </Link>
            </div>
            <p className="text-base-content/70">Build, save, and manage your own custom reports. This section provides access to the report builder.</p>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex items-center gap-3 mb-4">
                        <ListChecks size={20} className="text-secondary" />
                        <h2 className="card-title">My Saved Reports</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Report Name</th>
                                    <th>Date Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savedReports.map((report, index) => (
                                    <tr key={index}>
                                        <td className="font-medium">{report.name}</td>
                                        <td>{report.date}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button className="btn btn-sm btn-ghost">View</button>
                                                <button className="btn btn-sm btn-ghost">Edit</button>
                                                <button className="btn btn-sm btn-ghost text-error">Delete</button>
                                            </div>
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

export default CustomReport;
