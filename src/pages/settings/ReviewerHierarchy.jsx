import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check } from 'lucide-react';

const ReviewerHierarchy = () => {
  const [showModal, setShowModal] = useState(false);
  const [hierarchies, setHierarchies] = useState([
    { id: 1, name: '2-Level Manager Review', level1: 'Reporting Manager', level2: 'HOD', hrRole: 'HRBP', parallel: false, skip: false, lockDeadline: '2025-01-31' },
    { id: 2, name: 'Simple Manager Review', level1: 'Reporting Manager', level2: 'N/A', hrRole: 'HRBP', parallel: false, skip: true, lockDeadline: '2025-01-31' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Reviewer Hierarchy Settings</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={20} /> Add Flow
        </button>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Review Flows</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Flow Name</th>
                  <th>Level 1 Reviewer</th>
                  <th>Level 2 Reviewer</th>
                  <th>HR Finalization Role</th>
                  <th>Lock Deadline</th>
                  <th className="text-center">Parallel?</th>
                  <th className="text-center">Can Skip?</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hierarchies.map((h) => (
                  <tr key={h.id}>
                    <td className="font-semibold">{h.name}</td>
                    <td>{h.level1}</td>
                    <td>{h.level2}</td>
                    <td>{h.hrRole}</td>
                    <td>{h.lockDeadline}</td>
                    <td className="text-center">{h.parallel && <Check size={20} className="text-success" />}</td>
                    <td className="text-center">{h.skip && <Check size={20} className="text-success" />}</td>
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
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg">Add Review Flow</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-control md:col-span-2">
                <label className="label"><span className="label-text">Review Flow Name</span></label>
                <input type="text" placeholder="e.g., 2-Level Manager Review" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Level 1 Reviewer</span></label>
                <select className="select select-bordered"><option>Reporting Manager</option><option>Peer</option></select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Level 2 Reviewer</span></label>
                <select className="select select-bordered"><option>HOD</option><option>Skip-Level Manager</option><option>N/A</option></select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">HR Finalization Role</span></label>
                <select className="select select-bordered"><option>HRBP</option><option>HR Manager</option></select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Reviewer Lock Deadline</span></label>
                <input type="date" className="input input-bordered" />
              </div>
              <div className="form-control items-start">
                <label className="label cursor-pointer"><input type="checkbox" className="checkbox checkbox-primary mr-2" /> Parallel Reviews Allowed?</label>
              </div>
              <div className="form-control items-start">
                <label className="label cursor-pointer"><input type="checkbox" className="checkbox checkbox-primary mr-2" /> Can Skip Levels?</label>
              </div>
            </form>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary">Save Flow</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewerHierarchy;
