import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { Edit, Save, Download, FileText, GripVertical } from 'lucide-react';

const formatINRCurrency = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return value;
    return `INR ${number.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const fieldToFakerMap = {
    'Employee ID': () => `EMP${faker.string.numeric(4)}`,
    'Full Name': () => faker.person.fullName(),
    'Email': () => faker.internet.email(),
    'Contact Number': () => faker.phone.number(),
    'Gender': () => faker.person.sex(),
    'Date of Birth': () => faker.date.birthdate().toLocaleDateString(),
    'Date of Joining': () => faker.date.past({ years: 5 }).toLocaleDateString(),
    'Department': () => faker.helpers.arrayElement(['IT', 'Sales', 'Marketing', 'HR']),
    'Designation / Job Title': () => faker.person.jobTitle(),
    'Employee Type': () => faker.helpers.arrayElement(['Permanent', 'Intern', 'Contract']),
    'Employment Status': () => faker.helpers.arrayElement(['Active', 'On Notice']),
    'Leave Type': () => faker.helpers.arrayElement(['Annual', 'Sick', 'Casual']),
    'Leave Status': () => faker.helpers.arrayElement(['Approved', 'Pending', 'Rejected']),
    'Check-in Time': () => faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    'Check-out Time': () => faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    'Total Hours Worked': () => faker.number.int({ min: 7, max: 9 }),
    'Total No Days': () => 30,
    'LOP Days': () => faker.number.int({ min: 0, max: 2 }),
    'No of Days Paid': () => 28,

    // Payroll Fields
    'Annual CTC': () => formatINRCurrency(faker.finance.amount({ min: 300000, max: 2500000, dec: 0 })),
    'Monthly CTC': () => formatINRCurrency(faker.finance.amount({ min: 25000, max: 200000, dec: 0 })),
    'Monthly Fixed Gross': () => formatINRCurrency(faker.finance.amount({ min: 22000, max: 180000, dec: 0 })),
    'Earned Gross': () => formatINRCurrency(faker.finance.amount({ min: 20000, max: 170000, dec: 0 })),
    'Basic': () => formatINRCurrency(faker.finance.amount({ min: 10000, max: 80000, dec: 0 })),
    'HRA': () => formatINRCurrency(faker.finance.amount({ min: 5000, max: 40000, dec: 0 })),
    'PF Gross': () => formatINRCurrency(faker.finance.amount({ min: 20000, max: 160000, dec: 0 })),
    'Bonus': () => formatINRCurrency(faker.finance.amount({ min: 0, max: 20000, dec: 0 })),
    'Special Allowance': () => formatINRCurrency(faker.finance.amount({ min: 2000, max: 50000, dec: 0 })),
    'Employee PF': () => formatINRCurrency(faker.finance.amount({ min: 1800, max: 5000, dec: 0 })),
    'Employee ESIC': () => formatINRCurrency(faker.finance.amount({ min: 100, max: 500, dec: 0 })),
    'TDS': () => formatINRCurrency(faker.finance.amount({ min: 0, max: 15000, dec: 0 })),
    'PT': () => formatINRCurrency(faker.finance.amount({ min: 150, max: 200, dec: 0 })),
    'Tot.Deduction': () => formatINRCurrency(faker.finance.amount({ min: 2000, max: 20000, dec: 0 })),
    'Net Salary': () => formatINRCurrency(faker.finance.amount({ min: 18000, max: 150000, dec: 0 })),
    'Variable Pay': () => formatINRCurrency(faker.finance.amount({ min: 0, max: 30000, dec: 0 })),
    'Salary Release': () => formatINRCurrency(faker.finance.amount({ min: 18000, max: 150000, dec: 0 })),
    'Salary Hold': () => formatINRCurrency(0),
    'Advance Recovered': () => formatINRCurrency(0),
    'Actual Payout': () => formatINRCurrency(faker.finance.amount({ min: 18000, max: 150000, dec: 0 })),
    'Emplr PF': () => formatINRCurrency(faker.finance.amount({ min: 1800, max: 5000, dec: 0 })),
    'Emplr ESI': () => formatINRCurrency(faker.finance.amount({ min: 100, max: 500, dec: 0 })),
};

const generateMockData = (fields, count = 15) => {
    return Array.from({ length: count }, () => {
        const row = {};
        fields.forEach(field => {
            const generator = fieldToFakerMap[field] || (() => faker.lorem.word());
            row[field] = generator();
        });
        return row;
    });
};

const PreviewReport = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { reportName, selectedFields, filters, reportDateRange } = location.state || {};
    
    const [mockData, setMockData] = useState([]);
    const [orderedFields, setOrderedFields] = useState(selectedFields || []);
    
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    useEffect(() => {
        if (!selectedFields || selectedFields.length === 0) {
            navigate('/reports-analytics/builder/create');
        } else {
            setMockData(generateMockData(selectedFields));
            setOrderedFields(selectedFields);
        }
    }, [selectedFields, navigate]);

    const handleSort = () => {
        let _orderedFields = [...orderedFields];
        const draggedItemContent = _orderedFields.splice(dragItem.current, 1)[0];
        _orderedFields.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setOrderedFields(_orderedFields);
    };

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
                    <button onClick={() => navigate('/reports-analytics/builder/create', { state: { isEditing: true, name: reportName, fields: orderedFields, filters, reportDateRange } })} className="btn btn-outline">
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
                            <li key="pdf"><a>Export as PDF</a></li>
                            <li key="excel"><a>Export as Excel</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    {orderedFields.map((field, index) => (
                                        <th 
                                            key={field}
                                            draggable
                                            onDragStart={() => (dragItem.current = index)}
                                            onDragEnter={() => (dragOverItem.current = index)}
                                            onDragEnd={handleSort}
                                            onDragOver={(e) => e.preventDefault()}
                                            className="cursor-grab hover:bg-base-200 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <GripVertical size={16} className="text-base-content/40" />
                                                {field}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {mockData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {orderedFields.map(field => <td key={field}>{row[field]}</td>)}
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

export default PreviewReport;
