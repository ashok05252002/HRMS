import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6)); // July 2025

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      let dayClass = 'p-2 text-center text-sm hover:bg-base-200 rounded relative';
      let marker = null;

      // Add special markers for specific days
      if (day === 8) {
        marker = <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>;
      } else if (day === 15) {
        marker = <div className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></div>;
      } else if (day === 22) {
        marker = <div className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></div>;
      }

      days.push(
        <div key={day} className={dayClass}>
          {day}
          {marker}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-base-100 rounded-lg shadow-sm border border-base-300 p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigateMonth(-1)} className="p-1 hover:bg-base-200 rounded">
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button onClick={() => navigateMonth(1)} className="p-1 hover:bg-base-200 rounded">
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-xs text-base-content/70 text-center font-medium p-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-secondary rounded-full"></div>
          <span className="text-base-content/80">Holiday</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-base-content/80">Weekoff</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-warning rounded-full"></div>
          <span className="text-base-content/80">Leave</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
