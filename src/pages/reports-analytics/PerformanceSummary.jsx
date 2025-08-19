import React from 'react';
import { Filter } from 'lucide-react';

const PerformanceSummary = () => {
  const data = [
    { dept: 'Sales', employees: 25, avgScore: 4.2, avgRating: 'Exceeds Expectations', high: 5, low: 1, completion: 95, distribution: { excellent: 5, good: 15, avg: 4, poor: 1 } },
    { dept: 'IT', employees: 40, avgScore: 4.5, avgRating: 'Outstanding', high: 12, low: 0, completion: 100, distribution: { excellent: 12, good: 25, avg: 3, poor: 0 } },
    { dept: 'Marketing', employees: 15, avgScore: 3.9, avgRating: 'Meets Expectations', high: 2, low: 2, completion: 88, distribution: { excellent: 2, good: 8, avg: 3, poor: 2 } },
  ];

  const ScoreDistributionChart = ({ distribution, total }) => {
    const segments = [
      { label: 'Excellent', color: 'bg-green-500', value: distribution.excellent },
      { label: 'Good', color: 'bg-blue-500', value: distribution.good },
      { label: 'Average', color: 'bg-yellow-500', value: distribution.avg },
      { label: 'Poor', color: 'bg-red-500', value: distribution.poor },
    ];

    return (
      <div className="flex w-32 h-2 rounded-full overflow-hidden" title={`Excellent: ${distribution.excellent}, Good: ${distribution.good}, Average: ${distribution.avg}, Poor: ${distribution.poor}`}>
        {segments.map((seg, index) => (
          <div
            key={index}
            className={seg.color}
            style={{ width: `${(seg.value / total) * 100}%` }}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Performance Summary by Department</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <h2 className="card-title">Summary</h2>
            <div className="flex flex-wrap gap-2">
              <select className="select select-bordered select-sm"><option>Annual 2024</option></select>
              <select className="select select-bordered select-sm"><option>All Roles</option></select>
              <button className="btn btn-sm btn-ghost"><Filter size={16} /> Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>No. of Employees</th>
                  <th>Avg. Final Score</th>
                  <th>Avg. Rating</th>
                  <th>High Performers (90%+)</th>
                  <th>Low Performers (&lt;60%)</th>
                  <th>Score Range Distribution</th>
                  <th>Completion Rate (%)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.dept}>
                    <td className="font-semibold">{row.dept}</td>
                    <td>{row.employees}</td>
                    <td><div className="badge badge-info">{row.avgScore}/5</div></td>
                    <td><div className="badge badge-ghost">{row.avgRating}</div></td>
                    <td>{row.high}</td>
                    <td>{row.low}</td>
                    <td><ScoreDistributionChart distribution={row.distribution} total={row.employees} /></td>
                    <td>
                      <div className="flex items-center gap-2">
                        <progress className="progress progress-success w-20" value={row.completion} max="100"></progress>
                        <span className="text-sm">{row.completion}%</span>
                      </div>
                    </td>
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

export default PerformanceSummary;
