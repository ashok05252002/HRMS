import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FilePlus2, Edit, Trash2, Eye } from 'lucide-react';

const ReportBuilder = () => {
    const [savedReports, setSavedReports] = useState([
        { id: 1, name: 'Active Employee Contact List', fields: 5, filters: 2, lastRun: '2025-07-30' },
        { id: 2, name: 'Engineering Department Payroll Q2', fields: 8, filters: 3, lastRun: '2025-07-28' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Custom Report Builder</h1>
                <Link to="/reports-analytics/builder/create" className="btn btn-primary">
                    <FilePlus2 size={20} />
                    Create New Report
                </Link>
            </div>
            
            <p className="text-base-content/70">Build, save, and run custom reports based on your specific needs.</p>

            <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                    <h2 className="card-title">Saved Reports</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Report Name</th>
                                    <th>Fields</th>
                                    <th>Filters</th>
                                    <th>Last Run</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savedReports.map(report => (
                                    <tr key={report.id}>
                                        <td className="font-semibold">{report.name}</td>
                                        <td>{report.fields}</td>
                                        <td>{report.filters}</td>
                                        <td>{report.lastRun}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link to="/reports-analytics/builder/preview" className="btn btn-sm btn-outline btn-primary"><Eye size={16} /> Run</Link>
                                                <button className="btn btn-sm btn-ghost"><Edit size={16} /></button>
                                                <button className="btn btn-sm btn-ghost text-error"><Trash2 size={16} /></button>
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

export default ReportBuilder;
