import React, { useState, useMemo } from 'react';
import { Plus, Edit, Trash2, Calendar, ChevronLeft, ChevronRight, User, Filter, Search } from 'lucide-react';
import { faker } from '@faker-js/faker';

const generateInitialData = () => {
    const employees = Array.from({ length: 15 }, (_, i) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        return {
            id: `EMP${101 + i}`,
            name: `${firstName} ${lastName}`,
            avatar: faker.image.avatar(),
            department: faker.helpers.arrayElement(['Support', 'Engineering', 'Operations', 'Logistics', 'Maintenance']),
            location: faker.helpers.arrayElement(['Head Office', 'Warehouse A', 'Branch B', 'Service Center']),
            designation: faker.helpers.arrayElement(['Agent', 'Engineer', 'Operator', 'Technician', 'Supervisor']),
            category: faker.helpers.arrayElement(['Full-Time', 'Part-Time']),
            roasterName: null,
        };
    });

    const roasters = [
        {
            id: 1,
            name: 'Morning Support Team',
            employeeIds: ['EMP101', 'EMP102', 'EMP103'],
            fromDate: '2025-08-01',
            toDate: '2025-08-31',
            assignments: { 'EMP101': { '1': 'M' }, 'EMP102': { '1': 'M' }, 'EMP103': { '1': 'M' } }
        }
    ];

    roasters.forEach(roaster => {
        roaster.employeeIds.forEach(empId => {
            const emp = employees.find(e => e.id === empId);
            if (emp) {
                emp.roasterName = roaster.name;
            }
        });
    });

    return { employees, roasters };
};


