import React from 'react';
import { Filter } from 'lucide-react';

const PerformanceSummary = () => {
    const summaryData = [
        { department: 'Engineering', employees: 50, avgScore: 4.2, avgRating: 'Exceeds Expectations', highPerformers: 12, lowPerformers: 2, completionRate: 95 },
        { department: 'Design', employees: 15, avgScore: 4.5, avgRating: 'Outstanding', highPerformers: 5, lowPerformers: 0, completionRate: 100 },
        { department: 'Marketing', employees: 25, avgScore: 3.8, avgRating: 'Meets Expectations', highPerformers: 4, lowPerformers: 3, completionRate: 88 },
        { department: 'Sales', employees: 40, avgScore: 3.9, avgRating: 'Meets Expectations', highPerformers: 8, lowPerformers: 5, completionRate: 92 },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Performance Summary by Department</h1>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                        <h2 className="card-title">Summary Data</h2>
                        <div className="flex flex-wrap gap-2">
                            <select className="select select-bordered select-sm"><option>All Cycles</option></select>
                            <select className="select select-bordered select-sm"><option>All Departments</option></select>
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
                                    <th>Completion Rate (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summaryData.map((data, index) => (
                                    <tr key={index}>
                                        <td className="font-semibold">{data.department}</td>
                                        <td>{data.employees}</td>
                                        <td><div className="badge badge-info">{data.avgScore}/5</div></td>
                                        <td>{data.avgRating}</td>
                                        <td>{data.highPerformers}</td>
                                        <td>{data.lowPerformers}</td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <progress className="progress progress-success w-20" value={data.completionRate} max="100"></progress>
                                                <span>{data.completionRate}%</span>
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
