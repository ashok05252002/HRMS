import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FilePlus2, ListChecks, Edit, Trash2, Eye } from 'lucide-react';

const ReportBuilder = () => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reportToDelete, setReportToDelete] = useState(null);
    const [savedReports, setSavedReports] = useState([
        { id: 1, name: 'Monthly Attendance Summary', date: '2025-07-10', fields: ['Employee ID', 'Full Name', 'Check-in Time', 'Check-out Time', 'Total Hours Worked'], filters: [{ field: 'Department', value: ['IT'] }] },
        { id: 2, name: 'Active Employee Contacts', date: '2025-07-01', fields: ['Full Name', 'Email', 'Contact Number', 'Department'], filters: [{ field: 'Employment Status', value: ['Active'] }] },
    ]);

    const handleView = (report) => {
        navigate('/reports-analytics/builder/preview', { state: { reportName: report.name, selectedFields: report.fields, filters: report.filters } });
    };

    const handleEdit = (report) => {
        navigate('/reports-analytics/builder/create', { state: { isEditing: true, ...report } });
    };

    const handleDeleteClick = (report) => {
        setReportToDelete(report);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setSavedReports(prev => prev.filter(r => r.id !== reportToDelete.id));
        setShowDeleteModal(false);
        setReportToDelete(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FilePlus2 size={24} className="text-primary" />
                    <h1 className="text-2xl font-bold">Report Builder</h1>
                </div>
                <Link to="/reports-analytics/builder/create" className="btn btn-primary">
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
                                {savedReports.map((report) => (
                                    <tr key={report.id}>
                                        <td className="font-medium">{report.name}</td>
                                        <td>{report.date}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleView(report)} className="btn btn-sm btn-ghost"><Eye size={16} /></button>
                                                <button onClick={() => handleEdit(report)} className="btn btn-sm btn-ghost"><Edit size={16} /></button>
                                                <button onClick={() => handleDeleteClick(report)} className="btn btn-sm btn-ghost text-error"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm Deletion</h3>
                        <p className="py-4">Are you sure you want to delete the report "{reportToDelete?.name}"? This action cannot be undone.</p>
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="btn btn-error" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportBuilder;
