import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { Edit, Save, Download, FileText } from 'lucide-react';

const fieldToFakerMap = {
    'Employee ID': () => `EMP${faker.string.numeric(4)}`,
    'Full Name': () => faker.person.fullName(),
    'Email': () => faker.internet.email(),
    'Contact Number': () => faker.phone.number(),
    'Gender': () => faker.person.sex(),
    'Date of Birth': () => faker.date.birthdate().toLocaleDateString(),
    'Date of Joining': () => faker.date.past({ years: 5 }).toLocaleDateString(),
    'Department': () => faker.helpers.arrayElement(['IT', 'Sales', 'Marketing', 'HR']),
    'Designation': () => faker.person.jobTitle(),
    'Employee Type': () => faker.helpers.arrayElement(['Full-time', 'Part-time', 'Contract']),
    'Employment Status': () => faker.helpers.arrayElement(['Active', 'On Leave', 'Terminated']),
    'Basic Salary': () => `OMR ${faker.finance.amount(1000, 3000, 3)}`,
    'Net Pay': () => `OMR ${faker.finance.amount(800, 2500, 3)}`,
    'Appraisal Rating': () => faker.number.float({ min: 2.5, max: 5.0, precision: 0.1 }),
    'Training Status': () => faker.helpers.arrayElement(['Completed', 'In Progress', 'Not Started']),
    'Leave Status': () => faker.helpers.arrayElement(['Approved', 'Pending', 'Rejected']),
};

const generateMockData = (fields, count = 10) => {
    return Array.from({ length: count }, () => {
        const row = {};
        fields.forEach(field => {
            const generator = fieldToFakerMap[field] || (() => faker.lorem.word());
            row[field] = generator();
        });
        return row;
    });
};

const ReportPreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mockData, setMockData] = useState([]);

    const { reportName, selectedFields, filters } = location.state || {};

    useEffect(() => {
        if (!selectedFields || selectedFields.length === 0) {
            navigate('/custom-report-builder/create');
        } else {
            setMockData(generateMockData(selectedFields));
        }
    }, [selectedFields, navigate]);

    if (!selectedFields) {
        return null; // Or a loading spinner
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FileText size={24} className="text-primary" />
                    <h1 className="text-2xl font-bold">Report Preview: {reportName}</h1>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => navigate(-1)} className="btn btn-outline">
                        <Edit size={16} /> Edit
                    </button>
                    <button className="btn btn-secondary">
                        <Save size={16} /> Save Report
                    </button>
                    <div className="dropdown dropdown-end">
                        <button tabIndex={0} className="btn btn-primary">
                            <Download size={16} /> Export
                        </button>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Export as PDF</a></li>
                            <li><a>Export as Excel</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Applied Filters</h2>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="badge badge-outline">Department: {filters.department}</div>
                        <div className="badge badge-outline">Employee Type: {filters.employeeType}</div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    {selectedFields.map(field => <th key={field}>{field}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {mockData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {selectedFields.map(field => <td key={field}>{row[field]}</td>)}
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

export default ReportPreview;
