import React, { useState } from 'react';
import { Plus, Edit, Trash2, Filter, Search, Eye } from 'lucide-react';

const EnrollmentNomination = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedNomination, setSelectedNomination] = useState(null);
  const [nominations, setNominations] = useState([
    { id: 1, training: 'React Advanced Concepts', employee: 'John Doe', empDept: 'Engineering', empRole: 'Sr. Developer', nominatedBy: 'Manager', status: 'Confirmed' },
    { id: 2, training: 'Leadership Skills Workshop', employee: 'Jane Smith', empDept: 'Engineering', empRole: 'Developer', nominatedBy: 'HR', status: 'Attended' },
    { id: 3, training: 'Data Analytics Fundamentals', employee: 'Mike Johnson', empDept: 'Design', empRole: 'UI/UX Designer', nominatedBy: 'Manager', status: 'Pending' },
  ]);

  const handleView = (nomination) => {
    setSelectedNomination(nomination);
    setShowViewModal(true);
  };

  const renderViewModal = () => (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Nomination Details</h3>
        <div className="space-y-4">
          <div><span className="font-semibold">Training Program:</span> {selectedNomination.training}</div>
          <div className="divider">Employee Details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-semibold">Employee:</span> {selectedNomination.employee}</div>
            <div><span className="font-semibold">Department:</span> {selectedNomination.empDept}</div>
            <div><span className="font-semibold">Role:</span> {selectedNomination.empRole}</div>
          </div>
          <div className="divider">Nomination Info</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-semibold">Nominated By:</span> {selectedNomination.nominatedBy}</div>
            <div><span className="font-semibold">Status:</span> <div className={`badge ${
                        selectedNomination.status === 'Confirmed' ? 'badge-info' :
                        selectedNomination.status === 'Attended' ? 'badge-success' : 'badge-warning'
                      }`}>{selectedNomination.status}</div>
            </div>
          </div>
        </div>
        <div className="modal-action">
          <button type="button" className="btn" onClick={() => setShowViewModal(false)}>Close</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Enrollment & Nomination</h1>
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <Plus size={20} /> Nominate Employee
        </button>
      </div>

      {showViewModal && selectedNomination && renderViewModal()}

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <h2 className="card-title">Nomination List</h2>
            <div className="flex flex-wrap gap-2">
              <div className="form-control">
                <input type="text" placeholder="Search..." className="input input-bordered input-sm" />
              </div>
              <div className="form-control">
                <select className="select select-bordered select-sm">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Attended</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Training Program</th>
                  <th>Employee</th>
                  <th>Nominated By</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {nominations.map((nom) => (
                  <tr key={nom.id}>
                    <td>{nom.training}</td>
                    <td>{nom.employee}</td>
                    <td>{nom.nominatedBy}</td>
                    <td>
                      <div className={`badge ${
                        nom.status === 'Confirmed' ? 'badge-info' :
                        nom.status === 'Attended' ? 'badge-success' : 'badge-warning'
                      }`}>{nom.status}</div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-ghost" onClick={() => handleView(nom)}><Eye size={16} /></button>
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

      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-lg">
            <h3 className="font-bold text-lg">Nominate Employee for Training</h3>
            <form className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Training Program</span></label>
                <select className="select select-bordered">
                  <option>React Advanced Concepts</option>
                  <option>Leadership Skills Workshop</option>
                  <option>Data Analytics Fundamentals</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Employee</span></label>
                <select className="select select-bordered">
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Mike Johnson</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Nominated By</span></label>
                <input type="text" value="HR Admin (Auto-filled)" className="input input-bordered" disabled />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Status</span></label>
                <select className="select select-bordered">
                  <option>Pending</option>
                  <option>Confirmed</option>
                </select>
              </div>
            </form>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary">Submit Nomination</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentNomination;
