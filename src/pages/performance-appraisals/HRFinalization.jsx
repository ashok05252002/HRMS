import React, { useState } from 'react';
import { Search, Edit, CheckCircle } from 'lucide-react';

const HRFinalization = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = [
    { id: 1, name: 'John Doe', designation: 'Sr. Software Engineer', score: 4.1, status: 'Pending Finalization' },
    { id: 2, name: 'Jane Smith', designation: 'Software Engineer', score: 3.9, status: 'Completed' },
    { id: 3, name: 'Mike Johnson', designation: 'UI/UX Designer', score: 4.5, status: 'Pending Finalization' }
  ];

  if (selectedEmployee) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">HR Finalization - {selectedEmployee.name}</h1>
          <button onClick={() => setSelectedEmployee(null)} className="btn btn-ghost">Back to List</button>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Finalize Appraisal Score</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label"><span className="label-text">Final Score (Manager)</span></label>
                <input type="text" value={selectedEmployee.score} className="input input-bordered" disabled />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Adjusted Score (Optional)</span></label>
                <input type="number" step="0.1" placeholder="Enter adjusted score" className="input input-bordered" />
              </div>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Final Comments</span></label>
              <textarea className="textarea textarea-bordered h-24" placeholder="Enter final comments from HR..."></textarea>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Lock Appraisal</span>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Trigger Increment Proposal</span></label>
              <div className="flex gap-4">
                <label className="label cursor-pointer">
                  <input type="radio" name="trigger-increment" className="radio radio-primary" />
                  <span className="label-text ml-2">Yes</span>
                </label>
                <label className="label cursor-pointer">
                  <input type="radio" name="trigger-increment" className="radio" defaultChecked />
                  <span className="label-text ml-2">No</span>
                </label>
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-ghost">Cancel</button>
              <button className="btn btn-primary">Save & Finalize</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">HR Finalization</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between mb-4">
            <h2 className="card-title">Employees Pending Finalization</h2>
            <div className="form-control">
              <div className="input-group">
                <input type="text" placeholder="Search..." className="input input-bordered" />
                <button className="btn btn-square"><Search size={20} /></button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Designation</th>
                  <th>Final Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.designation}</td>
                    <td><div className="badge badge-info">{emp.score}/5</div></td>
                    <td><div className={`badge ${emp.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{emp.status}</div></td>
                    <td>
                      {emp.status !== 'Completed' ? (
                        <button className="btn btn-sm btn-primary" onClick={() => setSelectedEmployee(emp)}>
                          <Edit size={16} /> Finalize
                        </button>
                      ) : (
                        <span className="text-success flex items-center gap-1"><CheckCircle size={16} /> Completed</span>
                      )}
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

export default HRFinalization;
