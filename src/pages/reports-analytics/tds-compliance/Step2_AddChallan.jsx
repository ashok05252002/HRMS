import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const formatCurrency = (value) => `INR ${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const Step2_AddChallan = ({ onComplete }) => {
  const [challans, setChallans] = useState([
    { id: 1, bsr: '0014431', date: '2025-04-25', serial: '00123', amount: 50000, section: '192', minorHead: '200' },
  ]);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Step 2: Add Challan Details</h3>
        <button onClick={() => setShowAdd(!showAdd)} className="btn btn-primary btn-sm">
          <Plus size={16} /> Add New Challan
        </button>
      </div>

      {showAdd && (
        <div className="p-4 border rounded-lg bg-base-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control"><label className="label"><span className="label-text">BSR Code</span></label><input type="text" className="input input-bordered" /></div>
            <div className="form-control"><label className="label"><span className="label-text">Date of Deposit</span></label><input type="date" className="input input-bordered" /></div>
            <div className="form-control"><label className="label"><span className="label-text">Challan Serial Number</span></label><input type="text" className="input input-bordered" /></div>
            <div className="form-control"><label className="label"><span className="label-text">Amount Paid</span></label><input type="number" className="input input-bordered" /></div>
            <div className="form-control"><label className="label"><span className="label-text">Section Code</span></label><input type="text" defaultValue="192" className="input input-bordered" /></div>
            <div className="form-control"><label className="label"><span className="label-text">Minor Head</span></label><select className="select select-bordered"><option>200</option><option>400</option></select></div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button className="btn btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
            <button className="btn btn-primary">Save Challan</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>BSR Code</th>
              <th>Date of Deposit</th>
              <th>Challan Serial No.</th>
              <th>Amount</th>
              <th>Section</th>
              <th>Minor Head</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {challans.map(c => (
              <tr key={c.id}>
                <td>{c.bsr}</td>
                <td>{c.date}</td>
                <td>{c.serial}</td>
                <td>{formatCurrency(c.amount)}</td>
                <td>{c.section}</td>
                <td>{c.minorHead}</td>
                <td><button className="btn btn-xs btn-ghost text-error"><Trash2 size={14} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button onClick={onComplete} className="btn btn-primary">Continue to Next Step</button>
      </div>
    </div>
  );
};

export default Step2_AddChallan;
