import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AccessControl = () => {
    const [showModal, setShowModal] = useState(false);
    const roles = [
        { id: 1, name: 'Admin', users: 2, modules: ['All'] },
        { id: 2, name: 'HR Manager', users: 3, modules: ['Employees', 'Appraisal', 'Training', 'Reports'] },
        { id: 3, name: 'Manager', users: 15, modules: ['Appraisal (Team)', 'Training (Team)'] },
        { id: 4, name: 'Employee', users: 150, modules: ['Self-Service'] },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Access Control (RBAC)</h1>
                <button onClick={() => setShowModal(true)} className="btn btn-primary">
                    <Plus size={20} /> Add Role
                </button>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">User Roles</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Role Name</th>
                                    <th>Users Assigned</th>
                                    <th>Accessible Modules</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role) => (
                                    <tr key={role.id}>
                                        <td className="font-semibold">{role.name}</td>
                                        <td>{role.users}</td>
                                        <td>
                                            <div className="flex flex-wrap gap-1">
                                                {role.modules.map(m => <div key={m} className="badge badge-outline">{m}</div>)}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button className="btn btn-sm btn-ghost"><Edit size={16} /> Permissions</button>
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
                        <h3 className="font-bold text-lg">Add New Role</h3>
                        <form className="space-y-4 mt-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Role Name</span></label>
                                <input type="text" placeholder="e.g., Finance Manager" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Accessible Modules</span></label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 border p-4 rounded-lg">
                                    <label className="label cursor-pointer"><input type="checkbox" className="checkbox mr-2" /> Employees</label>
                                    <label className="label cursor-pointer"><input type="checkbox" className="checkbox mr-2" /> Appraisal</label>
                                    <label className="label cursor-pointer"><input type="checkbox" className="checkbox mr-2" /> Training</label>
                                    <label className="label cursor-pointer"><input type="checkbox" className="checkbox mr-2" /> Reports</label>
                                    <label className="label cursor-pointer"><input type="checkbox" className="checkbox mr-2" /> Settings</label>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Assign Users</span></label>
                                <select className="select select-bordered" multiple>
                                    <option>User One</option>
                                    <option>User Two</option>
                                </select>
                            </div>
                        </form>
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary">Save Role</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccessControl;
