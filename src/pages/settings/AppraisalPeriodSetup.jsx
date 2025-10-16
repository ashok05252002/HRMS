import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AppraisalPeriodSetup = () => {
  const [showModal, setShowModal] = useState(false);
  const [periods, setPeriods] = useState([
    { id: 1, name: 'FY24 Annual', start: '2024-01-01', end: '2024-12-31', selfDeadline: '2025-01-15', managerDeadline: '2025-01-31', status: 'Active' },
    { id: 2, name: 'FY24 Q3', start: '2024-10-01', end: '2024-12-31', selfDeadline: '2025-01-15', managerDeadline: '2025-01-31', status: 'Completed' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Appraisal Period Setup</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={20} /> Add Period
        </button>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Appraisal Cycles</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Cycle Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Self Review Deadline</th>
                  <th>Manager Review Deadline</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {periods.map((period) => (
                  <tr key={period.id}>
                    <td className="font-semibold">{period.name}</td>
                    <td>{period.start}</td>
                    <td>{period.end}</td>
                    <td>{period.selfDeadline}</td>
                    <td>{period.managerDeadline}</td>
                    <td><div className={`badge ${period.status === 'Active' ? 'badge-success' : 'badge-neutral'}`}>{period.status}</div></td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-ghost"><Edit size={16} /></button>
                        <button className="btn btn-sm btn-ghost text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-4xl">
            <h3 className="font-bold text-lg">Add Appraisal Period</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Appraisal Cycle Name</span></label>
                <input type="text" placeholder="e.g., FY24 Annual" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Status</span></label>
                <select className="select select-bordered"><option>Active</option><option>Inactive</option></select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Start Date</span></label>
                <input type="date" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">End Date</span></label>
                <input type="date" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Self Review Deadline</span></label>
                <input type="date" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Manager Review Deadline</span></label>
                <input type="date" className="input input-bordered" />
              </div>
            </form>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary">Save Period</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppraisalPeriodSetup;
