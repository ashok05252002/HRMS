import React from 'react';
import { Filter } from 'lucide-react';

const formatCurrency = (value) => `INR ${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CostBenefitAnalysis = () => {
    const costData = [
        { training: 'React Advanced', date: '2024-11-20', attendees: 12, costPerHead: 5000, totalCost: 60000, avgFeedback: 4.8, avgImprovement: '+7.7%' },
        { training: 'Leadership Skills', date: '2024-10-05', attendees: 8, costPerHead: 15000, totalCost: 120000, avgFeedback: 4.5, avgImprovement: '+5.2%' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Training Cost vs. Benefit Analysis</h1>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                        <h2 className="card-title">Analysis Data</h2>
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
                                    <th>Date</th>
                                    <th>Total Attendees</th>
                                    <th>Cost per Head</th>
                                    <th>Total Training Cost</th>
                                    <th>Avg. Feedback Score</th>
                                    <th>Avg. Score Improvement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {costData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.training}</td>
                                        <td>{data.date}</td>
                                        <td>{data.attendees}</td>
                                        <td>{formatCurrency(data.costPerHead)}</td>
                                        <td className="font-semibold">{formatCurrency(data.totalCost)}</td>
                                        <td><div className="badge badge-info">{data.avgFeedback}/5</div></td>
                                        <td><div className="font-semibold text-success">{data.avgImprovement}</div></td>
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
