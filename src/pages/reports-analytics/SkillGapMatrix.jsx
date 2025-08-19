import React from 'react';
import { Filter, Search } from 'lucide-react';

const SkillGapMatrix = () => {
  const skills = [
    { id: 1, emp: 'John Doe', dept: 'Engineering', role: 'Sr. Developer', skill: 'React Hooks', status: 'Covered', lastTraining: '2025-01-20', assignedTraining: 'React Advanced', completion: 'Completed', appraisal: 'Exceeds expectations in frontend tasks.' },
    { id: 2, emp: 'Jane Smith', dept: 'Engineering', role: 'Developer', skill: 'Node.js', status: 'Lacking', lastTraining: 'N/A', assignedTraining: 'Backend Fundamentals', completion: 'Assigned', appraisal: 'Needs improvement in backend development.' },
    { id: 3, emp: 'Mike Johnson', dept: 'Design', role: 'UI/UX Designer', skill: 'Figma Prototyping', status: 'Required', lastTraining: '2024-11-15', assignedTraining: 'Advanced Figma Workshop', completion: 'Completed', appraisal: 'Key requirement for senior role.' },
    { id: 4, emp: 'Emily White', dept: 'Sales', role: 'Sales Manager', skill: 'Negotiation', status: 'Covered', lastTraining: '2025-02-10', assignedTraining: 'Advanced Sales Techniques', completion: 'Completed', appraisal: 'Excellent negotiation skills demonstrated.' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Skill Gap Matrix</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <h2 className="card-title">Employee Skills Overview</h2>
            <div className="flex flex-wrap gap-2">
              <div className="form-control">
                <input type="text" placeholder="Search Employee/Skill..." className="input input-bordered input-sm" />
              </div>
              <div className="form-control">
                <select className="select select-bordered select-sm">
                  <option>All Departments</option>
                  <option>Engineering</option>
                  <option>Design</option>
                  <option>Sales</option>
                </select>
              </div>
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
                  <th>Last Training Date</th>
                  <th>Assigned Training</th>
                  <th>Completion Status</th>
                  <th>Appraisal Comments</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td>{skill.emp}</td>
                    <td>{skill.dept}</td>
                    <td>{skill.role}</td>
                    <td>{skill.skill}</td>
                    <td>
                      <div className={`badge ${
                        skill.status === 'Covered' ? 'badge-success' :
                        skill.status === 'Lacking' ? 'badge-error' : 'badge-warning'
                      }`}>{skill.status}</div>
                    </td>
                    <td>{skill.lastTraining}</td>
                    <td>{skill.assignedTraining}</td>
                    <td>
                      <div className={`badge ${
                        skill.completion === 'Completed' ? 'badge-success' : 'badge-info'
                      }`}>{skill.completion}</div>
                    </td>
                    <td className="text-xs max-w-xs truncate" title={skill.appraisal}>{skill.appraisal}</td>
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
