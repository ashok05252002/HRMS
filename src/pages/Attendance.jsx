import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Hand, Calendar, Clock } from 'lucide-react';
import PunchRequests from './attendance/PunchRequests';

const Attendance = () => {
  const location = useLocation();
  const isExactPath = location.pathname === '/attendance' || location.pathname === '/attendance/';

  if (!isExactPath) {
    return (
      <Routes>
        <Route path="/punch-requests" element={<PunchRequests />} />
      </Routes>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock size={24} className="text-primary" />
        <h1 className="text-2xl font-bold">Attendance</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/attendance/punch-requests" className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-3">
              <Hand size={24} className="text-primary" />
              <h3 className="card-title">Punch Requests</h3>
            </div>
            <p className="text-base-content/70">Review and approve manual attendance requests.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Attendance;
