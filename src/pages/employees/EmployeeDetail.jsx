import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { ArrowLeft, User, Briefcase, Calendar, GitBranch, DollarSign, FileText } from 'lucide-react';

import ProfileTab from './tabs/ProfileTab';
import AttendanceTab from './tabs/AttendanceTab';
import LeavesTab from './tabs/LeavesTab';
import ShiftTab from './tabs/ShiftTab';
import PayrollTab from './tabs/PayrollTab';
import DocumentsTab from './tabs/DocumentsTab';

const generateEmployeeData = (id) => {
    faker.seed(id.hashCode()); // Ensure consistent data for the same ID
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
        id,
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }),
        phone: faker.phone.number(),
        department: faker.commerce.department(),
        designation: faker.person.jobTitle(),
        status: faker.helpers.arrayElement(['Active', 'Inactive', 'On Leave']),
        avatar: faker.image.avatar(),
        joiningDate: faker.date.past({ years: 5 }).toLocaleDateString(),
        location: faker.location.city(),
    };
};

// Simple hash function for seeding
String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};


const EmployeeDetail = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    const [activeTab, setActiveTab] = useState('Profile');

    useEffect(() => {
        // In a real app, you'd fetch this data. Here, we generate it.
        const data = generateEmployeeData(employeeId);
        setEmployee(data);
    }, [employeeId]);

    const tabs = [
        { name: 'Profile', icon: User },
        { name: 'Attendance', icon: Calendar },
        { name: 'Leaves', icon: Briefcase },
        { name: 'Shift', icon: GitBranch },
        { name: 'Payroll', icon: DollarSign },
        { name: 'Documents', icon: FileText },
    ];

    if (!employee) {
        return <div className="flex justify-center items-center h-full"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Profile':
                return <ProfileTab employee={employee} />;
            case 'Attendance':
                return <AttendanceTab employee={employee} />;
            case 'Leaves':
                return <LeavesTab employee={employee} />;
            case 'Shift':
                return <ShiftTab employee={employee} />;
            case 'Payroll':
                return <PayrollTab employee={employee} />;
            case 'Documents':
                return <DocumentsTab employee={employee} />;
            default:
                return <ProfileTab employee={employee} />;
        }
    };

    return (
        <div className="space-y-6">
            <Link to="/employees" className="btn btn-ghost">
                <ArrowLeft size={20} />
                Back to Employee List
            </Link>

            {/* Header */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body flex-row items-center gap-6">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={employee.avatar} alt={employee.name} />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{employee.name}</h1>
                        <p className="text-base-content/70">{employee.designation}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-base-content/60">
                            <span>ID: {employee.id}</span>
                            <span>•</span>
                            <span>{employee.department}</span>
                            <span>•</span>
                            <span className={`badge ${employee.status === 'Active' ? 'badge-success' : 'badge-error'}`}>{employee.status}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs tabs-boxed bg-base-200">
                {tabs.map(tab => (
                    <a
                        key={tab.name}
                        className={`tab tab-lg gap-2 ${activeTab === tab.name ? 'tab-active font-semibold' : ''}`}
                        onClick={() => setActiveTab(tab.name)}
                    >
                        <tab.icon size={16} />
                        {tab.name}
                    </a>
                ))}
            </div>

            {/* Tab Content */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;
