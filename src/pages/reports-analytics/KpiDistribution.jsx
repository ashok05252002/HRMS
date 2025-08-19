import React from 'react';
import { Filter } from 'lucide-react';

const KpiDistribution = () => {
  const data = [
    { kpi: 'Technical Excellence', emp: 'John Doe', dept: 'IT', weight: 30, score: 4, rating: 'Exceeds Expectations', reviewer: 'Manager', comments: 'Consistently delivers high-quality, scalable code.' },
    { kpi: 'Team Collaboration', emp: 'Jane Smith', dept: 'IT', weight: 25, score: 5, rating: 'Outstanding', reviewer: 'Manager', comments: 'Excellent team player, always ready to help.' },
    { kpi: 'Sales Targets', emp: 'Emily White', dept: 'Sales', weight: 40, score: 3, rating: 'Meets Expectations', reviewer: 'Manager', comments: 'Achieved 95% of the quarterly sales target.' },
    { kpi: 'Innovation', emp: 'Mike Johnson', dept: 'Design', weight: 20, score: 4, rating: 'Exceeds Expectations', reviewer: 'Manager', comments: 'Brought fresh ideas to the new project.' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">KRA/KPI-wise Performance Distribution</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <h2 className="card-title">Distribution</h2>
            <div className="flex flex-wrap gap-2">
              <select className="select select-bordered select-sm"><option>All KRAs</option></select>
              <select className="select select-bordered select-sm"><option>All Departments</option></select>
              <button className="btn btn-sm btn-ghost"><Filter size={16} /> Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>KRA/KPI Name</th>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Assigned Weight %</th>
                  <th>Score Given</th>
                  <th>Rating</th>
                  <th>Reviewer</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    <td className="font-semibold">{row.kpi}</td>
                    <td>{row.emp}</td>
                    <td>{row.dept}</td>
                    <td><div className="badge badge-primary">{row.weight}%</div></td>
                    <td><div className="badge badge-info">{row.score}/5</div></td>
                    <td><div className="badge badge-ghost">{row.rating}</div></td>
                    <td>{row.reviewer}</td>
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

export default KpiDistribution;
