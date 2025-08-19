import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Award, Calendar, BarChart3, DollarSign, FileText, Users, TrendingUp, History, ClipboardList, ShieldCheck } from 'lucide-react';

// Import all performance appraisal components
import AppraisalCycles from './performance-appraisals/AppraisalCycles';
import KRAMaster from './performance-appraisals/KRAMaster';
import AppraisalTemplate from './performance-appraisals/AppraisalTemplate';
import SelfAssessment from './performance-appraisals/SelfAssessment';
import ManagerReview from './performance-appraisals/ManagerReview';
import HRFinalization from './performance-appraisals/HRFinalization';
import SalaryRevisions from './performance-appraisals/SalaryRevisions';
import IncrementLetter from './performance-appraisals/IncrementLetter';
import AppraisalHistory from './performance-appraisals/AppraisalHistory';

const PerformanceAppraisals = () => {
  const location = useLocation();
  
  const isExactPath = location.pathname === '/performance-appraisals' || location.pathname === '/performance-appraisals/';

  if (!isExactPath) {
    return (
      <Routes>
        <Route path="/cycles" element={<AppraisalCycles />} />
        <Route path="/kra-master" element={<KRAMaster />} />
        <Route path="/template" element={<AppraisalTemplate />} />
        <Route path="/self-review" element={<SelfAssessment />} />
        <Route path="/manager-review" element={<ManagerReview />} />
        <Route path="/hr-finalization" element={<HRFinalization />} />
        <Route path="/salary-revisions" element={<SalaryRevisions />} />
        <Route path="/increment-letters" element={<IncrementLetter />} />
        <Route path="/history" element={<AppraisalHistory />} />
      </Routes>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Award size={24} className="text-primary" />
        <h1 className="text-2xl font-bold">Performance Appraisals</h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Users size={20} className="text-primary" />
              <h3 className="text-lg font-semibold">Total Employees Reviewed</h3>
            </div>
            <div className="text-3xl font-bold text-primary">124</div>
            <p className="text-sm text-base-content/70 mt-2">Out of 156 employees</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={20} className="text-warning" />
              <h3 className="text-lg font-semibold">Pending Manager Reviews</h3>
            </div>
            <div className="text-3xl font-bold text-warning">32</div>
            <p className="text-sm text-base-content/70 mt-2">Requires immediate attention</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp size={20} className="text-success" />
              <h3 className="text-lg font-semibold">Appraisal Completion Rate</h3>
            </div>
            <div className="text-3xl font-bold text-success">79%</div>
            <p className="text-sm text-base-content/70 mt-2">Current cycle progress</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign size={20} className="text-secondary" />
              <h3 className="text-lg font-semibold">Salary Revision Approvals</h3>
            </div>
            <div className="text-3xl font-bold text-secondary">18</div>
            <p className="text-sm text-base-content/70 mt-2">Pending HR approval</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/performance-appraisals/cycles" className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-3">
              <Calendar size={24} className="text-primary" />
              <h3 className="card-title">Appraisal Cycles</h3>
            </div>
            <p className="text-base-content/70">Manage appraisal cycles, setup new reviews, and configure scoring models.</p>
          </div>
        </Link>
        <Link to="/performance-appraisals/kra-master" className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-3">
              <FileText size={24} className="text-success" />
              <h3 className="card-title">KRA/KPI Master</h3>
            </div>
            <p className="text-base-content/70">Define key result areas and performance indicators for different roles.</p>
          </div>
        </Link>
        <Link to="/performance-appraisals/template" className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-3">
              <ClipboardList size={24} className="text-info" />
              <h3 className="card-title">Appraisal Templates</h3>
            </div>
            <p className="text-base-content/70">Create and manage appraisal templates with custom workflows.</p>
          </div>
        </Link>
        <Link to="/performance-appraisals/manager-review" className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-3">
              <Award size={24} className="text-secondary" />
              <h3 className="card-title">Manager Review</h3>
            </div>
            <p className="text-base-content/70">Review team member performance and provide manager feedback.</p>
          </div>
        </Link>
        <Link to="/performance-appraisals/salary-revisions" className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign size={24} className="text-success" />
              <h3 className="card-title">Salary Revisions</h3>
            </div>
            <p className="text-base-content/70">Manage salary increases and compensation adjustments.</p>
          </div>
        </Link>
        <Link to="/reports-analytics/audit-logs" className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck size={24} className="text-error" />
              <h3 className="card-title">Audit Logs</h3>
            </div>
            <p className="text-base-content/70">Track all changes and approvals related to salary revisions.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PerformanceAppraisals;
