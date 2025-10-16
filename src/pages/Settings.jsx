import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { SlidersHorizontal, Shield, Bell, Calendar, Star, Users, DollarSign, MessageSquare, History, CalendarDays, FileText } from 'lucide-react';

import AppraisalPeriodSetup from './settings/AppraisalPeriodSetup';
import ScoringModelsSetup from './settings/ScoringModelsSetup';
import ReviewerHierarchy from './settings/ReviewerHierarchy';
import IncrementRuleEngine from './settings/IncrementRuleEngine';
import FeedbackFormBuilder from './settings/FeedbackFormBuilder';
import NotificationRules from './settings/NotificationRules';
import AccessControl from './settings/AccessControl';
import AuditLogging from './settings/AuditLogging';
import ShiftRoaster from './settings/ShiftRoaster';
import PayslipGenerator from './settings/PayslipGenerator';

const Settings = () => {
  const location = useLocation();
  const isExactPath = location.pathname === '/settings' || location.pathname === '/settings/';

  if (!isExactPath) {
    return (
      <Routes>
        <Route path="/appraisal-periods" element={<AppraisalPeriodSetup />} />
        <Route path="/scoring-models" element={<ScoringModelsSetup />} />
        <Route path="/reviewer-hierarchy" element={<ReviewerHierarchy />} />
        <Route path="/increment-rules" element={<IncrementRuleEngine />} />
        <Route path="/feedback-forms" element={<FeedbackFormBuilder />} />
        <Route path="/notification-rules" element={<NotificationRules />} />
        <Route path="/access-control" element={<AccessControl />} />
        <Route path="/audit-logging" element={<AuditLogging />} />
        <Route path="/shift-roaster" element={<ShiftRoaster />} />
        <Route path="/payslip-generator" element={<PayslipGenerator />} />
      </Routes>
    );
  }

  const settingsCards = [
    { title: 'Appraisal Periods', icon: Calendar, desc: 'Create and manage appraisal cycles.', path: '/settings/appraisal-periods' },
    { title: 'Scoring Models', icon: Star, desc: 'Define how employee performance is scored.', path: '/settings/scoring-models' },
    { title: 'Reviewer Hierarchy', icon: Users, desc: 'Define review sequences and workflows.', path: '/settings/reviewer-hierarchy' },
    { title: 'Increment Rules', icon: DollarSign, desc: 'Automate increment calculations based on scores.', path: '/settings/increment-rules' },
    { title: 'Shift Roaster', icon: CalendarDays, desc: 'Create and manage employee shift roasters.', path: '/settings/shift-roaster' },
    { title: 'Payslip Generator', icon: FileText, desc: 'Generate and manage employee payslips.', path: '/settings/payslip-generator' },
    { title: 'Feedback Forms', icon: MessageSquare, desc: 'Build custom evaluation and feedback forms.', path: '/settings/feedback-forms' },
    { title: 'Notification Rules', icon: Bell, desc: 'Configure automated alerts for all modules.', path: '/settings/notification-rules' },
    { title: 'Access Control (RBAC)', icon: Shield, desc: 'Manage user roles and permissions.', path: '/settings/access-control' },
    { title: 'Audit & Logging', icon: History, desc: 'Configure system-wide logging.', path: '/settings/audit-logging' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <SlidersHorizontal size={24} className="text-primary" />
        <h1 className="text-2xl font-bold">Settings & Configuration</h1>
      </div>
      <p className="text-base-content/70">Manage application-wide settings and configurations for all modules.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCards.map((card, index) => (
          <Link key={index} to={card.path} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <card.icon size={24} className="text-primary" />
                <h3 className="card-title">{card.title}</h3>
              </div>
              <p className="text-base-content/70">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Settings;
