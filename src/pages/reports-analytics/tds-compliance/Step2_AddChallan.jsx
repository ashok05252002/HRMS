import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const Step2_AddChallan = () => {
    const [challans, setChallans] = useState([
        { id: 1, bsr: '0210001', date: '2025-07-15', serial: '00123', amount: 500000.00, section: '192', head: '200' },
        { id: 2, bsr: '0210001', date: '2025-08-14', serial: '00124', amount: 520000.00, section: '192', head: '200' },
    ]);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Challan Details</h3>
                <button onClick={() => setShowForm(!showForm)} className="btn btn-primary btn-sm"><Plus size={16}/> Add New Challan</button>
            </div>

            {showForm && (
                <div className="p-4 border rounded-lg space-y-4 bg-base-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="form-control"><label className="label"><span className="label-text">BSR Code</span></label><input type="text" className="input input-bordered" /></div>
                        <div className="form-control"><label className="label"><span className="label-text">Date of Deposit</span></label><input type="date" className="input input-bordered" /></div>
                        <div className="form-control"><label className="label"><span className="label-text">Challan Serial Number</span></label><input type="text" className="input input-bordered" /></div>
                        <div className="form-control"><label className="label"><span className="label-text">Amount Paid (INR)</span></label><input type="number" className="input input-bordered" /></div>
                        <div className="form-control"><label className="label"><span className="label-text">Section Code</span></label><input type="text" value="192" className="input input-bordered" disabled /></div>
                        <div className="form-control"><label className="label"><span className="label-text">Minor Head</span></label><select className="select select-bordered"><option>200</option><option>400</option></select></div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setShowForm(false)} className="btn btn-ghost">Cancel</button>
                        <button className="btn btn-secondary">Save Challan</button>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead><tr><th>BSR Code</th><th>Date of Deposit</th><th>Serial No.</th><th>Amount (INR)</th><th>Actions</th></tr></thead>
                    <tbody>
                        {challans.map(c => (
                            <tr key={c.id}>
                                <td>{c.bsr}</td><td>{c.date}</td><td>{c.serial}</td><td>{c.amount.toFixed(2)}</td>
                                <td><button className="btn btn-ghost btn-sm text-error"><Trash2 size={16}/></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Step2_AddChallan;
