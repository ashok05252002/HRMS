import React, { useState, useMemo } from 'react';
import { faker } from '@faker-js/faker';
import { Edit, X, Users, Filter, Search } from 'lucide-react';

const indianNames = ['Aarav Sharma', 'Vivaan Singh', 'Aditya Kumar', 'Vihaan Patel', 'Arjun Reddy', 'Sai Gupta', 'Reyansh Mishra', 'Krishna Verma', 'Ishaan Yadav', 'Rohan Mehra', 'Priya Patel', 'Saanvi Sharma', 'Ananya Singh', 'Aadhya Gupta', 'Diya Kumar', 'Kaif Shekh'];
const punchTypes = ['No punch', 'Single punch', 'Odd punch', 'Even punch', 'First in and last out'];
const yesNoOptions = ['Yes', 'No'];
const overtimeOptions = ['Yes', 'No', 'On Approval'];
const departments = ['Engineering', 'Design', 'Product', 'Sales', 'Marketing', 'Production'];

const generatePolicyData = (count) => Array.from({ length: count }, (_, i) => ({
    id: `PR${101 + i}`,
    name: faker.helpers.arrayElement(indianNames),
    avatar: `https://i.pravatar.cc/150?u=PR${101 + i}`,
    department: faker.helpers.arrayElement(departments),
    punchType: faker.helpers.arrayElement(punchTypes),
    overtime: faker.helpers.arrayElement(overtimeOptions),
    late: faker.helpers.arrayElement(yesNoOptions),
    workSpan: faker.helpers.arrayElement([8, 9, 10]),
    autoShift: faker.helpers.arrayElement(yesNoOptions),
}));

const EmployeePolicy = () => {
    const [policies, setPolicies] = useState(generatePolicyData(15));
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // State for Group Edit Modal
    const [showGroupEditModal, setShowGroupEditModal] = useState(false);
    const [groupFilters, setGroupFilters] = useState({ department: 'All' });
    const [groupSearchTerm, setGroupSearchTerm] = useState('');
    const [groupSelectedEmployees, setGroupSelectedEmployees] = useState(new Set());
    const [groupPolicyConfig, setGroupPolicyConfig] = useState({
        punchType: '', overtime: '', late: '', workSpan: '', autoShift: ''
    });

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

    // --- Group Edit Logic ---
    const filteredEmployeesForGroupEdit = useMemo(() => {
        return policies.filter(emp => {
            const matchesDept = groupFilters.department === 'All' || emp.department === groupFilters.department;
            const matchesSearch = emp.name.toLowerCase().includes(groupSearchTerm.toLowerCase());
            return matchesDept && matchesSearch;
        });
    }, [policies, groupFilters, groupSearchTerm]);

    const handleGroupEmployeeSelect = (id) => {
        setGroupSelectedEmployees(prev => {
            const newSet = new Set(prev);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            return newSet;
        });
    };
    
    const handleGroupSelectAll = (e) => {
        if (e.target.checked) {
            setGroupSelectedEmployees(new Set(filteredEmployeesForGroupEdit.map(emp => emp.id)));
        } else {
            setGroupSelectedEmployees(new Set());
        }
    };

    const handleGroupPolicyChange = (e) => {
        const { name, value } = e.target;
        setGroupPolicyConfig(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyGroupChanges = () => {
        if (groupSelectedEmployees.size === 0) {
            alert('Please select at least one employee.');
            return;
        }

        setPolicies(prevPolicies => 
            prevPolicies.map(p => {
                if (groupSelectedEmployees.has(p.id)) {
                    let updatedPolicy = { ...p };
                    for (const key in groupPolicyConfig) {
                        if (groupPolicyConfig[key] !== '') {
                            updatedPolicy[key] = groupPolicyConfig[key];
                        }
                    }
                    return updatedPolicy;
                }
                return p;
            })
        );
        setShowGroupEditModal(false);
    };
    // --- End Group Edit Logic ---

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Employee Policy</h1>
                <button onClick={() => setShowGroupEditModal(true)} className="btn btn-secondary">
                    <Users size={16} className="mr-2"/> Group Edit
                </button>
            </div>
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
                                        <td>{policy.workSpan} hours</td>
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
                                <label className="label"><span className="label-text">Work Span (hours)</span></label>
                                <input type="number" name="workSpan" value={selectedEmployee.workSpan} onChange={handleModalChange} className="input input-bordered" />
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
            
            {showGroupEditModal && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-6xl">
                        <button onClick={() => setShowGroupEditModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><X /></button>
                        <h3 className="font-bold text-lg">Group Edit Employee Policies</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            {/* Left: Employee Selection */}
                            <div className="p-4 border rounded-lg bg-base-200 space-y-4">
                                <h4 className="font-semibold">1. Select Employees ({groupSelectedEmployees.size} selected)</h4>
                                <div className="flex gap-2">
                                    <select className="select select-bordered select-sm flex-1" value={groupFilters.department} onChange={e => setGroupFilters({...groupFilters, department: e.target.value})}>
                                        <option value="All">All Departments</option>
                                        {departments.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                    <input type="text" placeholder="Search by name..." className="input input-bordered input-sm flex-1" value={groupSearchTerm} onChange={e => setGroupSearchTerm(e.target.value)} />
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer"><span className="label-text">Select All ({filteredEmployeesForGroupEdit.length})</span><input type="checkbox" className="checkbox" onChange={handleGroupSelectAll} /></label>
                                </div>
                                <div className="h-96 overflow-y-auto space-y-2 pr-2">
                                    {filteredEmployeesForGroupEdit.map(emp => (
                                        <div key={emp.id} className="p-2 border rounded-lg bg-base-100 flex items-center gap-3">
                                            <input type="checkbox" className="checkbox" checked={groupSelectedEmployees.has(emp.id)} onChange={() => handleGroupEmployeeSelect(emp.id)} />
                                            <div className="font-medium">{emp.name}</div>
                                            <div className="text-sm opacity-50">{emp.department}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Right: Policy Configuration */}
                            <div className="p-4 border rounded-lg bg-base-200 space-y-4">
                                <h4 className="font-semibold">2. Apply Policies</h4>
                                <p className="text-xs text-base-content/70">Only filled fields will be applied to the selected employees.</p>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Punch Type</span></label>
                                    <select name="punchType" value={groupPolicyConfig.punchType} onChange={handleGroupPolicyChange} className="select select-bordered"><option value="">Don't Change</option>{punchTypes.map(type => <option key={type} value={type}>{type}</option>)}</select>
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Overtime Applicable</span></label>
                                    <select name="overtime" value={groupPolicyConfig.overtime} onChange={handleGroupPolicyChange} className="select select-bordered"><option value="">Don't Change</option>{overtimeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Late</span></label>
                                    <select name="late" value={groupPolicyConfig.late} onChange={handleGroupPolicyChange} className="select select-bordered"><option value="">Don't Change</option>{yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Work Span (hours)</span></label>
                                    <input type="number" name="workSpan" placeholder="Leave blank to not change" value={groupPolicyConfig.workSpan} onChange={handleGroupPolicyChange} className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Auto Shift</span></label>
                                    <select name="autoShift" value={groupPolicyConfig.autoShift} onChange={handleGroupPolicyChange} className="select select-bordered"><option value="">Don't Change</option>{yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button onClick={() => setShowGroupEditModal(false)} className="btn btn-ghost">Cancel</button>
                            <button onClick={handleApplyGroupChanges} className="btn btn-primary">Apply to {groupSelectedEmployees.size} Employees</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeePolicy;
