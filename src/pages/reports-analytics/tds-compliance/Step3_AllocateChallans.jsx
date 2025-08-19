import React from 'react';

const Step3_AllocateChallans = () => {
    const employees = [
        { id: 1, name: 'John Doe', pan: 'ABCDE1234F', tds: 50000.00 },
        { id: 2, name: 'Jane Smith', pan: 'FGHIJ5678K', tds: 45000.00 },
        { id: 3, name: 'Mike Johnson', pan: 'KLMNO9012L', tds: 60000.00 },
        { id: 4, name: 'Emily White', pan: 'PQRST3456M', tds: 72000.00 },
        { id: 5, name: 'David Brown', pan: 'UVWXY7890N', tds: 38000.00 },
    ];
    const totalTds = employees.reduce((sum, emp) => sum + emp.tds, 0);
    const totalChallan = 1020000.00;

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-lg">Allocate Challans to Deductions</h3>
            <div className="flex justify-end">
                <button className="btn btn-secondary btn-sm">Auto-allocate Challans</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead><tr><th>Employee Name</th><th>PAN</th><th>TDS Amount (INR)</th><th>Allocated Challan</th></tr></thead>
                    <tbody>
                        {employees.map(e => (
                            <tr key={e.id}>
                                <td>{e.name}</td><td>{e.pan}</td><td>{e.tds.toFixed(2)}</td>
                                <td>
                                    <select className="select select-bordered select-sm w-full max-w-xs">
                                        <option>Challan 1 (INR 500000.00)</option>
                                        <option>Challan 2 (INR 520000.00)</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="divider"></div>
            <div className="stats shadow w-full bg-base-200">
                <div className="stat">
                    <div className="stat-title">Total Challan Amount</div>
                    <div className="stat-value text-secondary">INR {totalChallan.toFixed(2)}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Allocated TDS</div>
                    <div className="stat-value">INR {totalTds.toFixed(2)}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Unallocated Amount</div>
                    <div className="stat-value text-success">INR {(totalChallan - totalTds).toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
};

export default Step3_AllocateChallans;
