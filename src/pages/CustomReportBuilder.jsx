import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FilePlus2, ListChecks, FileText } from 'lucide-react';
import ReportBuilder from './custom-report-builder/ReportBuilder';
import ReportPreview from './custom-report-builder/ReportPreview';

const CustomReportBuilder = () => {
    const location = useLocation();
    const isExactPath = location.pathname === '/custom-report-builder' || location.pathname === '/custom-report-builder/';

    const savedReports = [
        { name: 'Monthly Attendance Summary', date: '2025-07-10' },
        { name: 'Q2 Performance Ratings', date: '2025-07-01' },
        { name: 'New Joiners - IT Department', date: '2025-06-25' },
    ];

    if (!isExactPath) {
        return (
            <Routes>
                <Route path="/create" element={<ReportBuilder />} />
                <Route path="/preview" element={<ReportPreview />} />
            </Routes>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FilePlus2 size={24} className="text-primary" />
                    <h1 className="text-2xl font-bold">Custom Report Builder</h1>
                </div>
                <Link to="/custom-report-builder/create" className="btn btn-primary">
                    <FilePlus2 size={20} />
                    Create New Report
                </Link>
            </div>
            <p className="text-base-content/70">Build, save, and manage your own custom reports.</p>

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

export default CustomReportBuilder;
