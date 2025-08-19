import React from 'react';
import { Filter, Search } from 'lucide-react';

const SkillMapping = () => {
  const skills = [
    { id: 1, emp: 'John Doe', dept: 'Engineering', skill: 'React Hooks', status: 'Covered', training: 'React Advanced', appraisal: 'Exceeds expectations in frontend tasks.' },
    { id: 2, emp: 'Jane Smith', dept: 'Engineering', skill: 'Node.js', status: 'Lacking', training: 'N/A', appraisal: 'Needs improvement in backend development.' },
    { id: 3, emp: 'Mike Johnson', dept: 'Design', skill: 'Figma Prototyping', status: 'Required', training: 'Advanced Figma Workshop', appraisal: 'Key requirement for senior role.' },
    { id: 4, emp: 'Emily White', dept: 'Sales', skill: 'Negotiation', status: 'Covered', training: 'Advanced Sales Techniques', appraisal: 'Excellent negotiation skills demonstrated.' },
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
                  <th>Employee</th>
                  <th>Skill Area</th>
                  <th>Status</th>
                  <th>Assigned Training</th>
                  <th>Appraisal Notes</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td>
                      <div>{skill.emp}</div>
                      <div className="text-xs text-gray-500">{skill.dept}</div>
                    </td>
                    <td>{skill.skill}</td>
                    <td>
                      <div className={`badge ${
                        skill.status === 'Covered' ? 'badge-success' :
                        skill.status === 'Lacking' ? 'badge-error' : 'badge-warning'
                      }`}>{skill.status}</div>
                    </td>
                    <td>{skill.training}</td>
                    <td className="text-xs max-w-xs truncate">{skill.appraisal}</td>
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

export default SkillMapping;
