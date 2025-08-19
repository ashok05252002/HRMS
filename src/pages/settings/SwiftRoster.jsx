import React, { useState, useMemo, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { Plus, Edit, Trash2, Eye, Search, X, Users, Briefcase, CalendarDays, MapPin } from 'lucide-react';

// --- DUMMY DATA ---
const indianNames = ['Aarav Sharma', 'Vivaan Singh', 'Aditya Kumar', 'Vihaan Patel', 'Arjun Reddy', 'Sai Gupta', 'Reyansh Mishra', 'Krishna Verma', 'Ishaan Yadav', 'Rohan Mehra', 'Priya Patel', 'Saanvi Sharma', 'Ananya Singh', 'Aadhya Gupta', 'Diya Kumar'];
const departments = ['Engineering', 'Design', 'Product', 'Sales', 'Marketing'];
const locations = ['Mumbai', 'Bengaluru', 'Delhi', 'Chennai'];
const designations = ['Software Engineer', 'Sr. Engineer', 'Team Lead', 'Manager', 'Designer', 'Product Manager'];
const categories = ['Full-time', 'Part-time', 'Intern'];
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const generateEmployees = (count) => Array.from({ length: count }, (_, i) => ({
    id: `EMP${1001 + i}`,
    name: faker.helpers.arrayElement(indianNames),
    avatar: `https://i.pravatar.cc/150?u=${1001 + i}`,
    department: faker.helpers.arrayElement(departments),
    location: faker.helpers.arrayElement(locations),
    designation: faker.helpers.arrayElement(designations),
    category: faker.helpers.arrayElement(categories),
}));

const allEmployees = generateEmployees(50);

const shifts = [
    { id: 'S1', name: 'Morning Shift', time: '09:00 - 17:00', location: 'All', status: 'Active' },
    { id: 'S2', name: 'Evening Shift', time: '14:00 - 22:00', location: 'All', status: 'Active' },
    { id: 'S3', name: 'Night Shift', time: '22:00 - 06:00', location: 'All', status: 'Active' },
    { id: 'S4', name: 'Weekend Support', time: '10:00 - 18:00', location: 'Bengaluru', status: 'Inactive' },
];

const initialRosters = [
    { id: 1, name: 'Engineering Week 32', employeeIds: ['EMP1001', 'EMP1005', 'EMP1012'], shiftIds: ['S1'], rosterDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], department: 'Engineering' },
    { id: 2, name: 'Design Team Roster', employeeIds: ['EMP1002', 'EMP1008'], shiftIds: ['S1', 'S2'], rosterDays: ['Monday', 'Wednesday', 'Friday'], department: 'Design' },
];

const filterOptions = {
    Department: departments,
    Location: locations,
    Designation: designations,
    Category: categories,
};
// --- END DUMMY DATA ---

