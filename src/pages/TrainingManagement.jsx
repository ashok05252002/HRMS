import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Calendar, Users, Star, Award, BarChart3, UserCheck, ClipboardList, Map, FileSignature, UserPlus } from 'lucide-react';

// Import training management components
import TrainingMaster from './training-management/TrainingMaster';
import TrainingCalendar from './training-management/TrainingCalendar';
import TrainerManagement from './training-management/TrainerManagement';
import EnrollmentNomination from './training-management/EnrollmentNomination';
import TrainingFeedback from './training-management/TrainingFeedback';
import CertificateGenerator from './training-management/CertificateGenerator';

const TrainingManagement = () => {
  const location = useLocation();
  
  const isExactPath = location.pathname === '/training-management' || location.pathname === '/training-management/';

  if (!isExactPath) {
    return (
      <Routes>
        <Route path="/master" element={<TrainingMaster />} />
        <Route path="/calendar" element={<TrainingCalendar />} />
        <Route path="/trainers" element={<TrainerManagement />} />
        <Route path="/enrollment" element={<EnrollmentNomination />} />
        <Route path="/feedback" element={<TrainingFeedback />} />
        <Route path="/certificates" element={<CertificateGenerator />} />
      </Routes>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen size={24} className="text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Training Management</h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Upcoming Trainings</h3>
            </div>
            <div className="text-3xl font-bold text-blue-600">12</div>
            <p className="text-sm text-gray-500 mt-2">This month</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Users size={20} className="text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Training Attendance Rate</h3>
            </div>
            <div className="text-3xl font-bold text-green-600">87%</div>
            <p className="text-sm text-gray-500 mt-2">Average attendance</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Star size={20} className="text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-800">Training Effectiveness</h3>
            </div>
            <div className="text-3xl font-bold text-yellow-600">4.3</div>
            <p className="text-sm text-gray-500 mt-2">Out of 5.0</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Award size={20} className="text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">Certificates Issued</h3>
            </div>
            <div className="text-3xl font-bold text-purple-600">248</div>
            <p className="text-sm text-gray-500 mt-2">This quarter</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/training-management/master" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-3">
              <ClipboardList size={24} className="text-blue-600" />
              <h3 className="card-title">Training Master</h3>
            </div>
            <p className="text-gray-600">Manage training programs and learning modules.</p>
          </div>
        </Link>
        <Link to="/training-management/calendar" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-3">
              <Calendar size={24} className="text-green-600" />
              <h3 className="card-title">Training Calendar</h3>
            </div>
            <p className="text-gray-600">Schedule sessions and manage enrollments.</p>
          </div>
        </Link>
        <Link to="/training-management/enrollment" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-3">
              <UserPlus size={24} className="text-teal-600" />
              <h3 className="card-title">Enrollment & Nomination</h3>
            </div>
            <p className="text-gray-600">Manage employee nominations and enrollments.</p>
          </div>
        </Link>
        <Link to="/training-management/trainers" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-3">
              <UserCheck size={24} className="text-orange-600" />
              <h3 className="card-title">Trainer Management</h3>
            </div>
            <p className="text-gray-600">Manage internal and external trainers.</p>
          </div>
        </Link>
        <Link to="/training-management/certificates" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-3">
              <FileSignature size={24} className="text-indigo-600" />
              <h3 className="card-title">Certificates</h3>
            </div>
            <p className="text-gray-600">Generate and manage completion certificates.</p>
          </div>
        </Link>
        <Link to="/reports-analytics" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 size={24} className="text-red-600" />
              <h3 className="card-title">Training Reports</h3>
            </div>
            <p className="text-gray-600">View analytics and generate detailed reports.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TrainingManagement;
