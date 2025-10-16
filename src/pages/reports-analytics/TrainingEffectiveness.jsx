import React from 'react';
import { Filter } from 'lucide-react';

const TrainingEffectiveness = () => {
    const effectivenessData = [
        { employee: 'John Doe', department: 'Engineering', training: 'React Advanced', date: '2024-11-20', feedbackScore: 4.8, scoreBefore: 3.9, scoreAfter: 4.2, improvement: '+7.7%' },
        { employee: 'Jane Smith', department: 'Design', training: 'Figma for Teams', date: '2024-10-15', feedbackScore: 4.5, scoreBefore: 4.0, scoreAfter: 4.3, improvement: '+7.5%' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Training Effectiveness Report</h1>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                        <h2 className="card-title">Effectiveness Data</h2>
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
                                    <th>Training Date</th>
                                    <th>Feedback Score</th>
                                    <th>Appraisal Score (Before)</th>
                                    <th>Appraisal Score (After)</th>
                                    <th>Improvement %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {effectivenessData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.employee}</td>
                                        <td>{data.department}</td>
                                        <td>{data.training}</td>
                                        <td>{data.date}</td>
                                        <td><div className="badge badge-info">{data.feedbackScore}/5</div></td>
                                        <td><div className="badge badge-ghost">{data.scoreBefore}/5</div></td>
                                        <td><div className="badge badge-success">{data.scoreAfter}/5</div></td>
                                        <td><div className="font-semibold text-success">{data.improvement}</div></td>
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