const SwiftRoster = () => {
    const [rosters, setRosters] = useState(initialRosters);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRoster, setCurrentRoster] = useState(null);

    // Modal State
    const [rosterName, setRosterName] = useState('');
    const [primaryFilter, setPrimaryFilter] = useState('Department');
    const [secondaryFilter, setSecondaryFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployees, setSelectedEmployees] = useState(new Set());
    const [selectedShifts, setSelectedShifts] = useState(new Set());
    const [selectedDays, setSelectedDays] = useState(new Set());

    useEffect(() => {
        setSecondaryFilter('All');
    }, [primaryFilter]);

    const filteredEmployees = useMemo(() => {
        return allEmployees.filter(emp => 
            (secondaryFilter === 'All' || emp[primaryFilter.toLowerCase()] === secondaryFilter) &&
            (emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [primaryFilter, secondaryFilter, searchTerm]);

    const handleOpenModal = (roster = null) => {
        if (roster) {
            setIsEditing(true);
            setCurrentRoster(roster);
            setRosterName(roster.name);
            setSelectedEmployees(new Set(roster.employeeIds));
            setSelectedShifts(new Set(roster.shiftIds));
            setSelectedDays(new Set(roster.rosterDays));
        } else {
            setIsEditing(false);
            setCurrentRoster(null);
            setRosterName('');
            setSelectedEmployees(new Set());
            setSelectedShifts(new Set());
            setSelectedDays(new Set());
            setPrimaryFilter('Department');
            setSecondaryFilter('All');
            setSearchTerm('');
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        if (!rosterName || selectedEmployees.size === 0 || selectedShifts.size === 0 || selectedDays.size === 0) {
            alert('Please fill all fields: Roster Name, select at least one Employee, one Shift, and one Roster Day.');
            return;
        }

        const newRoster = {
            id: isEditing ? currentRoster.id : Date.now(),
            name: rosterName,
            employeeIds: Array.from(selectedEmployees),
            shiftIds: Array.from(selectedShifts),
            rosterDays: Array.from(selectedDays),
            department: 'Mixed' // Or derive from employees
        };

        if (isEditing) {
            setRosters(rosters.map(r => r.id === newRoster.id ? newRoster : r));
        } else {
            setRosters([...rosters, newRoster]);
        }
        handleCloseModal();
    };
    
    const handleEmployeeSelect = (id) => {
        const newSelection = new Set(selectedEmployees);
        newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
        setSelectedEmployees(newSelection);
    };

    const handleSelectAll = (e) => {
        setSelectedEmployees(e.target.checked ? new Set(filteredEmployees.map(emp => emp.id)) : new Set());
    };

    const handleShiftSelect = (id) => {
        const newSelection = new Set(selectedShifts);
        newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
        setSelectedShifts(newSelection);
    };
    
    const handleDaySelect = (day) => {
        const newSelection = new Set(selectedDays);
        newSelection.has(day) ? newSelection.delete(day) : newSelection.add(day);
        setSelectedDays(newSelection);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Swift Roster</h1>
                <button onClick={() => handleOpenModal()} className="btn btn-primary">
                    <Plus size={20} /> Add Roster
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rosters.map(roster => (
                    <div key={roster.id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{roster.name}</h2>
                            <p className="text-sm text-base-content/70">Days: {roster.rosterDays.join(', ')}</p>
                            <div className="my-2">
                                <div className="flex items-center gap-2 text-sm"><Users size={14} /> {roster.employeeIds.length} Employees</div>
                                <div className="flex items-center gap-2 text-sm"><Briefcase size={14} /> {roster.shiftIds.length} Shifts</div>
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn btn-sm btn-ghost"><Eye size={16} /></button>
                                <button onClick={() => handleOpenModal(roster)} className="btn btn-sm btn-ghost"><Edit size={16} /></button>
                                <button className="btn btn-sm btn-ghost text-error"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-6xl">
                        <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><X /></button>
                        <h3 className="font-bold text-lg">{isEditing ? 'Edit' : 'Add'} Swift Roster</h3>
                        
                        <div className="form-control mt-4">
                            <label className="label"><span className="label-text">Roster Name</span></label>
                            <input type="text" value={rosterName} onChange={e => setRosterName(e.target.value)} placeholder="e.g., Engineering Week 32" className="input input-bordered" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            {/* Left Section: Employee Selection */}
                            <div className="space-y-4 p-4 border rounded-lg bg-base-200">
                                <h4 className="font-semibold">Select Employees ({selectedEmployees.size} selected)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <select className="select select-bordered select-sm" value={primaryFilter} onChange={e => setPrimaryFilter(e.target.value)}>
                                        {Object.keys(filterOptions).map(d => <option key={d}>{d}</option>)}
                                    </select>
                                    <select className="select select-bordered select-sm" value={secondaryFilter} onChange={e => setSecondaryFilter(e.target.value)}>
                                        <option value="All">All</option>
                                        {filterOptions[primaryFilter].map(l => <option key={l}>{l}</option>)}
                                    </select>
                                </div>
                                <input type="text" placeholder="Search by name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input input-bordered input-sm w-full" />
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Select All ({filteredEmployees.length})</span>
                                        <input type="checkbox" className="checkbox" onChange={handleSelectAll} checked={filteredEmployees.length > 0 && filteredEmployees.every(emp => selectedEmployees.has(emp.id))} />
                                    </label>
                                </div>
                                <div className="space-y-2 h-64 overflow-y-auto pr-2">
                                    {filteredEmployees.map(emp => (
                                        <div key={emp.id} className="p-2 border rounded-lg bg-base-100 flex items-center gap-3">
                                            <input type="checkbox" className="checkbox" checked={selectedEmployees.has(emp.id)} onChange={() => handleEmployeeSelect(emp.id)} />
                                            <div className="avatar"><div className="w-10 rounded-full"><img src={emp.avatar} alt={emp.name} /></div></div>
                                            <div>
                                                <div className="font-bold">{emp.name}</div>
                                                <div className="text-xs text-base-content/70">{emp.designation} - {emp.department}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Section: Shift Selection */}
                            <div className="space-y-4 p-4 border rounded-lg bg-base-200">
                                <h4 className="font-semibold">Select Shifts</h4>
                                <div className="space-y-2 h-48 overflow-y-auto pr-2">
                                    {shifts.map(shift => (
                                        <div key={shift.id} className="p-2 border rounded-lg bg-base-100 flex items-center gap-3">
                                            <input type="checkbox" className="checkbox" checked={selectedShifts.has(shift.id)} onChange={() => handleShiftSelect(shift.id)} />
                                            <div>
                                                <div className="font-bold">{shift.name} <span className={`badge badge-xs ${shift.status === 'Active' ? 'badge-success' : 'badge-ghost'}`}></span></div>
                                                <div className="text-xs text-base-content/70">{shift.time} at {shift.location}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Select Roster Days</span></label>
                                    <div className="flex flex-wrap gap-2">
                                        {daysOfWeek.map(day => (
                                            <button key={day} onClick={() => handleDaySelect(day)} className={`btn btn-sm ${selectedDays.has(day) ? 'btn-primary' : 'btn-outline'}`}>
                                                {day.substring(0,3)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-2 bg-base-100 rounded-lg text-sm mt-4">
                                    <p><strong>Summary:</strong></p>
                                    <p>{selectedEmployees.size} employees, {selectedShifts.size} shifts, for days: {Array.from(selectedDays).join(', ') || '...'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="modal-action mt-6">
                            <button onClick={handleCloseModal} className="btn btn-ghost">Cancel</button>
                            <button onClick={handleSave} className="btn btn-primary">Save Roster</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SwiftRoster;
