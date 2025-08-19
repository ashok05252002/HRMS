import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, DollarSign, Users, Target, ClipboardList, SlidersHorizontal } from 'lucide-react';

const TrainingReports = () => {
  const reports = [
    { title: 'Training Effectiveness', icon: Target, desc: 'Analyze pre and post-training performance.', path: '#' },
    { title: 'Cost vs. Benefit Analysis', icon: DollarSign, desc: 'Evaluate training ROI and budget utilization.', path: '#' },
    { title: 'Skill Gap Matrix', icon: Users, desc: 'Identify skill gaps across departments and roles.', path: '/training-management/skill-mapping' },
    { title: 'Appraisal Completion Tracker', icon: ClipboardList, desc: 'Monitor the progress of appraisal cycles.', path: '/performance-appraisals/history' },
    { title: 'Custom Filtered Report', icon: SlidersHorizontal, desc: 'Generate on-demand reports with custom filters.', path: '#' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 size={24} className="text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
      </div>
      <p className="text-gray-600">Select a report to view detailed analytics and insights.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <Link key={index} to={report.path} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <report.icon size={24} className="text-blue-600" />
                <h3 className="card-title">{report.title}</h3>
              </div>
              <p className="text-gray-600">{report.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrainingReports;
