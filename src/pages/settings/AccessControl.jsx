import React, { useState } from 'react';
import { Shield, User, Edit, Plus } from 'lucide-react';

const AccessControl = () => {
    const [selectedRole, setSelectedRole] = useState('Manager');
    const [showModal, setShowModal] = useState(false);
    const [roles, setRoles] = useState(['Admin', 'HR', 'Manager', 'Employee']);
    const modules = ['Appraisal', 'Training', 'Reports', 'Settings'];
    const permissions = ['View', 'Create', 'Edit', 'Approve', 'Delete'];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Access Control (RBAC)</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="card-title">Roles</h2>
                                <button onClick={() => setShowModal(true)} className="btn btn-sm btn-primary btn-circle">
                                    <Plus size={16} />
                                </button>
                            </div>
                            <ul className="menu">
                                {roles.map(role => (
                                    <li key={role} onClick={() => setSelectedRole(role)}>
                                        <a className={selectedRole === role ? 'active' : ''}>{role}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-3">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Permissions for: {selectedRole}</h2>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>Module</th>
                                            {permissions.map(p => <th key={p} className="text-center">{p}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {modules.map(mod => (
                                            <tr key={mod}>
                                                <td>{mod}</td>
                                                {permissions.map(p => (
                                                    <td key={p} className="text-center">
                                                        <input type="checkbox" className="checkbox checkbox-sm" />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl mt-6">
                        <div className="card-body">
                            <h2 className="card-title">User Assignment for: {selectedRole}</h2>
                            <p className="text-sm text-gray-500">Assign users to this role.</p>
                            <select className="select select-bordered" multiple>
                                <option>John Doe</option>
                                <option>Jane Smith</option>
                                <option>Mike Johnson</option>
                            </select>
                            <div className="card-actions justify-end mt-4">
                                <button className="btn btn-primary">Save Assignments</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add New Role</h3>
                        <div className="form-control py-4">
                            <label className="label"><span className="label-text">Role Name</span></label>
                            <input type="text" placeholder="e.g., Finance Lead" className="input input-bordered" />
                        </div>
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary">Create Role</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccessControl;
