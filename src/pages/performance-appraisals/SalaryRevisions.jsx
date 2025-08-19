import React, { useState } from 'react';
import { Search, Check, X, Edit } from 'lucide-react';

const formatCurrency = (value) => `INR ${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const SalaryRevisions = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRevision, setSelectedRevision] = useState(null);

  const revisions = [
    { id: 1, name: 'John Doe', currentCTC: 800000, finalScore: 4.1, hike: 15, newCTC: 920000, effectiveDate: '2025-04-01', status: 'Pending HR Approval' },
    { id: 2, name: 'Jane Smith', currentCTC: 600000, finalScore: 3.9, hike: 12, newCTC: 672000, effectiveDate: '2025-04-01', status: 'Approved' },
    { id: 3, name: 'Mike Johnson', currentCTC: 750000, finalScore: 4.5, hike: 18, newCTC: 885000, effectiveDate: '2025-04-01', status: 'Pending Finance Approval' }
  ];

  const handleEdit = (revision) => {
    setSelectedRevision(revision);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Salary Revisions</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between mb-4">
            <h2 className="card-title">Pending & Approved Revisions</h2>
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
                  <th>Current CTC</th>
                  <th>Hike %</th>
                  <th>New CTC</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {revisions.map((rev) => (
                  <tr key={rev.id}>
                    <td>{rev.name}</td>
                    <td>{formatCurrency(rev.currentCTC)}</td>
                    <td><div className="badge badge-success">{rev.hike}%</div></td>
                    <td>{formatCurrency(rev.newCTC)}</td>
                    <td><div className="badge badge-outline">{rev.status}</div></td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-primary" onClick={() => handleEdit(rev)}><Edit size={16} /> Review</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && selectedRevision && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg mb-4">Salary Revision for {selectedRevision.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Employee</span></label>
                <input type="text" value={selectedRevision.name} className="input input-bordered" disabled />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Final Score</span></label>
                <input type="text" value={`${selectedRevision.finalScore}/5`} className="input input-bordered" disabled />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Current CTC</span></label>
                <input type="text" value={formatCurrency(selectedRevision.currentCTC)} className="input input-bordered" disabled />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Recommended Hike %</span></label>
                <input type="number" defaultValue={selectedRevision.hike} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">New Proposed CTC</span></label>
                <input type="text" value={formatCurrency(selectedRevision.newCTC)} className="input input-bordered" disabled />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Effective Date</span></label>
                <input type="date" defaultValue={selectedRevision.effectiveDate} className="input input-bordered" />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label"><span className="label-text">Status</span></label>
                <select className="select select-bordered" defaultValue={selectedRevision.status}>
                  <option>Pending HR Approval</option>
                  <option>Pending Finance Approval</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div className="form-control md:col-span-2">
                <label className="label"><span className="label-text">Remarks</span></label>
                <textarea className="textarea textarea-bordered h-20" placeholder="Optional comments..."></textarea>
              </div>
            </div>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Close</button>
              <button className="btn btn-error"><X size={16} /> Reject</button>
              <button className="btn btn-success"><Check size={16} /> Approve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryRevisions;
