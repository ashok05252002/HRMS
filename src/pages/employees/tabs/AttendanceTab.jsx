import React from 'react';

const AttendanceTab = ({ employee }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Attendance Records for {employee.name}</h3>
            <p>Attendance records will be displayed here.</p>
        </div>
    );
};

export default AttendanceTab;
