import React, { useState } from 'react';
import { Plus, Edit, Trash2, Percent, Check } from 'lucide-react';

const IncrementRuleEngine = () => {
  const [showModal, setShowModal] = useState(false);
  const [rules, setRules] = useState([
    { id: 1, name: 'FY24 Merit Rule (High)', scoreMin: 90, scoreMax: 100, hike: 10, promotion: true, autoPropose: true, requiresApproval: true, effectiveDate: '2025-04-01', grade: 'All', budgetCap: 'N/A' },
    { id: 2, name: 'FY24 Merit Rule (Mid)', scoreMin: 75, scoreMax: 89, hike: 7, promotion: false, autoPropose: true, requiresApproval: true, effectiveDate: '2025-04-01', grade: 'All', budgetCap: 'N/A' },
    { id: 3, name: 'FY24 Merit Rule (Low)', scoreMin: 60, scoreMax: 74, hike: 4, promotion: false, autoPropose: true, requiresApproval: true, effectiveDate: '2025-04-01', grade: 'All', budgetCap: 'N/A' },
    { id: 4, name: 'FY24 PIP Rule', scoreMin: 0, scoreMax: 59, hike: 0, promotion: false, autoPropose: false, requiresApproval: false, effectiveDate: '2025-04-01', grade: 'All', budgetCap: 'N/A' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Salary Increment Rule Setup</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={20} /> Add Rule
        </button>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Increment Rules</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Rule Name</th>
                  <th>Score Range</th>
                  <th>Hike %</th>
                  <th>Effective Date</th>
                  <th>Grade/Level</th>
                  <th>Budget Cap</th>
                  <th className="text-center">Approval?</th>
                  <th className="text-center">Promotion?</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr key={rule.id}>
                    <td className="font-semibold">{rule.name}</td>
                    <td>{rule.scoreMin} - {rule.scoreMax}</td>
                    <td><div className="badge badge-success">{rule.hike}%</div></td>
                    <td>{rule.effectiveDate}</td>
                    <td>{rule.grade}</td>
                    <td>{rule.budgetCap}</td>
                    <td className="text-center">{rule.requiresApproval && <Check size={20} className="text-success" />}</td>
                    <td className="text-center">{rule.promotion && <Check size={20} className="text-success" />}</td>
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
            <h3 className="font-bold text-lg">Add Increment Rule</h3>
            <form className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Rule Name</span></label>
                  <input type="text" placeholder="e.g., FY24 Merit Rule" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Linked Score Model</span></label>
                  <select className="select select-bordered"><option>% Based</option><option>5-Point Scale</option></select>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Score Range (Min)</span></label>
                  <input type="number" placeholder="e.g., 90" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Score Range (Max)</span></label>
                  <input type="number" placeholder="e.g., 100" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Increment %</span></label>
                  <div className="input-group">
                    <input type="number" placeholder="e.g., 10" className="input input-bordered w-full" />
                    <span><Percent size={16} /></span>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Effective From</span></label>
                  <input type="date" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text">Grade/Level Conditions (Optional)</span></label>
                    <select className="select select-bordered" multiple>
                        <option>Grade A</option>
                        <option>Grade B</option>
                        <option>Level 1</option>
                        <option>Level 2</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text">Budget Cap (Optional)</span></label>
                    <div className="input-group">
                        <span>INR</span>
                        <input type="number" placeholder="e.g., 50000.00" className="input input-bordered w-full" />
                    </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <label className="label cursor-pointer"><span className="label-text">Promotion Trigger?</span><input type="checkbox" className="toggle toggle-primary" /></label>
                <label className="label cursor-pointer"><span className="label-text">Auto-Propose Increment?</span><input type="checkbox" className="toggle toggle-primary" /></label>
                <label className="label cursor-pointer"><span className="label-text">Requires Approval?</span><input type="checkbox" className="toggle toggle-primary" /></label>
              </div>
            </form>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary">Save Rule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncrementRuleEngine;
