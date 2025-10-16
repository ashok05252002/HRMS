import React from 'react';
import { Filter } from 'lucide-react';

const KpiDistribution = () => {
    const kpiData = [
        { kra: 'Technical Excellence', employee: 'John Doe', department: 'Engineering', weight: 30, score: 4.5, rating: 'Outstanding', reviewer: 'Manager', comments: 'Excellent work on the new feature.' },
        { kra: 'Team Collaboration', employee: 'Jane Smith', department: 'Design', weight: 25, score: 4.0, rating: 'Exceeds Expectations', reviewer: 'Manager', comments: 'Great team player.' },
        { kra: 'Innovation', employee: 'Mike Johnson', department: 'Engineering', weight: 20, score: 3.5, rating: 'Meets Expectations', reviewer: 'Manager', comments: 'Brought some good ideas.' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">KRA/KPI-wise Performance Distribution</h1>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                        <h2 className="card-title">Distribution Data</h2>
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
                                {kpiData.map((data, index) => (
                                    <tr key={index}>
                                        <td className="font-semibold">{data.kra}</td>
                                        <td>{data.employee}</td>
                                        <td>{data.department}</td>
                                        <td><div className="badge badge-primary">{data.weight}%</div></td>
                                        <td><div className="badge badge-info">{data.score}/5</div></td>
                                        <td>{data.rating}</td>
                                        <td>{data.reviewer}</td>
                                        <td className="max-w-xs truncate">{data.comments}</td>
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
