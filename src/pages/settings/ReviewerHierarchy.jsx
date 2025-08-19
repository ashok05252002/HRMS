import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check } from 'lucide-react';

const ReviewerHierarchy = () => {
    const [showModal, setShowModal] = useState(false);
    const [flows, setFlows] = useState([
        { id: 1, name: '2-Level Manager Review', level1: 'Reporting Manager', level2: 'HOD', hr: 'HRBP', parallel: false, skip: false, deadline: '2024-12-15' },
        { id: 2, name: 'Simple Self-Manager', level1: 'Reporting Manager', level2: 'N/A', hr: 'HRBP', parallel: false, skip: true, deadline: 'N/A' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Reviewer Hierarchy Settings</h1>
                <button onClick={() => setShowModal(true)} className="btn btn-primary">
                    <Plus size={20} /> New Flow
                </button>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Defined Review Flows</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Flow Name</th>
                                    <th>Level 1</th>
                                    <th>Level 2</th>
                                    <th>HR Role</th>
                                    <th>Lock Deadline</th>
                                    <th className="text-center">Parallel?</th>
                                    <th className="text-center">Can Skip?</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flows.map((f) => (
                                    <tr key={f.id}>
                                        <td className="font-semibold">{f.name}</td>
                                        <td>{f.level1}</td>
                                        <td>{f.level2}</td>
                                        <td>{f.hr}</td>
                                        <td>{f.deadline}</td>
                                        <td className="text-center">{f.parallel && <Check size={20} className="text-success" />}</td>
                                        <td className="text-center">{f.skip && <Check size={20} className="text-success" />}</td>
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
                    <div className="modal-box w-11/12 max-w-2xl">
                        <h3 className="font-bold text-lg">Create Review Flow</h3>
                        <form className="space-y-4 mt-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Review Flow Name</span></label>
                                <input type="text" placeholder="e.g., 2-Level Manager Review" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Level 1 Reviewer</span></label>
                                <select className="select select-bordered"><option>Reporting Manager</option><option>Peer</option></select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Level 2 Reviewer</span></label>
                                <select className="select select-bordered"><option>HOD or Skip-Level</option><option>N/A</option></select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">HR Finalization Role</span></label>
                                <select className="select select-bordered"><option>HRBP</option><option>HR Head</option></select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Reviewer Lock Deadline (Optional)</span></label>
                                <input type="date" className="input input-bordered" />
                            </div>
                            <div className="flex justify-between">
                                <label className="label cursor-pointer"><span className="label-text">Parallel Reviews?</span><input type="checkbox" className="toggle toggle-primary" /></label>
                                <label className="label cursor-pointer"><span className="label-text">Can Skip Levels?</span><input type="checkbox" className="toggle toggle-primary" /></label>
                            </div>
                        </form>
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary">Save Flow</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewerHierarchy;
