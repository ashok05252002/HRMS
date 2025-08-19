import React from 'react';
import { Filter } from 'lucide-react';

const formatCurrency = (value) => `INR ${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CostBenefitAnalysis = () => {
  const data = [
    { training: 'React Advanced', date: '2025-01-20', attendees: 12, costHead: 5000, totalCost: 60000, feedback: 4.8, improvement: 17, trainer: 'John Smith', budgetCode: 'ENG-Q1-001' },
    { training: 'Leadership Workshop', date: '2025-02-05', attendees: 8, costHead: 15000, totalCost: 120000, feedback: 4.5, improvement: 10, trainer: 'External Inc.', budgetCode: 'HR-Q1-005' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Training Cost vs. Benefit Analysis</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <h2 className="card-title">Analysis</h2>
            <div className="flex flex-wrap gap-2">
              <select className="select select-bordered select-sm"><option>All Trainings</option></select>
              <input type="date" className="input input-bordered input-sm" />
              <button className="btn btn-sm btn-ghost"><Filter size={16} /> Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Training Name</th>
                  <th>Training Date</th>
                  <th>Total Attendees</th>
                  <th>Cost per Head</th>
                  <th>Total Training Cost</th>
                  <th>Avg Feedback</th>
                  <th>Avg Score Improvement %</th>
                  <th>Trainer Name</th>
                  <th>Budget Code</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    <td>{row.training}</td>
                    <td>{row.date}</td>
                    <td>{row.attendees}</td>
                    <td>{formatCurrency(row.costHead)}</td>
                    <td>{formatCurrency(row.totalCost)}</td>
                    <td><div className="badge badge-info">{row.feedback}/5</div></td>
                    <td><div className="badge badge-success">{row.improvement}%</div></td>
                    <td>{row.trainer}</td>
                    <td>{row.budgetCode}</td>
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

export default CostBenefitAnalysis;
