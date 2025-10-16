import React, { useState, useMemo } from 'react';
import { Edit, Save, Plus, Filter, Search } from 'lucide-react';
import { faker } from '@faker-js/faker';

const generatePolicyData = (count) => {
    const data = [];
    const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR'];
    const designations = ['Software Engineer', 'Sr. Designer', 'Marketing Lead', 'Sales Executive', 'HR Manager'];
    const locations = ['Mumbai', 'Bangalore', 'Chennai', 'Delhi', 'Pune'];
    const categories = ['Full-Time', 'Part-Time', 'Intern'];

    for (let i = 0; i < count; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        data.push({
            id: `PR${101 + i}`,
            name: `${firstName} ${lastName}`,
            department: faker.helpers.arrayElement(departments),
            designation: faker.helpers.arrayElement(designations),
            location: faker.helpers.arrayElement(locations),
            category: faker.helpers.arrayElement(categories),
            punchType: faker.helpers.arrayElement(['No Punch', 'Single Punch', 'Odd Punch', 'Even Punch', 'First In Last Out']),
            overtime: faker.helpers.arrayElement(['Yes', 'No', 'On Approval']),
            late: faker.helpers.arrayElement(['Yes', 'No']),
            workSpan: faker.number.int({ min: 6, max: 10 }),
            autoShift: faker.helpers.arrayElement(['Yes', 'No']),
        });
    }
    return data;
};

