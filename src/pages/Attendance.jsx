import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PunchRequests from './attendance/PunchRequests';

const Attendance = () => {
  return (
    <Routes>
      <Route path="/punch-requests" element={<PunchRequests />} />
      <Route path="/" element={<PunchRequests />} />
    </Routes>
  );
};

export default Attendance;
