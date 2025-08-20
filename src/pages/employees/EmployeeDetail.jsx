import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, Hash, Key, Settings, Edit } from 'lucide-react';
import { faker } from '@faker-js/faker';

// Dummy data for a specific employee
const employeeData = {
    'PR101': {
        name: 'Kaif Shekh',
        avatar: 'KS',
        department: 'Production',
        code: 'PR101',
        portalAccess: 'Disabled',
        work: {
            department: 'Production',
            designation: 'TIG WELDER',
            category: 'Production Worker',
            email: null,
            joiningDate: '2025-08-08',
            probationEnd: '2026-01-07',
            costCentre: '16000/- Net',
            grade: null
        },
        location: {
            location: 'Bangalore',
            timezone: 'Asia/Kolkata',
            workAddress: 'Bangalore'
        }
    }
};

const generateRandomEmployee = (id) => {
    const name = faker.person.fullName();
    return {
        name: name,
        avatar: name.substring(0, 2).toUpperCase(),
        department: faker.commerce.department(),
        code: id,
        portalAccess: faker.helpers.arrayElement(['Enabled', 'Disabled']),
        work: {
            department: faker.commerce.department(),
            designation: faker.person.jobTitle(),
            category: faker.person.jobType(),
            email: faker.internet.email(),
            joiningDate: faker.date.past({ years: 3 }).toISOString().split('T')[0],
            probationEnd: faker.date.future({ years: 1 }).toISOString().split('T')[0],
            costCentre: `${faker.finance.amount({ min: 20000, max: 80000, dec: 0 })}/- Net`,
            grade: faker.helpers.arrayElement(['A', 'B', 'C', null])
        },
        location: {
            location: faker.location.city(),
            timezone: faker.location.timeZone(),
            workAddress: faker.location.city()
        }
    };
};

const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-sm text-base-content/60">{label}</p>
        {value ? <p className="font-medium">{value}</p> : <p className="font-medium text-error">Not defined</p>}
    </div>
);

const DetailCard = ({ title, children }) => (
    <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body">
            <div className="flex justify-between items-center mb-4">
                <h3 className="card-title text-base">{title}</h3>
                <button className="btn btn-ghost btn-sm btn-circle"><Edit size={16} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    </div>
);

const PlaceholderTab = ({ name }) => (
    <div className="flex items-center justify-center h-48 bg-base-200 rounded-lg">
        <p className="text-base-content/50">Content for {name} tab goes here.</p>
    </div>
);

const EmployeeDetail = () => {
    const { employeeId } = useParams();
    const [activeTab, setActiveTab] = useState('Work');
    
    const employee = employeeData[employeeId] || generateRandomEmployee(employeeId);

    const tabs = ['Work', 'Personal', 'Qualification', 'Experience', 'KYC', 'Assets', 'Leaves', 'Attendance', 'Shift', 'Payroll', 'Encashment', 'Loan', 'Punch Request', 'Permission'];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Link to="/employees" className="flex items-center gap-2 text-base-content/80 hover:text-primary transition-colors">
                    <ArrowLeft size={20} />
                    <span className="font-medium">Employees List</span>
                </Link>
            </div>

            {/* Employee Header */}
            <div className="flex items-center justify-between p-4 bg-base-100 rounded-lg shadow-sm border border-base-200">
                <div className="flex items-center gap-4">
                    <div className="avatar placeholder">
                        <div className="bg-success text-success-content rounded-full w-16">
                            <span className="text-2xl">{employee.avatar}</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{employee.name}</h1>
                        <div className="flex items-center gap-4 text-sm text-base-content/70 mt-1">
                            <span className="flex items-center gap-1.5"><Briefcase size={14} /> {employee.department}</span>
                            <span className="flex items-center gap-1.5"><Hash size={14} /> {employee.code}</span>
                            <span className="flex items-center gap-1.5"><Key size={14} /> Portal Access: {employee.portalAccess}</span>
                        </div>
                    </div>
                </div>
                <button className="btn btn-ghost btn-circle">
                    <Settings size={20} />
                </button>
            </div>

            {/* Tabs */}
            <div className="tabs tabs-bordered overflow-x-auto">
                {tabs.map(tab => (
                    <a key={tab} className={`tab ${activeTab === tab ? 'tab-active' : ''}`} onClick={() => setActiveTab(tab)}>
                        {tab}
                    </a>
                ))}
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'Work' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <DetailCard title="Employment Details">
                            <DetailItem label="Employee Code" value={employee.code} />
                            <DetailItem label="Department" value={employee.work.department} />
                            <DetailItem label="Designation" value={employee.work.designation} />
                            <DetailItem label="Category" value={employee.work.category} />
                            <DetailItem label="Official Email" value={employee.work.email} />
                            <DetailItem label="Date of Joining" value={employee.work.joiningDate} />
                            <DetailItem label="End of Probation" value={employee.work.probationEnd} />
                            <DetailItem label="Cost Centre" value={employee.work.costCentre} />
                            <DetailItem label="Grade" value={employee.work.grade} />
                        </DetailCard>
                        <DetailCard title="Location">
                            <DetailItem label="Location" value={employee.location.location} />
                            <DetailItem label="Timezone" value={employee.location.timezone} />
                            <DetailItem label="Work Address" value={employee.location.workAddress} />
                        </DetailCard>
                    </div>
                )}
                {activeTab !== 'Work' && <PlaceholderTab name={activeTab} />}
            </div>
        </div>
    );
};

export default EmployeeDetail;
