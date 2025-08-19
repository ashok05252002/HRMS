import React, { useState, useMemo, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { Plus, X, ChevronLeft, ChevronRight, ChevronDown, Edit, Search } from 'lucide-react';

// --- DUMMY DATA & HELPERS ---
const indianNames = ['Aarav Sharma', 'Vivaan Singh', 'Aditya Kumar', 'Vihaan Patel', 'Arjun Reddy', 'Sai Gupta', 'Reyansh Mishra', 'Krishna Verma', 'Ishaan Yadav', 'Rohan Mehra', 'Priya Patel', 'Saanvi Sharma', 'Ananya Singh', 'Aadhya Gupta', 'Diya Kumar', 'Akash', 'Ram', 'Lokesh'];
const departments = ['Engineering', 'Design', 'Product', 'Sales', 'Marketing', 'Human Resources', 'Finance', 'Customer Support', 'Quality Assurance', 'Operations'];
const locations = ['Mumbai', 'Bengaluru', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Gurugram', 'Noida'];
const designations = ['Software Engineer', 'Sr. Engineer', 'Team Lead', 'Manager', 'Designer', 'Product Manager', 'QA Engineer', 'HR Executive', 'Sales Associate', 'Business Analyst'];
const categories = ['Full-time', 'Part-time', 'Intern', 'Consultant', 'Freelancer'];

const generateEmployees = (count) => Array.from({ length: count }, (_, i) => ({
    id: `EMP${1001 + i}`,
    name: faker.helpers.arrayElement(indianNames),
    avatar: `https://i.pravatar.cc/150?u=${1001 + i}`,
    department: faker.helpers.arrayElement(departments),
    location: faker.helpers.arrayElement(locations),
    designation: faker.helpers.arrayElement(designations),
    category: faker.helpers.arrayElement(categories),
}));

const allEmployees = generateEmployees(25);

const shifts = [
    { id: 'S1', name: 'Morning Shift', code: 'M', time: '09:00 - 17:00', colorClass: 'bg-blue-200 text-blue-800' },
    { id: 'S2', name: 'Evening Shift', code: 'E', time: '14:00 - 22:00', colorClass: 'bg-orange-200 text-orange-800' },
    { id: 'S3', name: 'Night Shift', code: 'N', time: '22:00 - 06:00', colorClass: 'bg-indigo-200 text-indigo-800' },
    { id: 'S4', name: 'General Shift', code: 'G', time: '10:00 - 18:00', colorClass: 'bg-green-200 text-green-800' },
    { id: 'WO', name: 'Week Off', code: 'WO', time: 'N/A', colorClass: 'bg-gray-200 text-gray-800' },
];

const filterOptions = { Department: departments, Location: locations, Designation: designations, Category: categories };

const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const numDays = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: numDays }, (_, i) => i + 1);
};
// --- END DUMMY DATA & HELPERS ---

