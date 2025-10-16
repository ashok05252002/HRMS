import React from 'react';
import { Filter } from 'lucide-react';

const SkillGapMatrix = () => {
    const skillData = [
        { employee: 'John Doe', department: 'Engineering', role: 'Sr. Software Engineer', skill: 'System Design', status: 'Lacking', lastTraining: 'N/A', assignedTraining: 'Advanced System Design' },
        { employee: 'Jane Smith', department: 'Design', role: 'UI/UX Designer', skill: 'Prototyping', status: 'Covered', lastTraining: 'Figma for Teams', assignedTraining: 'N/A' },
        { employee: 'Ravi Kumar', department: 'Engineering', role: 'Jr. Developer', skill: 'React Hooks', status: 'Required', lastTraining: 'N/A', assignedTraining: 'React Advanced' },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Covered': return 'badge-success';
            case 'Lacking': return 'badge-error';
            case 'Required': return 'badge-warning';
            default: return 'badge-ghost';
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Skill Gap Matrix</h1>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                        <h2 className="card-title">Matrix Data</h2>
                        <div className="flex flex-wrap gap-2">
                            <select className="select select-bordered select-sm"><option>All Skills</option></select>
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
                                    <th>Role</th>
                                    <th>Skill Area</th>
                                    <th>Skill Status</th>
                                    <th>Last Training</th>
                                    <th>Assigned Training</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skillData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.employee}</td>
                                        <td>{data.department}</td>
                                        <td>{data.role}</td>
                                        <td className="font-semibold">{data.skill}</td>
                                        <td><div className={`badge ${getStatusBadge(data.status)}`}>{data.status}</div></td>
                                        <td>{data.lastTraining}</td>
                                        <td>{data.assignedTraining}</td>
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

export default SkillGapMatrix;
