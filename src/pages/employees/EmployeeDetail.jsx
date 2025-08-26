import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, Hash, Key, Settings, Edit, ChevronLeft, ChevronRight, X } from 'lucide-react';
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
    faker.seed(parseInt(id.replace('PR',''), 10));
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

// --- Shift Tab Components & Logic ---
const shifts = {
    'G': { name: 'General Shift', color: 'badge-success' },
    'M': { name: 'Morning Shift', color: 'badge-info' },
    'E': { name: 'Evening Shift', color: 'badge-warning' },
    'N': { name: 'Night Shift', color: 'badge-neutral' },
    'WO': { name: 'Week Off', color: 'badge-ghost' },
};
const shiftTypes = ['G', 'M', 'E', 'N', 'WO'];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const generateShiftData = (employeeId, year, month) => {
    faker.seed(parseInt(employeeId.replace('PR',''), 10) + year + month);
    const saturdayOffs = {
        first: faker.datatype.boolean(),
        second: faker.datatype.boolean(),
        third: faker.datatype.boolean(),
        fourth: faker.datatype.boolean(),
    };
    const assignments = {};
    const daysInMonth = getDaysInMonth(year, month);

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = date.toISOString().split('T')[0];
        const dayOfWeek = date.getDay();
        
        if (dayOfWeek === 0) { // Sunday
            assignments[dateString] = 'WO';
            continue;
        }
        if (dayOfWeek === 6) { // Saturday
            const weekOfMonth = Math.ceil(day / 7);
            if ((weekOfMonth === 1 && saturdayOffs.first) ||
                (weekOfMonth === 2 && saturdayOffs.second) ||
                (weekOfMonth === 3 && saturdayOffs.third) ||
                (weekOfMonth === 4 && saturdayOffs.fourth)) {
                assignments[dateString] = 'WO';
                continue;
            }
        }
        assignments[dateString] = faker.helpers.arrayElement(['G', 'M', 'E', 'N', 'G', 'G']); // Default to General more often
    }
    return { saturdayOffs, assignments };
};