const ShiftRoaster = () => {
    const [initialData] = useState(generateInitialData);
    const [employees, setEmployees] = useState(initialData.employees);
    const [roasters, setRoasters] = useState(initialData.roasters);
    
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentRoaster, setCurrentRoaster] = useState(null);

    const [selectedMonth, setSelectedMonth] = useState(new Date(2025, 7, 1));
    
    // Modal State
    const [roasterName, setRoasterName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedShifts, setSelectedShifts] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [calendarAssignments, setCalendarAssignments] = useState({});
    const [filters, setFilters] = useState({ department: [], location: [], designation: [], category: [] });
    const [searchTerm, setSearchTerm] = useState('');

    const shifts = [
        { name: 'Morning', code: 'M', color: 'badge-info' },
        { name: 'Afternoon', code: 'A', color: 'badge-success' },
        { name: 'Night', code: 'N', color: 'badge-error' },
        { name: 'General', code: 'G', color: 'badge-warning' },
        { name: 'Week Off', code: 'WO', color: 'badge-neutral' },
    ];

    const filterOptions = {
        department: [...new Set(employees.map(e => e.department))],
        location: [...new Set(employees.map(e => e.location))],
        designation: [...new Set(employees.map(e => e.designation))],
        category: [...new Set(employees.map(e => e.category))],
    };

    const handleOpenAddModal = () => {
        setIsEditMode(false);
        setCurrentRoaster(null);
        setRoasterName('');
        setFromDate('');
        setToDate('');
        setSelectedShifts([]);
        setSelectedEmployees([]);
        setCalendarAssignments({});
        setShowModal(true);
    };

    const handleOpenEditModal = () => {
        setIsEditMode(true);
        setCurrentRoaster(null);
        // Reset other fields until a roaster is selected from dropdown
        setRoasterName('');
        setFromDate('');
        setToDate('');
        setSelectedShifts([]);
        setSelectedEmployees([]);
        setCalendarAssignments({});
        setShowModal(true);
    };
    
    const handleEditRoasterSelect = (roasterId) => {
        const roasterToEdit = roasters.find(r => r.id === parseInt(roasterId));
        if (roasterToEdit) {
            setCurrentRoaster(roasterToEdit);
            setRoasterName(roasterToEdit.name);
            setFromDate(roasterToEdit.fromDate);
            setToDate(roasterToEdit.toDate);
            setSelectedEmployees(roasterToEdit.employeeIds);
            // This is a simplified load, a real app would reconstruct calendar state
            const initialAssignments = {};
            roasterToEdit.employeeIds.forEach(empId => {
                if(roasterToEdit.assignments[empId]){
                    Object.keys(roasterToEdit.assignments[empId]).forEach(day => {
                        const shiftCode = roasterToEdit.assignments[empId][day];
                        const shift = shifts.find(s => s.code === shiftCode);
                        if(shift) {
                             if (!initialAssignments[day]) initialAssignments[day] = [];
                             if (!initialAssignments[day].find(s => s.name === shift.name)) {
                                initialAssignments[day].push(shift);
                             }
                        }
                    });
                }
            });
            setCalendarAssignments(initialAssignments);
        }
    };


    const handleFilterChange = (filterType, value) => {
        setFilters(prev => {
            const currentValues = prev[filterType];
            if (currentValues.includes(value)) {
                return { ...prev, [filterType]: currentValues.filter(v => v !== value) };
            } else {
                return { ...prev, [filterType]: [...currentValues, value] };
            }
        });
    };

    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => {
            const matchesFilters = (
                (filters.department.length === 0 || filters.department.includes(emp.department)) &&
                (filters.location.length === 0 || filters.location.includes(emp.location)) &&
                (filters.designation.length === 0 || filters.designation.includes(emp.designation)) &&
                (filters.category.length === 0 || filters.category.includes(emp.category))
            );
            const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilters && matchesSearch;
        });
    }, [employees, filters, searchTerm]);

    const handleSaveRoaster = () => {
        if (!roasterName || selectedEmployees.length === 0) {
            alert('Please provide a roaster name and select at least one employee.');
            return;
        }

        const newAssignments = {};
        selectedEmployees.forEach(empId => {
            newAssignments[empId] = {};
            Object.keys(calendarAssignments).forEach(day => {
                const dayShifts = calendarAssignments[day];
                if (dayShifts && dayShifts.length > 0) {
                    newAssignments[empId][day] = dayShifts[0].code;
                }
            });
        });
        
        if (isEditMode && currentRoaster) {
            // Update existing roaster
            const updatedRoaster = { ...currentRoaster, name: roasterName, employeeIds: selectedEmployees, fromDate, toDate, assignments: newAssignments };
            setRoasters(roasters.map(r => r.id === currentRoaster.id ? updatedRoaster : r));
        } else {
            // Add new roaster
            const newRoaster = { id: Date.now(), name: roasterName, employeeIds: selectedEmployees, fromDate, toDate, assignments: newAssignments };
            setRoasters([...roasters, newRoaster]);
        }

        // Update employee's roasterName
        const updatedEmployees = employees.map(emp => {
            if (selectedEmployees.includes(emp.id)) {
                return { ...emp, roasterName: roasterName };
            }
            // If employee was in old roaster but not new one, clear their name
            if(currentRoaster && currentRoaster.employeeIds.includes(emp.id) && !selectedEmployees.includes(emp.id)){
                 return { ...emp, roasterName: null };
            }
            return emp;
        });
        setEmployees(updatedEmployees);

        setShowModal(false);
    };

    const daysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const getShiftForEmployeeAndDay = (employeeId, day) => {
        for (const roaster of roasters) {
            if (roaster.assignments[employeeId] && roaster.assignments[employeeId][day]) {
                const shiftCode = roaster.assignments[employeeId][day];
                const shift = shifts.find(s => s.code === shiftCode);
                return shift ? <span className={`badge ${shift.color} text-white`}>{shift.code}</span> : null;
            }
        }
        return <span className="text-gray-400">-</span>;
    };
    
    // Calendar logic for modal
    const calendarDays = useMemo(() => {
        if (!fromDate || !toDate) return [];
        const start = new Date(fromDate);
        const end = new Date(toDate);
        const days = [];
        let currentDate = start;
        while (currentDate <= end) {
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return days;
    }, [fromDate, toDate]);

    const handleDayClick = (day) => {
        if (selectedShifts.length === 0) return;
        const dayKey = day.getDate();
        setCalendarAssignments(prev => {
            const newAssignments = { ...prev };
            newAssignments[dayKey] = selectedShifts;
            return newAssignments;
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Shift Roaster</h1>
                <div className="flex items-center gap-4">
                    <input 
                        type="month" 
                        className="input input-bordered"
                        value={`${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`}
                        onChange={e => setSelectedMonth(new Date(e.target.value))}
                    />
                    <button onClick={handleOpenAddModal} className="btn btn-primary"><Plus size={16}/> Add Roaster</button>
                    <button onClick={handleOpenEditModal} className="btn btn-secondary"><Edit size={16}/> Edit Roaster</button>
                </div>
            </div>

            <div className="bg-base-100 shadow-lg border border-base-300 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-fixed w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th className="w-64 sticky left-0 bg-base-200 z-10">Employee</th>
                                {monthDays.map(day => (
                                    <th key={day} className="text-center w-20">
                                        <div>{String(day).padStart(2, '0')}</div>
                                        <div className="text-xs font-normal">{new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee.id} className="hover">
                                    <td className="sticky left-0 bg-base-100 z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10">
                                                    <img src={employee.avatar} alt={employee.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{employee.name}</div>
                                                <div className="text-sm opacity-70">{employee.designation}</div>
                                                {employee.roasterName && <div className="text-xs opacity-50 badge badge-ghost">{employee.roasterName}</div>}
                                            </div>
                                        </div>
                                    </td>
                                    {monthDays.map(day => (
                                        <td key={day} className="text-center border-l">
                                            {getShiftForEmployeeAndDay(employee.id, day)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-7xl">
                        <h3 className="font-bold text-lg">{isEditMode ? 'Edit Shift Roaster' : 'Add Shift Roaster'}</h3>
                        
                        {isEditMode && (
                             <div className="form-control mt-4">
                                <label className="label"><span className="label-text">Select Roaster to Edit</span></label>
                                <select className="select select-bordered" onChange={(e) => handleEditRoasterSelect(e.target.value)}>
                                    <option value="">Select a roaster</option>
                                    {roasters.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                </select>
                            </div>
                        )}

                        <div className="form-control mt-4">
                            <label className="label"><span className="label-text">Roaster Name</span></label>
                            <input type="text" placeholder="e.g., August Support Team" className="input input-bordered" value={roasterName} onChange={e => setRoasterName(e.target.value)} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                            {/* Left: Shift & Calendar */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="form-control w-1/2">
                                        <label className="label"><span className="label-text">From Date</span></label>
                                        <input type="date" className="input input-bordered" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                                    </div>
                                    <div className="form-control w-1/2">
                                        <label className="label"><span className="label-text">To Date</span></label>
                                        <input type="date" className="input input-bordered" value={toDate} onChange={e => setToDate(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Select Shifts to Assign</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {shifts.map(shift => (
                                            <button key={shift.name} 
                                                className={`btn btn-sm ${selectedShifts.find(s => s.name === shift.name) ? 'btn-active' : ''}`}
                                                onClick={() => setSelectedShifts(prev => prev.find(s => s.name === shift.name) ? prev.filter(s => s.name !== shift.name) : [...prev, shift])}
                                            >
                                                <span className={`badge ${shift.color} mr-2`}></span> {shift.name} ({shift.code})
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-72 overflow-y-auto border rounded-lg p-2">
                                    <div className="grid grid-cols-7 gap-1">
                                        {calendarDays.map(day => {
                                            const dayKey = day.getDate();
                                            const assigned = calendarAssignments[dayKey];
                                            return (
                                                <div key={day.toISOString()} onClick={() => handleDayClick(day)} className="border rounded h-20 p-1 cursor-pointer hover:bg-base-200">
                                                    <div className="text-xs font-semibold">{day.getDate()}</div>
                                                    <div className="flex flex-col items-center mt-1 gap-1">
                                                        {assigned && assigned.map(s => <span key={s.name} className={`badge badge-xs ${s.color}`}></span>)}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            {/* Right: Employee Selection */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.keys(filterOptions).map(key => (
                                        <div key={key} className="dropdown">
                                            <label tabIndex={0} className="btn btn-block btn-sm justify-between">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                                {filters[key].length > 0 && <span className="badge badge-secondary">+{filters[key].length}</span>}
                                                <ChevronDown size={16} />
                                            </label>
                                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-20">
                                                {filterOptions[key].map(option => (
                                                    <li key={option}>
                                                        <label className="label cursor-pointer">
                                                            <span className="label-text">{option}</span>
                                                            <input type="checkbox" className="checkbox checkbox-sm" checked={filters[key].includes(option)} onChange={() => handleFilterChange(key, option)} />
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                <div className="form-control">
                                    <input type="text" placeholder="Search employee by name..." className="input input-bordered" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                                </div>
                                <div className="h-80 overflow-y-auto border rounded-lg p-2">
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text font-semibold">Select All</span>
                                            <input type="checkbox" className="checkbox" onChange={(e) => setSelectedEmployees(e.target.checked ? filteredEmployees.map(emp => emp.id) : [])} />
                                        </label>
                                    </div>
                                    {filteredEmployees.map(emp => (
                                        <div key={emp.id} className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">{emp.name} {emp.roasterName && emp.roasterName !== roasterName && <span className="badge badge-xs badge-warning ml-2">{emp.roasterName}</span>}</span>
                                                <input type="checkbox" className="checkbox" checked={selectedEmployees.includes(emp.id)} onChange={() => setSelectedEmployees(prev => prev.includes(emp.id) ? prev.filter(id => id !== emp.id) : [...prev, emp.id])} />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSaveRoaster}>Save Roaster</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShiftRoaster;
