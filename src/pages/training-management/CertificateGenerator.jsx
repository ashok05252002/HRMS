import React, { useState } from 'react';
import { Search, Download, Send, Award, Plus } from 'lucide-react';

const CertificateGenerator = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const employees = [
    { id: 1, name: 'John Doe', training: 'React Advanced Concepts', date: '2025-01-20' },
    { id: 2, name: 'Jane Smith', training: 'Team Leadership Workshop', date: '2025-01-22' }
  ];

  if (selectedEmployee) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Certificate for {selectedEmployee.name}</h1>
          <button onClick={() => setSelectedEmployee(null)} className="btn btn-ghost">Back to List</button>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="border-4 border-blue-600 p-8 rounded-lg w-full max-w-3xl bg-blue-50/50">
              <Award size={64} className="text-yellow-500 mx-auto" />
              <h2 className="text-3xl font-bold mt-4">Certificate of Completion</h2>
              <p className="mt-4 text-lg">This is to certify that</p>
              <p className="text-4xl font-handwriting font-bold text-blue-700 my-4">{selectedEmployee.name}</p>
              <p className="text-lg">has successfully completed the training program</p>
              <p className="text-2xl font-semibold my-2">"{selectedEmployee.training}"</p>
              <p className="mt-4">on {new Date(selectedEmployee.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
              <div className="mt-12 flex justify-between w-full">
                <div>
                  <p className="border-t-2 border-gray-700 pt-2">HR Manager Signature</p>
                </div>
                <div>
                  <p className="border-t-2 border-gray-700 pt-2">Trainer Signature</p>
                </div>
              </div>
            </div>
            <div className="card-actions justify-center mt-6">
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
       <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Certificate Generator</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={20} /> Add Certificate
        </button>
      </div>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between mb-4">
            <h2 className="card-title">Completed Trainings</h2>
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
                  <th>Training Program</th>
                  <th>Completion Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.training}</td>
                    <td>{emp.date}</td>
                    <td>
                      <button className="btn btn-sm btn-primary" onClick={() => setSelectedEmployee(emp)}>Generate Certificate</button>
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
          <div className="modal-box w-11/12 max-w-lg">
            <h3 className="font-bold text-lg">Add Manual Certificate</h3>
            <form className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Employee Name</span></label>
                <select className="select select-bordered">
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Training Name</span></label>
                <input type="text" placeholder="Enter training name" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Completion Date</span></label>
                <input type="date" className="input input-bordered" />
              </div>
            </form>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary">Save Certificate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;