const ShiftTabContent = ({ employeeId }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    // State for shift data
    const [saturdayConfig, setSaturdayConfig] = useState({});
    const [assignments, setAssignments] = useState({});

    // State for modal
    const [showShiftModal, setShowShiftModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // Initialize or re-generate data when month or employee changes
    useEffect(() => {
        const { saturdayOffs: newSaturdayOffs, assignments: newAssignments } = generateShiftData(employeeId, currentDate.getFullYear(), currentDate.getMonth());
        setSaturdayConfig(newSaturdayOffs);
        setAssignments(newAssignments);
    }, [employeeId, currentDate]);

    // Update calendar when Saturday settings change
    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const newAssignments = { ...assignments };

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            if (date.getDay() === 6) { // Is a Saturday
                const dateString = date.toISOString().split('T')[0];
                const weekOfMonth = Math.ceil(day / 7);
                let isWeekOff = false;
                if (weekOfMonth === 1 && saturdayConfig.first) isWeekOff = true;
                else if (weekOfMonth === 2 && saturdayConfig.second) isWeekOff = true;
                else if (weekOfMonth === 3 && saturdayConfig.third) isWeekOff = true;
                else if (weekOfMonth === 4 && saturdayConfig.fourth) isWeekOff = true;
                
                if (isWeekOff) {
                    newAssignments[dateString] = 'WO';
                } else if (newAssignments[dateString] === 'WO') {
                    // If it was a week off but now it's not, assign a default shift
                    newAssignments[dateString] = 'G';
                }
            }
        }
        setAssignments(newAssignments);
    }, [saturdayConfig]);

    const handleMonthChange = (offset) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const handleDayClick = (dateString) => {
        setSelectedDate(dateString);
        setShowShiftModal(true);
    };

    const handleShiftChange = (shiftCode) => {
        if (selectedDate) {
            setAssignments(prev => ({
                ...prev,
                [selectedDate]: shiftCode
            }));
        }
        setShowShiftModal(false);
        setSelectedDate(null);
    };
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel: Settings */}
                <div className="lg:col-span-1">
                    <div className="card bg-base-100 shadow-sm border border-base-200">
                        <div className="card-body">
                            <h3 className="card-title text-base">Weekly Off Settings</h3>
                            <div className="form-control">
                                <label className="label cursor-pointer"><span className="label-text">1st Saturday Week Off</span><input type="checkbox" className="toggle" checked={saturdayConfig.first || false} onChange={e => setSaturdayConfig({...saturdayConfig, first: e.target.checked})} /></label>
                                <label className="label cursor-pointer"><span className="label-text">2nd Saturday Week Off</span><input type="checkbox" className="toggle" checked={saturdayConfig.second || false} onChange={e => setSaturdayConfig({...saturdayConfig, second: e.target.checked})} /></label>
                                <label className="label cursor-pointer"><span className="label-text">3rd Saturday Week Off</span><input type="checkbox" className="toggle" checked={saturdayConfig.third || false} onChange={e => setSaturdayConfig({...saturdayConfig, third: e.target.checked})} /></label>
                                <label className="label cursor-pointer"><span className="label-text">4th Saturday Week Off</span><input type="checkbox" className="toggle" checked={saturdayConfig.fourth || false} onChange={e => setSaturdayConfig({...saturdayConfig, fourth: e.target.checked})} /></label>
                            </div>
                            <div className="divider">Shift Legend</div>
                            <div className="space-y-1">
                                {Object.entries(shifts).map(([code, { name, color }]) => (
                                    <div key={code} className="flex items-center gap-2 text-sm">
                                        <span className={`badge ${color}`}>{code}</span>
                                        <span>{name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Calendar */}
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 shadow-sm border border-base-200">
                        <div className="card-body">
                            <div className="flex items-center justify-between mb-4">
                                <button onClick={() => handleMonthChange(-1)} className="btn btn-ghost btn-sm btn-circle"><ChevronLeft size={20} /></button>
                                <h3 className="font-semibold">{monthName} {year}</h3>
                                <button onClick={() => handleMonthChange(1)} className="btn btn-ghost btn-sm btn-circle"><ChevronRight size={20} /></button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="p-2">{day}</div>)}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="h-16 border rounded-lg bg-base-200"></div>)}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const dateString = new Date(year, month, day).toISOString().split('T')[0];
                                    const shiftCode = assignments[dateString] || 'G'; // Default to General
                                    const shiftInfo = shifts[shiftCode];
                                    return (
                                        <div key={day} onClick={() => handleDayClick(dateString)} className="h-16 border rounded-lg flex flex-col items-center justify-center p-1 cursor-pointer hover:bg-base-200 transition-colors">
                                            <span className="font-medium">{day}</span>
                                            {shiftInfo && <span className={`badge badge-sm mt-1 ${shiftInfo.color}`}>{shiftCode}</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shift Selection Modal */}
            {showShiftModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <button onClick={() => setShowShiftModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><X /></button>
                        <h3 className="font-bold text-lg">Change Shift for {new Date(selectedDate).toLocaleDateString()}</h3>
                        <div className="py-4 space-y-2">
                            {shiftTypes.map(code => {
                                const shiftInfo = shifts[code];
                                return (
                                    <button key={code} onClick={() => handleShiftChange(code)} className="btn btn-outline btn-block justify-start">
                                        <span className={`badge ${shiftInfo.color}`}>{code}</span>
                                        {shiftInfo.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
// --- End Shift Tab ---

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
                {activeTab === 'Shift' && <ShiftTabContent employeeId={employeeId} />}
                {activeTab !== 'Work' && activeTab !== 'Shift' && <PlaceholderTab name={activeTab} />}
            </div>
        </div>
    );
};

export default EmployeeDetail;
