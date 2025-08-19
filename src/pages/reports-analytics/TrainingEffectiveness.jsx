import React from 'react';
import { Filter, TrendingUp } from 'lucide-react';

const TrainingEffectiveness = () => {
  const data = [
    { emp: 'John Doe', dept: 'IT', training: 'React Advanced', trainer: 'John Smith', date: '2025-01-20', feedback: 4.8, before: 3.5, after: 4.1, improvement: 17, comments: 'Showed marked improvement in component design.' },
    { emp: 'Jane Smith', dept: 'IT', training: 'React Advanced', trainer: 'John Smith', date: '2025-01-20', feedback: 4.5, before: 3.2, after: 3.9, improvement: 21, comments: 'Faster development turnaround after training.' },
    { emp: 'Emily White', dept: 'Sales', training: 'Negotiation', trainer: 'External Consultant', date: '2025-02-10', feedback: 4.9, before: 4.0, after: 4.5, improvement: 12.5, comments: 'Closed two major deals post-training.' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Training Effectiveness Report</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <h2 className="card-title">Effectiveness Analysis</h2>
            <div className="flex flex-wrap gap-2">
              <select className="select select-bordered select-sm"><option>All Trainings</option></select>
              <select className="select select-bordered select-sm"><option>All Departments</option></select>
              <button className="btn btn-sm btn-ghost"><Filter size={16} /> Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Training Name</th>
                  <th>Trainer Name</th>
                  <th>Training Date</th>
                  <th>Feedback Score (Avg.)</th>
                  <th>Appraisal Score (Before)</th>
                  <th>Appraisal Score (After)</th>
                  <th>Improvement %</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    <td>{row.emp}</td>
                    <td>{row.dept}</td>
                    <td>{row.training}</td>
                    <td>{row.trainer}</td>
                    <td>{row.date}</td>
                    <td><div className="badge badge-info">{row.feedback}/5</div></td>
                    <td>{row.before}</td>
                    <td>{row.after}</td>
                    <td>
                      <div className="flex items-center gap-1 text-success">
                        <TrendingUp size={16} />
                        {row.improvement}%
                      </div>
                    </td>
                    <td className="text-xs max-w-xs truncate" title={row.comments}>{row.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingEffectiveness;
