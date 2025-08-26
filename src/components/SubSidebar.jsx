import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    X, 
    Calendar, 
    ClipboardList, 
    UserCheck, 
    UserPlus, 
    MessageSquare, 
    Award,
    DollarSign,
    FileText,
    Users as UsersIcon,
    Bell,
    FilePlus2,
    FileSpreadsheet,
    Shield,
    Clock,
    UserCircle,
    Edit,
    BookUser,
    Building,
    Timer,
    FileClock,
    FileCog,
    History,
    TrendingUp,
    PieChart,
    CheckSquare,
    Star,
    SlidersHorizontal,
    Cog,
    CalendarDays,
    Hand,
    Users
} from 'lucide-react';

const SubSidebar = ({ menu, onClose }) => {
  const location = useLocation();

  const menuData = {
    '/employees': [
        { label: 'Employees List', path: '/employees', icon: Users },
        { label: 'Employee Policy', path: '/employees/policy', icon: FileCog },
    ],
    '/performance-appraisals': [
        { label: 'Appraisal Cycles', path: '/performance-appraisals/cycles', icon: Calendar },
        { label: 'KRA/KPI Master', path: '/performance-appraisals/kra-master', icon: FileText },
        { label: 'Appraisal Templates', path: '/performance-appraisals/template', icon: ClipboardList },
        { label: 'Self Assessment', path: '/performance-appraisals/self-review', icon: Edit },
        { label: 'Manager Review', path: '/performance-appraisals/manager-review', icon: UserCheck },
        { label: 'HR Finalization', path: '/performance-appraisals/hr-finalization', icon: CheckSquare },
        { label: 'Salary Revisions', path: '/performance-appraisals/salary-revisions', icon: DollarSign },
        { label: 'Increment Letters', path: '/performance-appraisals/increment-letters', icon: FileText },
        { label: 'Appraisal History', path: '/performance-appraisals/history', icon: History },
    ],
    '/attendance': [
        { label: 'Punch Requests', path: '/attendance/punch-requests', icon: Hand },
    ],
    '/training-management': [
        { label: 'Training Master', path: '/training-management/master', icon: ClipboardList },
        { label: 'Training Calendar', path: '/training-management/calendar', icon: Calendar },
        { label: 'Trainer Management', path: '/training-management/trainers', icon: UserCheck },
        { label: 'Enrollment/Nomination', path: '/training-management/enrollment', icon: UserPlus },
        { label: 'Feedback Forms', path: '/training-management/feedback', icon: MessageSquare },
        { label: 'Certificates', path: '/training-management/certificates', icon: Award },
    ],
    '/reports-analytics': [
        { label: 'Performance Summary', path: '/reports-analytics/performance-summary', icon: PieChart },
        { label: 'KRA/KPI Distribution', path: '/reports-analytics/kpi-distribution', icon: TrendingUp },
        { label: 'Appraisal Tracker', path: '/reports-analytics/appraisal-tracker', icon: FileClock },
        { label: 'Training Effectiveness', path: '/reports-analytics/training-effectiveness', icon: ClipboardList },
        { label: 'Cost vs. Benefit', path: '/reports-analytics/cost-benefit', icon: DollarSign },
        { label: 'Skill Gap Matrix', path: '/reports-analytics/skill-gap', icon: UsersIcon },
        { label: 'Employee Self-Service', path: '/reports-analytics/employee-self-service', icon: UserCircle },
        { label: 'Report Builder', path: '/reports-analytics/builder', icon: FilePlus2 },
        { label: 'TDS Compliance (24Q)', path: '/reports-analytics/tds-compliance-24q', icon: FileSpreadsheet },
        { label: 'Form 16 Report', path: '/reports-analytics/form-16-report', icon: FileSpreadsheet },
        { label: 'Audit Logs', path: '/reports-analytics/audit-logs', icon: Shield },
    ],
    '/settings': [
        { label: 'Appraisal Periods', path: '/settings/appraisal-periods', icon: Calendar },
        { label: 'Scoring Models', path: '/settings/scoring-models', icon: Star },
        { label: 'Reviewer Hierarchy', path: '/settings/reviewer-hierarchy', icon: UsersIcon },
        { label: 'Increment Rules', path: '/settings/increment-rules', icon: DollarSign },
        { label: 'Shift Roaster', path: '/settings/shift-roaster', icon: CalendarDays },
        { label: 'Feedback Forms', path: '/settings/feedback-forms', icon: MessageSquare },
        { label: 'Notification Rules', path: '/settings/notification-rules', icon: Bell },
        { label: 'Access Control (RBAC)', path: '/settings/access-control', icon: Shield },
        { label: 'Audit & Logging', path: '/settings/audit-logging', icon: History },
    ]
  };

  const submenuItems = menu ? menuData[menu.path] : null;

  if (!menu || !submenuItems) return null;

  const isActiveRoute = (path) => {
    if (path === '/employees') return location.pathname === '/employees' || location.pathname === '/employees/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="fixed left-24 top-16 h-[calc(100vh-4rem)] bg-base-100 border-r border-base-300 w-64 z-30 transform transition-transform duration-300 animate-in slide-in-from-left-4">
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-base-300">
          <h2 className="text-lg font-semibold">{menu.label}</h2>
          <button onClick={onClose} className="p-2 hover:bg-base-200 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <nav className="space-y-1 flex-1 overflow-y-auto">
          {submenuItems.map((subItem) => (
            <Link
              key={subItem.path}
              to={subItem.path}
              className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                isActiveRoute(subItem.path)
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-base-content/80 hover:bg-base-200'
              }`}
            >
              {subItem.icon && <subItem.icon size={16} className="mr-3 flex-shrink-0" />}
              <span>{subItem.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SubSidebar;
