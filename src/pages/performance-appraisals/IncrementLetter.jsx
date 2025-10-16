import React, { useState } from 'react';
import { Search, Download, Send } from 'lucide-react';

const formatCurrency = (value) => `INR ${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const IncrementLetter = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = [
    { id: 1, name: 'John Doe', designation: 'Sr. Software Engineer', oldCTC: 800000, newCTC: 920000, hike: 15, date: '2025-04-01' },
    { id: 2, name: 'Jane Smith', designation: 'Software Engineer', oldCTC: 600000, newCTC: 672000, hike: 12, date: '2025-04-01' }
  ];

  if (selectedEmployee) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Increment Letter - {selectedEmployee.name}</h1>
          <button onClick={() => setSelectedEmployee(null)} className="btn btn-ghost">Back to List</button>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="prose max-w-none">
              <h2 className="text-center">Increment Letter</h2>
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Dear {selectedEmployee.name},</p>
              <p>We are pleased to inform you about your salary revision. This is in recognition of your valuable contributions to the company.</p>
              <p>Your compensation has been revised as follows, effective from <strong>{new Date(selectedEmployee.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>:</p>
              <ul>
                <li><strong>Previous CTC:</strong> {formatCurrency(selectedEmployee.oldCTC)} per annum</li>
                <li><strong>Revised CTC:</strong> {formatCurrency(selectedEmployee.newCTC)} per annum</li>
                <li><strong>Increment Percentage:</strong> {selectedEmployee.hike}%</li>
              </ul>
              <p>We look forward to your continued dedication and contributions.</p>
              <p>Sincerely,</p>
              <p><strong>HR Department</strong><br/>HRMS Inc.</p>
            </div>
            <div className="card-actions justify-end mt-6">
              <button className="btn"><Send size={16} /> Notify Employee</button>
              <button className="btn btn-primary"><Download size={16} /> Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Increment Letters</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between mb-4">
            <h2 className="card-title">Generated Letters</h2>
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
                  <th>New CTC</th>
                  <th>Effective Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.designation}</td>
                    <td>{formatCurrency(emp.newCTC)}</td>
                    <td>{emp.date}</td>
                    <td>
                      <button className="btn btn-sm btn-primary" onClick={() => setSelectedEmployee(emp)}>View Letter</button>
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

export default IncrementLetter;