const EmployeePolicy = () => {
    const [policies, setPolicies] = useState(() => generatePolicyData(20));
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [showGroupEdit, setShowGroupEdit] = useState(false);
    
    // State for Group Edit Modal
    const [groupFilters, setGroupFilters] = useState({
        department: '',
        designation: '',
        location: '',
        category: '',
    });
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [groupPolicy, setGroupPolicy] = useState({
        punchType: 'No Punch',
        overtime: 'No',
        late: 'No',
        workSpan: 8,
        autoShift: 'No',
    });

    const handleEdit = (policy) => {
        setEditingId(policy.id);
        setEditData(policy);
    };

    const handleSave = (id) => {
        setPolicies(policies.map(p => p.id === id ? editData : p));
        setEditingId(null);
    };

    const handleGroupEditSave = () => {
        setPolicies(policies.map(p => {
            if (selectedEmployees.includes(p.id)) {
                return { ...p, ...groupPolicy };
            }
            return p;
        }));
        setShowGroupEdit(false);
        setSelectedEmployees([]);
    };

    const filteredEmployeesForGroupEdit = useMemo(() => {
        return policies.filter(p => 
            (!groupFilters.department || p.department === groupFilters.department) &&
            (!groupFilters.designation || p.designation === groupFilters.designation) &&
            (!groupFilters.location || p.location === groupFilters.location) &&
            (!groupFilters.category || p.category === groupFilters.category)
        );
    }, [policies, groupFilters]);

    const handleEmployeeSelection = (id) => {
        setSelectedEmployees(prev => 
            prev.includes(id) ? prev.filter(empId => empId !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Employee Policy</h1>
                <button onClick={() => setShowGroupEdit(true)} className="btn btn-secondary">
                    <Filter size={16} />
                    Group Edit
                </button>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Punch Type</th>
                                    <th>Overtime</th>
                                    <th>Late</th>
                                    <th>Work Span (hrs)</th>
                                    <th>Auto Shift</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {policies.map(policy => (
                                    <tr key={policy.id}>
                                        <td>{policy.name}</td>
                                        <td>{editingId === policy.id ? (
                                            <select className="select select-bordered select-sm" value={editData.punchType} onChange={e => setEditData({...editData, punchType: e.target.value})}>
                                                <option>No Punch</option>
                                                <option>Single Punch</option>
                                                <option>Odd Punch</option>
                                                <option>Even Punch</option>
                                                <option>First In Last Out</option>
                                            </select>
                                        ) : policy.punchType}</td>
                                        <td>{editingId === policy.id ? (
                                            <select className="select select-bordered select-sm" value={editData.overtime} onChange={e => setEditData({...editData, overtime: e.target.value})}>
                                                <option>Yes</option>
                                                <option>No</option>
                                                <option>On Approval</option>
                                            </select>
                                        ) : policy.overtime}</td>
                                        <td>{editingId === policy.id ? (
                                            <select className="select select-bordered select-sm" value={editData.late} onChange={e => setEditData({...editData, late: e.target.value})}>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        ) : policy.late}</td>
                                        <td>{editingId === policy.id ? (
                                            <input type="number" className="input input-bordered input-sm w-20" value={editData.workSpan} onChange={e => setEditData({...editData, workSpan: e.target.value})} />
                                        ) : policy.workSpan}</td>
                                        <td>{editingId === policy.id ? (
                                            <select className="select select-bordered select-sm" value={editData.autoShift} onChange={e => setEditData({...editData, autoShift: e.target.value})}>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        ) : policy.autoShift}</td>
                                        <td>
                                            {editingId === policy.id ? (
                                                <button onClick={() => handleSave(policy.id)} className="btn btn-sm btn-success"><Save size={16} /></button>
                                            ) : (
                                                <button onClick={() => handleEdit(policy)} className="btn btn-sm btn-ghost"><Edit size={16} /></button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Group Edit Modal */}
            {showGroupEdit && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">Group Policy Edit</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            {/* Left Panel: Filters & Employee List */}
                            <div className="space-y-4">
                                <h4 className="font-semibold">1. Select Employees</h4>
                                <div className="p-4 border rounded-lg bg-base-200 space-y-4">
                                    <p className="text-sm font-medium">Filter by:</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <select className="select select-bordered select-sm" value={groupFilters.department} onChange={e => setGroupFilters({...groupFilters, department: e.target.value})}>
                                            <option value="">All Departments</option>
                                            {[...new Set(policies.map(p => p.department))].map(d => <option key={d}>{d}</option>)}
                                        </select>
                                        <select className="select select-bordered select-sm" value={groupFilters.location} onChange={e => setGroupFilters({...groupFilters, location: e.target.value})}>
                                            <option value="">All Locations</option>
                                            {[...new Set(policies.map(p => p.location))].map(l => <option key={l}>{l}</option>)}
                                        </select>
                                        <select className="select select-bordered select-sm" value={groupFilters.designation} onChange={e => setGroupFilters({...groupFilters, designation: e.target.value})}>
                                            <option value="">All Designations</option>
                                            {[...new Set(policies.map(p => p.designation))].map(d => <option key={d}>{d}</option>)}
                                        </select>
                                        <select className="select select-bordered select-sm" value={groupFilters.category} onChange={e => setGroupFilters({...groupFilters, category: e.target.value})}>
                                            <option value="">All Categories</option>
                                            {[...new Set(policies.map(p => p.category))].map(c => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="h-64 overflow-y-auto border rounded-lg p-2">
                                    {filteredEmployeesForGroupEdit.map(emp => (
                                        <div key={emp.id} className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">{emp.name}</span>
                                                <input type="checkbox" className="checkbox" checked={selectedEmployees.includes(emp.id)} onChange={() => handleEmployeeSelection(emp.id)} />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Right Panel: Policy Settings */}
                            <div className="space-y-4">
                                <h4 className="font-semibold">2. Assign New Policy</h4>
                                <div className="p-4 border rounded-lg bg-base-200 space-y-4">
                                    <div className="form-control">
                                        <label className="label"><span className="label-text">Punch Type</span></label>
                                        <select className="select select-bordered" value={groupPolicy.punchType} onChange={e => setGroupPolicy({...groupPolicy, punchType: e.target.value})}>
                                            <option>No Punch</option>
                                            <option>Single Punch</option>
                                            <option>Odd Punch</option>
                                            <option>Even Punch</option>
                                            <option>First In Last Out</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text">Overtime Applicable</span></label>
                                        <select className="select select-bordered" value={groupPolicy.overtime} onChange={e => setGroupPolicy({...groupPolicy, overtime: e.target.value})}>
                                            <option>Yes</option>
                                            <option>No</option>
                                            <option>On Approval</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text">Late Applicable</span></label>
                                        <select className="select select-bordered" value={groupPolicy.late} onChange={e => setGroupPolicy({...groupPolicy, late: e.target.value})}>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text">Work Span (hours)</span></label>
                                        <input type="number" className="input input-bordered" value={groupPolicy.workSpan} onChange={e => setGroupPolicy({...groupPolicy, workSpan: e.target.value})} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text">Auto Shift</span></label>
                                        <select className="select select-bordered" value={groupPolicy.autoShift} onChange={e => setGroupPolicy({...groupPolicy, autoShift: e.target.value})}>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowGroupEdit(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleGroupEditSave} disabled={selectedEmployees.length === 0}>
                                Apply to {selectedEmployees.length} Employees
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeePolicy;
