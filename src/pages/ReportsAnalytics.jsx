import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { BarChart3, Users, DollarSign, ClipboardList, ShieldCheck, UserCircle, FilePlus2, FileSpreadsheet, PieChart, TrendingUp, FileClock } from 'lucide-react';

// Import report components
import PerformanceSummary from './reports-analytics/PerformanceSummary';
import KpiDistribution from './reports-analytics/KpiDistribution';
import AppraisalTracker from './reports-analytics/AppraisalTracker';
import TrainingEffectiveness from './reports-analytics/TrainingEffectiveness';
import CostBenefitAnalysis from './reports-analytics/CostBenefitAnalysis';
import SkillGapMatrix from './reports-analytics/SkillGapMatrix';
import AuditLogs from './reports-analytics/AuditLogs';
import EmployeeSelfService from './reports-analytics/EmployeeSelfService';
import TdsCompliance from './reports-analytics/TdsCompliance';
import Form16Report from './reports-analytics/Form16Report';
// Import Report Builder components
import ReportBuilder from './reports-analytics/ReportBuilder';
import CreateReport from './reports-analytics/CreateReport';
import PreviewReport from './reports-analytics/PreviewReport';

const ReportsAnalytics = () => {
  const location = useLocation();
  const isExactPath = location.pathname === '/reports-analytics' || location.pathname === '/reports-analytics/';

  if (!isExactPath) {
    return (
      <Routes>
        <Route path="/performance-summary" element={<PerformanceSummary />} />
        <Route path="/kpi-distribution" element={<KpiDistribution />} />
        <Route path="/appraisal-tracker" element={<AppraisalTracker />} />
        <Route path="/training-effectiveness" element={<TrainingEffectiveness />} />
        <Route path="/cost-benefit" element={<CostBenefitAnalysis />} />
        <Route path="/skill-gap" element={<SkillGapMatrix />} />
        <Route path="/employee-self-service" element={<EmployeeSelfService />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
        <Route path="/tds-compliance-24q/*" element={<TdsCompliance />} />
        <Route path="/form-16-report" element={<Form16Report />} />
        {/* Report Builder Routes */}
        <Route path="/builder" element={<ReportBuilder />} />
        <Route path="/builder/create" element={<CreateReport />} />
        <Route path="/builder/preview" element={<PreviewReport />} />
      </Routes>
    );
  }

  const reports = [
    { title: 'Performance Summary', icon: PieChart, desc: 'View department-wise performance metrics.', path: '/reports-analytics/performance-summary' },
    { title: 'KRA/KPI Distribution', icon: TrendingUp, desc: 'Analyze performance across different KRAs.', path: '/reports-analytics/kpi-distribution' },
    { title: 'Appraisal Tracker', icon: FileClock, desc: 'Track the status of ongoing appraisals.', path: '/reports-analytics/appraisal-tracker' },
    { title: 'Training Effectiveness', icon: ClipboardList, desc: 'Measure impact of training on performance.', path: '/reports-analytics/training-effectiveness' },
    { title: 'Cost vs. Benefit', icon: DollarSign, desc: 'Analyze training ROI and budget.', path: '/reports-analytics/cost-benefit' },
    { title: 'Skill Gap Matrix', icon: Users, desc: 'Identify skill gaps across the organization.', path: '/reports-analytics/skill-gap' },
    { title: 'Employee Self-Service', icon: UserCircle, desc: 'Preview the features available to employees.', path: '/reports-analytics/employee-self-service' },
    { title: 'Report Builder', icon: FilePlus2, desc: 'Build and save your own custom reports.', path: '/reports-analytics/builder' },
    { title: 'TDS Compliance (24Q)', icon: FileSpreadsheet, desc: 'Manage quarterly TDS filings for salaries.', path: '/reports-analytics/tds-compliance-24q' },
    { title: 'Form 16 Report', icon: FileSpreadsheet, desc: 'Generate and publish Form 16 for employees.', path: '/reports-analytics/form-16-report' },
    { title: 'Audit Logs', icon: ShieldCheck, desc: 'Review all system changes and approvals.', path: '/reports-analytics/audit-logs' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 size={24} className="text-primary" />
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
      </div>
      <p className="text-base-content/70">Select a report to view detailed analytics and insights.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <Link key={index} to={report.path} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <report.icon size={24} className="text-primary" />
                <h3 className="card-title">{report.title}</h3>
              </div>
              <p className="text-base-content/70">{report.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReportsAnalytics;