const ShiftRoaster = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)); // August 2025
    const [roasters, setRosters] = useState([
        { id: 1, name: 'Aug Week 1 Engg', employeeIds: ['EMP1001', 'EMP1002'], assignments: { 'EMP1001': { '2025-08-01': 'S1', '2025-08-02': 'S1', '2025-08-03': 'S1', '2025-08-04': 'S1', '2025-08-05': 'S1', '2025-08-06': 'WO', '2025-08-07': 'WO' }, 'EMP1002': { '2025-08-01': 'S2', '2025-08-02': 'S2', '2025-08-03': 'S2', '2025-08-04': 'S2', '2025-08-05': 'S2', '2025-08-06': 'WO', '2025-08-07': 'WO' } } },
        { id: 2, name: 'Aug Week 1 Design', employeeIds: ['EMP1003'], assignments: { 'EMP1003': { '2025-08-01': 'S4' } } },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingRoasterId, setEditingRoasterId] = useState(null);

    // Modal State
    const [roasterName, setRoasterName] = useState('');
    const [filters, setFilters] = useState({ Department: [], Location: [], Designation: [], Category: [] });
    const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
    const [selectedEmployees, setSelectedEmployees] = useState(new Set());
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [activeShiftId, setActiveShiftId] = useState(null);
    const [modalAssignments, setModalAssignments] = useState({});

    const daysInMonth = getDaysInMonth(currentDate);

    const employeeRoasterMap = useMemo(() => {
        const map = {};
        roasters.forEach(roaster => {
            roaster.employeeIds.forEach(empId => {
                map[empId] = roaster;
            });
        });
        return map;
    }, [roasters]);

    const filteredEmployeesForModal = useMemo(() => {
        return allEmployees.filter(emp => {
            const matchesFilters = Object.entries(filters).every(([key, value]) => {
                if (value.length === 0) return true;
                return value.includes(emp[key.toLowerCase()]);
            });
            const matchesSearch = emp.name.toLowerCase().includes(employeeSearchTerm.toLowerCase());
            return matchesFilters && matchesSearch;
        });
    }, [filters, employeeSearchTerm]);
    
    const handleMultiSelectFilterChange = (filterKey, option) => {
        setFilters(prev => {
            const currentSelection = new Set(prev[filterKey]);
            currentSelection.has(option) ? currentSelection.delete(option) : currentSelection.add(option);
            return { ...prev, [filterKey]: Array.from(currentSelection) };
        });
    };

    const handleMonthChange = (offset) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const handleDayClick = (dateString) => {
        if (!activeShiftId) return;
        setModalAssignments(prev => ({ ...prev, [dateString]: activeShiftId }));
    };
    
    const handleSaveRoaster = () => {
        if (!roasterName) {
            alert("Roaster Name is required.");
            return;
        }
        if (selectedEmployees.size === 0) {
            alert("Please select at least one employee.");
            return;
        }

        const roasterPayload = {
            name: roasterName,
            employeeIds: Array.from(selectedEmployees),
            assignments: {},
        };
        
        selectedEmployees.forEach(empId => {
            roasterPayload.assignments[empId] = { ...(modalAssignments || {}) };
        });

        if (isEditing && editingRoasterId) {
            setRosters(roasters.map(r => r.id === editingRoasterId ? { ...roasterPayload, id: editingRoasterId } : r));
        } else {
            setRosters([...roasters, { ...roasterPayload, id: Date.now() }]);
        }
        setShowModal(false);
    };

    const openModal = (editMode = false) => {
        setIsEditing(editMode);
        setEditingRoasterId(null);
        setRoasterName('');
        setFilters({ Department: [], Location: [], Designation: [], Category: [] });
        setEmployeeSearchTerm('');
        setSelectedEmployees(new Set());
        setFromDate('');
        setToDate('');
        setActiveShiftId(null);
        setModalAssignments({});
        setShowModal(true);
    };
    
    const loadRoasterForEditing = (roasterId) => {
        const roasterToEdit = roasters.find(r => r.id === parseInt(roasterId));
        if (roasterToEdit) {
            setEditingRoasterId(roasterToEdit.id);
            setRoasterName(roasterToEdit.name);
            setSelectedEmployees(new Set(roasterToEdit.employeeIds));
            
            // Derive date range and assignments from the roaster
            const allDates = [];
            let representativeAssignments = {};
            if (roasterToEdit.employeeIds.length > 0) {
                const firstEmpId = roasterToEdit.employeeIds[0];
                representativeAssignments = roasterToEdit.assignments[firstEmpId] || {};
            }
            
            Object.values(roasterToEdit.assignments).forEach(empAssignments => {
                allDates.push(...Object.keys(empAssignments));
            });

            if (allDates.length > 0) {
                const minDate = allDates.reduce((a, b) => a < b ? a : b);
                const maxDate = allDates.reduce((a, b) => a > b ? a : b);
                setFromDate(minDate);
                setToDate(maxDate);
            } else {
                setFromDate('');
                setToDate('');
            }
            setModalAssignments(representativeAssignments);
        }
    };

    const calendarDays = useMemo(() => {
        if (!fromDate || !toDate) return [];
        const days = [];
        let currentDate = new Date(fromDate);
        const endDate = new Date(toDate);
        while (currentDate <= endDate) {
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return days;
    }, [fromDate, toDate]);

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex-shrink-0 pb-6">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold">Shift Roaster</h1>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleMonthChange(-1)} className="btn btn-sm btn-ghost btn-circle"><ChevronLeft size={20} /></button>
                            <span className="font-semibold text-lg">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                            <button onClick={() => handleMonthChange(1)} className="btn btn-sm btn-ghost btn-circle"><ChevronRight size={20} /></button>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => openModal(false)} className="btn btn-primary">
                            <Plus size={20} /> Add Roaster
                        </button>
                        <button onClick={() => openModal(true)} className="btn btn-secondary">
                            <Edit size={20} /> Edit Roaster
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto bg-base-100 rounded-lg shadow-xl border border-base-300">
                <table className="table table-fixed">
                    <thead>
                        <tr>
                            <th className="w-64 z-10 sticky left-0 bg-base-200">Employee</th>
                            {daysInMonth.map(day => (
                                <th key={day} className="text-center w-20">
                                    <div>{day}</div>
                                    <div className="text-xs font-normal text-base-content/60">{new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allEmployees.slice(0, 15).map(emp => {
                            const roaster = employeeRoasterMap[emp.id];
                            return (
                                <tr key={emp.id}>
                                    <td className="z-10 sticky left-0 bg-base-100 hover:bg-base-200 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar"><div className="mask mask-squircle w-12 h-12"><img src={emp.avatar} alt={emp.name} /></div></div>
                                            <div>
                                                <div className="font-bold">{emp.name}</div>
                                                <div className="text-sm opacity-50">{emp.designation}</div>
                                                {roaster && <div className="badge badge-ghost badge-sm mt-1">{roaster.name}</div>}
                                            </div>
                                        </div>
                                    </td>
                                    {daysInMonth.map(day => {
                                        const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                        const shiftId = roaster?.assignments?.[emp.id]?.[dateString];
                                        const shift = shifts.find(s => s.id === shiftId);
                                        return (
                                            <td key={day} className="text-center align-middle hover:bg-base-200 transition-colors">
                                                {shift && (
                                                    <div className={`badge ${shift.colorClass} font-bold`}>{shift.code}</div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            
            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-7xl">
                        <button onClick={() => setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><X /></button>
                        <h3 className="font-bold text-lg">{isEditing ? 'Edit' : 'Add'} Shift Roaster</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {isEditing && (
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Select Roaster to Edit</span></label>
                                    <select className="select select-bordered" onChange={(e) => loadRoasterForEditing(e.target.value)}>
                                        <option value="">Choose a roaster...</option>
                                        {roasters.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                    </select>
                                </div>
                            )}
                             <div className="form-control">
                                <label className="label"><span className="label-text">Roaster Name</span></label>
                                <input type="text" value={roasterName} onChange={e => setRoasterName(e.target.value)} placeholder="e.g., Engineering Week 32" className="input input-bordered" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                            <div className="lg:col-span-8 space-y-4 p-4 border rounded-lg bg-base-200">
                                {/* Shift & Calendar Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label"><span className="label-text">From Date</span></label>
                                        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="input input-bordered" />
                                    </div>
                                    <div className="form-control flex flex-col">
                                        <label className="label"><span className="label-text">To Date</span></label>
                                        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="input input-bordered" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-4">
                                    <h4 className="font-semibold">Select a shift to assign:</h4>
                                    {shifts.map(shift => (
                                        <div key={shift.id} className="form-control">
                                            <label className="label cursor-pointer gap-2 p-2 rounded-lg" onClick={() => setActiveShiftId(shift.id)}>
                                                <input type="radio" name="shift-select" className="radio radio-primary" checked={activeShiftId === shift.id} readOnly />
                                                <div className={`badge ${shift.colorClass} font-bold`}>{shift.code}</div>
                                                <span className="label-text font-medium">{shift.name}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-base-100 p-2 rounded-lg mt-4 h-80 overflow-y-auto">
                                    {calendarDays.length > 0 ? (
                                        <div className="grid grid-cols-7 gap-1 text-center">
                                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="font-bold text-xs p-1">{day}</div>)}
                                            {Array.from({ length: calendarDays[0].getDay() }).map((_, i) => <div key={`empty-${i}`}></div>)}
                                            {calendarDays.map(day => {
                                                const dateString = day.toISOString().split('T')[0];
                                                const shiftId = modalAssignments[dateString];
                                                const shift = shifts.find(s => s.id === shiftId);
                                                return (
                                                    <div key={dateString} onClick={() => handleDayClick(dateString)} className="h-20 border rounded-lg p-1 cursor-pointer hover:bg-base-300 transition-colors flex flex-col items-center justify-center">
                                                        <span className="font-semibold text-xs">{day.getDate()}</span>
                                                        {shift && <div className={`badge ${shift.colorClass} font-bold mt-1`}>{shift.code}</div>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : <div className="flex items-center justify-center h-full text-base-content/60">Please select a date range.</div>}
                                </div>
                            </div>

                            <div className="lg:col-span-4 space-y-4 p-4 border rounded-lg bg-base-200">
                                {/* Employee Selection Section */}
                                <h4 className="font-semibold">Select Employees ({selectedEmployees.size} selected)</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {Object.entries(filterOptions).map(([key, options]) => (
                                        <div key={key} className="dropdown">
                                            <div tabIndex={0} role="button" className="btn btn-sm btn-outline btn-block justify-between font-normal">
                                                <span>{key}</span>
                                                <div className="flex items-center gap-1">
                                                    {filters[key]?.length > 0 && <div className="badge badge-secondary badge-xs">+{filters[key].length}</div>}
                                                    <ChevronDown size={16} />
                                                </div>
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-60 overflow-y-auto">
                                                {options.map(opt => (
                                                    <li key={opt}>
                                                        <label className="label cursor-pointer">
                                                            <span className="label-text">{opt}</span>
                                                            <input type="checkbox" className="checkbox checkbox-sm" checked={filters[key]?.includes(opt)} onChange={() => handleMultiSelectFilterChange(key, opt)} />
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                <div className="form-control">
                                    <input 
                                        type="text" 
                                        placeholder="Search by name..." 
                                        className="input input-bordered input-sm w-full" 
                                        value={employeeSearchTerm} 
                                        onChange={(e) => setEmployeeSearchTerm(e.target.value)} 
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer"><span className="label-text">Select All ({filteredEmployeesForModal.length})</span><input type="checkbox" className="checkbox" onChange={(e) => setSelectedEmployees(e.target.checked ? new Set(filteredEmployeesForModal.map(emp => emp.id)) : new Set())} /></label>
                                </div>
                                <div className="space-y-2 h-80 overflow-y-auto pr-2">
                                    {filteredEmployeesForModal.map(emp => {
                                        const assignedRoaster = employeeRoasterMap[emp.id];
                                        const isAssignedToOtherRoaster = assignedRoaster && assignedRoaster.id !== editingRoasterId;
                                        return (
                                            <div key={emp.id} className="p-2 border rounded-lg bg-base-100 flex items-center gap-3">
                                                <input type="checkbox" className="checkbox" checked={selectedEmployees.has(emp.id)} onChange={() => {
                                                    const newSelection = new Set(selectedEmployees);
                                                    newSelection.has(emp.id) ? newSelection.delete(emp.id) : newSelection.add(emp.id);
                                                    setSelectedEmployees(newSelection);
                                                }} />
                                                <div className="avatar"><div className="w-10 rounded-full"><img src={emp.avatar} alt={emp.name} /></div></div>
                                                <div>
                                                    <div className="font-bold">{emp.name}</div>
                                                    <div className="text-xs text-base-content/70">{emp.designation}</div>
                                                    {isAssignedToOtherRoaster && <div className="badge badge-ghost badge-xs mt-1">{assignedRoaster.name}</div>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="modal-action mt-6">
                            <button onClick={() => setShowModal(false)} className="btn btn-ghost">Cancel</button>
                            <button onClick={handleSaveRoaster} className="btn btn-primary">Save Roaster</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShiftRoaster;
