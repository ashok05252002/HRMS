import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AppraisalPeriodSetup = () => {
    const [showModal, setShowModal] = useState(false);
    const [periods, setPeriods] = useState([
        { id: 1, name: 'FY24 Annual', start: '2024-01-01', end: '2024-12-31', selfDeadline: '2024-11-30', managerDeadline: '2024-12-15', hrDeadline: '2024-12-31', status: 'Active' },
        { id: 2, name: 'FY23 Mid-Year', start: '2023-06-01', end: '2023-08-31', selfDeadline: '2023-07-31', managerDeadline: '2023-08-15', hrDeadline: '2023-08-31', status: 'Inactive' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Appraisal Period Setup</h1>
                <button onClick={() => setShowModal(true)} className="btn btn-primary">
                    <Plus size={20} /> New Period
                </button>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Managed Appraisal Cycles</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Cycle Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Self Review Deadline</th>
                                    <th>Manager Review Deadline</th>
                                    <th>HR Deadline</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {periods.map((p) => (
                                    <tr key={p.id}>
                                        <td className="font-semibold">{p.name}</td>
                                        <td>{p.start}</td>
                                        <td>{p.end}</td>
                                        <td>{p.selfDeadline}</td>
                                        <td>{p.managerDeadline}</td>
                                        <td>{p.hrDeadline}</td>
                                        <td><div className={`badge ${p.status === 'Active' ? 'badge-success' : 'badge-ghost'}`}>{p.status}</div></td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button className="btn btn-sm btn-ghost"><Edit size={16} /></button>
                                                <button className="btn btn-sm btn-ghost text-red-500"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-4xl">
                        <h3 className="font-bold text-lg">Create Appraisal Period</h3>
                        <form className="space-y-4 mt-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Appraisal Cycle Name</span></label>
                                <input type="text" placeholder="e.g., FY24 Annual" className="input input-bordered" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Start Date</span></label>
                                    <input type="date" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">End Date</span></label>
                                    <input type="date" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Self Review Deadline</span></label>
                                    <input type="date" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Manager Review Deadline</span></label>
                                    <input type="date" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">HR Finalization Deadline</span></label>
                                    <input type="date" className="input input-bordered" />
                                </div>
                                <div className="form-control justify-center">
                                    <label className="label cursor-pointer"><span className="label-text">Status (Active/Inactive)</span><input type="checkbox" className="toggle toggle-success" /></label>
                                </div>
                            </div>
                        </form>
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary">Save Period</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppraisalPeriodSetup;
