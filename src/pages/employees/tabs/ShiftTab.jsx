import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { faker } from '@faker-js/faker';

const shifts = [
    { name: 'Morning', color: 'bg-blue-500' },
    { name: 'Evening', color: 'bg-orange-500' },
    { name: 'Night', color: 'bg-indigo-500' },
    { name: 'General', color: 'bg-gray-500' },
    { name: 'Week Off', color: 'bg-green-500' },
];

const ShiftTab = ({ employee }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [weekOffs, setWeekOffs] = useState({ 1: false, 2: true, 3: false, 4: true });
    const [shiftAssignments, setShiftAssignments] = useState({});
    const [showShiftModal, setShowShiftModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        // Generate unique shift data for the employee
        const assignments = {};
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dayOfWeek = date.getDay(); // 0 = Sun, 6 = Sat
            
            if (dayOfWeek === 0) { // Sunday
                assignments[day] = 'Week Off';
            } else if (dayOfWeek === 6) { // Saturday
                const weekOfMonth = Math.ceil(day / 7);
                if (weekOffs[weekOfMonth]) {
                    assignments[day] = 'Week Off';
                } else {
                    assignments[day] = 'General';
                }
            } else {
                assignments[day] = faker.helpers.arrayElement(['Morning', 'Evening', 'Night', 'General']);
            }
        }
        setShiftAssignments(assignments);
    }, [employee.id, currentDate, weekOffs]);

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setShowShiftModal(true);
    };

    const handleShiftSelect = (shiftName) => {
        setShiftAssignments(prev => ({ ...prev, [selectedDay]: shiftName }));
        setShowShiftModal(false);
    };

    const calendarDays = useMemo(() => {
        const days = [];
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Adjust for Sunday start
        const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="border rounded-lg"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const shiftName = shiftAssignments[day] || 'General';
            const shift = shifts.find(s => s.name === shiftName);
            days.push(
                <div key={day} className="border rounded-lg p-2 cursor-pointer hover:bg-base-200" onClick={() => handleDayClick(day)}>
                    <div className="font-semibold">{day}</div>
                    <div className={`badge text-white text-xs ${shift?.color}`}>{shiftName}</div>
                </div>
            );
        }
        return days;
    }, [currentDate, shiftAssignments]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Panel */}
            <div className="md:col-span-1">
                <h4 className="text-lg font-semibold mb-4">Shift Settings</h4>
                <div className="card bg-base-200 p-4">
                    <h5 className="font-semibold mb-2">Weekly Off Settings</h5>
                    <div className="space-y-2">
                        {[1, 2, 3, 4].map(week => (
                            <div key={week} className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">{week}{week === 1 ? 'st' : week === 2 ? 'nd' : week === 3 ? 'rd' : 'th'} Saturday Week Off</span>
                                    <input type="checkbox" className="toggle toggle-primary" checked={weekOffs[week]} onChange={() => setWeekOffs(prev => ({...prev, [week]: !prev[week]}))} />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                    <button className="btn btn-ghost btn-sm" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}><ChevronLeft /></button>
                    <h4 className="text-lg font-semibold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
                    <button className="btn btn-ghost btn-sm" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}><ChevronRight /></button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold mb-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <div key={day}>{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {calendarDays}
                </div>
            </div>

            {/* Shift Selection Modal */}
            {showShiftModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Assign Shift for {selectedDay} {currentDate.toLocaleString('default', { month: 'long' })}</h3>
                        <div className="py-4 space-y-2">
                            {shifts.map(shift => (
                                <button key={shift.name} className="btn btn-block" onClick={() => handleShiftSelect(shift.name)}>
                                    <span className={`w-4 h-4 rounded-full ${shift.color}`}></span>
                                    {shift.name}
                                </button>
                            ))}
                        </div>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setShowShiftModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShiftTab;
