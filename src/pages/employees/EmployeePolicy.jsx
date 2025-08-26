import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Edit, X } from 'lucide-react';

const indianNames = ['Aarav Sharma', 'Vivaan Singh', 'Aditya Kumar', 'Vihaan Patel', 'Arjun Reddy', 'Sai Gupta', 'Reyansh Mishra', 'Krishna Verma', 'Ishaan Yadav', 'Rohan Mehra', 'Priya Patel', 'Saanvi Sharma', 'Ananya Singh', 'Aadhya Gupta', 'Diya Kumar', 'Kaif Shekh'];
const punchTypes = ['No punch', 'Single punch', 'Odd punch', 'Even punch', 'First in and last out'];
const yesNoOptions = ['Yes', 'No'];
const overtimeOptions = ['Yes', 'No', 'On Approval'];

const generatePolicyData = (count) => Array.from({ length: count }, (_, i) => ({
    id: `PR${101 + i}`,
    name: faker.helpers.arrayElement(indianNames),
    avatar: `https://i.pravatar.cc/150?u=PR${101 + i}`,
    punchType: faker.helpers.arrayElement(punchTypes),
    overtime: faker.helpers.arrayElement(overtimeOptions),
    late: faker.helpers.arrayElement(yesNoOptions),
    workSpan: '09:00 - 18:00',
    autoShift: faker.helpers.arrayElement(yesNoOptions),
}));

const EmployeePolicy = () => {
    const [policies, setPolicies] = useState(generatePolicyData(15));
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleEditClick = (employee) => {
        setSelectedEmployee({ ...employee });
        setShowEditModal(true);
    };

    const handleSave = () => {
        setPolicies(prevPolicies => 
            prevPolicies.map(p => p.id === selectedEmployee.id ? selectedEmployee : p)
        );
        setShowEditModal(false);
        setSelectedEmployee(null);
    };

    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setSelectedEmployee(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Employee Policy</h1>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Policy Settings per Employee</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Punch Type</th>
                                    <th>Overtime Applicable</th>
                                    <th>Late</th>
                                    <th>Work Span</th>
                                    <th>Auto Shift</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {policies.map(policy => (
                                    <tr key={policy.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-10 h-10">
                                                        <img src={policy.avatar} alt={policy.name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{policy.name}</div>
                                                    <div className="text-sm opacity-50">{policy.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="badge badge-ghost badge-sm">{policy.punchType}</span></td>
                                        <td><span className={`badge badge-sm ${policy.overtime === 'Yes' ? 'badge-success' : policy.overtime === 'No' ? 'badge-error' : 'badge-warning'}`}>{policy.overtime}</span></td>
                                        <td><span className={`badge badge-sm ${policy.late === 'Yes' ? 'badge-success' : 'badge-error'}`}>{policy.late}</span></td>
                                        <td>{policy.workSpan}</td>
                                        <td><span className={`badge badge-sm ${policy.autoShift === 'Yes' ? 'badge-success' : 'badge-error'}`}>{policy.autoShift}</span></td>
                                        <td>
                                            <button onClick={() => handleEditClick(policy)} className="btn btn-ghost btn-sm">
                                                <Edit size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showEditModal && selectedEmployee && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <button onClick={() => setShowEditModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><X /></button>
                        <h3 className="font-bold text-lg">Edit Policy for {selectedEmployee.name}</h3>
                        <div className="py-4 space-y-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Punch Type</span></label>
                                <select name="punchType" value={selectedEmployee.punchType} onChange={handleModalChange} className="select select-bordered">
                                    {punchTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Overtime Applicable</span></label>
                                <select name="overtime" value={selectedEmployee.overtime} onChange={handleModalChange} className="select select-bordered">
                                    {overtimeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Late</span></label>
                                <select name="late" value={selectedEmployee.late} onChange={handleModalChange} className="select select-bordered">
                                    {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Work Span</span></label>
                                <input type="text" name="workSpan" value={selectedEmployee.workSpan} onChange={handleModalChange} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Auto Shift</span></label>
                                <select name="autoShift" value={selectedEmployee.autoShift} onChange={handleModalChange} className="select select-bordered">
                                    {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button onClick={() => setShowEditModal(false)} className="btn btn-ghost">Cancel</button>
                            <button onClick={handleSave} className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeePolicy;
