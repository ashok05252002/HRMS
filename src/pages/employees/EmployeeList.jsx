import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { Search, Filter, Plus } from 'lucide-react';

const indianNames = ['Aarav Sharma', 'Vivaan Singh', 'Aditya Kumar', 'Vihaan Patel', 'Arjun Reddy', 'Sai Gupta', 'Reyansh Mishra', 'Krishna Verma', 'Ishaan Yadav', 'Rohan Mehra', 'Priya Patel', 'Saanvi Sharma', 'Ananya Singh', 'Aadhya Gupta', 'Diya Kumar', 'Kaif Shekh'];
const departments = ['Engineering', 'Design', 'Product', 'Sales', 'Marketing', 'Production'];
const designations = ['Software Engineer', 'Sr. Engineer', 'Team Lead', 'Manager', 'Designer', 'Product Manager', 'TIG WELDER'];

const generateEmployees = (count) => Array.from({ length: count }, (_, i) => ({
    id: `PR${102 + i}`, // Changed from 101 to 102 to avoid conflict
    name: faker.helpers.arrayElement(indianNames),
    avatar: `https://i.pravatar.cc/150?u=PR${102 + i}`,
    department: faker.helpers.arrayElement(departments),
    designation: faker.helpers.arrayElement(designations),
    status: faker.helpers.arrayElement(['Active', 'On Notice', 'Disabled']),
}));

const allEmployees = [
    { id: 'PR101', name: 'Kaif Shekh', avatar: 'KS', department: 'Production', designation: 'TIG WELDER', status: 'Active' },
    ...generateEmployees(20)
];

const EmployeeList = () => {
    const navigate = useNavigate();
    const [employees] = useState(allEmployees);

    const handleRowClick = (employeeId) => {
        navigate(`/employees/${employeeId}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Employees List</h1>
                <button className="btn btn-primary">
                    <Plus size={20} /> Add Employee
                </button>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                        <div className="form-control">
                            <div className="input-group">
                                <input type="text" placeholder="Search by name or code..." className="input input-bordered" />
                                <button className="btn btn-square btn-ghost"><Search size={20} /></button>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <select className="select select-bordered"><option>All Departments</option></select>
                            <select className="select select-bordered"><option>All Status</option></select>
                            <button className="btn btn-ghost"><Filter size={16} /> Filters</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Employee Code</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr key={emp.id} onClick={() => handleRowClick(emp.id)} className="cursor-pointer">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                        {emp.avatar.length > 2 ? <img src={emp.avatar} alt={emp.name} /> : <span>{emp.avatar}</span>}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{emp.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{emp.id}</td>
                                        <td>{emp.department}</td>
                                        <td>{emp.designation}</td>
                                        <td>
                                            <span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-ghost'}`}>{emp.status}</span>
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

export default EmployeeList;
