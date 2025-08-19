import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const AppraisalCycles = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [formData, setFormData] = useState({
    cycleName: '',
    startDate: '',
    endDate: '',
    applicableRoles: [],
    reviewerLevels: 1,
    scoringModel: '5-point',
    lockAfterSubmission: false
  });

  const cycles = [
    {
      id: 1,
      name: 'Annual Performance Review 2024',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Active',
      completion: '68%',
      applicableRoles: ['Software Engineer', 'Senior Developer', 'Team Lead', 'Manager'],
      reviewerLevels: 3,
      scoringModel: '5-Point Scale',
      lockAfterSubmission: true,
    },
    {
      id: 2,
      name: 'Mid-Year Review 2024',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      status: 'Completed',
      completion: '100%',
      applicableRoles: ['All Roles'],
      reviewerLevels: 2,
      scoringModel: 'Percentage Based',
      lockAfterSubmission: true,
    }
  ];

  const handleView = (cycle) => {
    setSelectedCycle(cycle);
    setShowViewModal(true);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAddModal(false);
    // Handle form submission
  };

  const renderViewModal = () => (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Cycle Details: {selectedCycle.name}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-semibold">Start Date:</span> {selectedCycle.startDate}</div>
            <div><span className="font-semibold">End Date:</span> {selectedCycle.endDate}</div>
            <div><span className="font-semibold">Scoring Model:</span> {selectedCycle.scoringModel}</div>
            <div><span className="font-semibold">Reviewer Levels:</span> {selectedCycle.reviewerLevels}</div>
            <div><span className="font-semibold">Status:</span> <span className={`badge ${selectedCycle.status === 'Active' ? 'badge-success' : 'badge-neutral'}`}>{selectedCycle.status}</span></div>
            <div><span className="font-semibold">Lock After Submission:</span> {selectedCycle.lockAfterSubmission ? 'Yes' : 'No'}</div>
          </div>
          <div>
            <span className="font-semibold">Applicable Roles:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedCycle.applicableRoles.map(role => <div key={role} className="badge badge-outline">{role}</div>)}
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
        <h1 className="text-2xl font-bold text-gray-800">Appraisal Cycles</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
        >
          <Plus size={20} />
          New Cycle
        </button>
      </div>

      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-4xl">
            <h3 className="font-bold text-lg">Create New Appraisal Cycle</h3>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Cycle Name</span>
                  </label>
                  <input 
                    type="text"
                    placeholder="Enter cycle name"
                    className="input input-bordered"
                    value={formData.cycleName}
                    onChange={(e) => setFormData({...formData, cycleName: e.target.value})}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Scoring Model</span>
                  </label>
                  <select 
                    className="select select-bordered"
                    value={formData.scoringModel}
                    onChange={(e) => setFormData({...formData, scoringModel: e.target.value})}
                  >
                    <option value="5-point">5-Point Scale</option>
                    <option value="percentage">Percentage Based</option>
                    <option value="10-point">10-Point Scale</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Start Date</span>
                  </label>
                  <input 
                    type="date"
                    className="input input-bordered"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">End Date</span>
                  </label>
                  <input 
                    type="date"
                    className="input input-bordered"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Applicable Roles</span>
                  </label>
                  <select className="select select-bordered" multiple>
                    <option>Software Engineer</option>
                    <option>Senior Developer</option>
                    <option>Team Lead</option>
                    <option>Manager</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Reviewer Levels</span>
                  </label>
                  <input 
                    type="number"
                    min="1"
                    max="5"
                    className="input input-bordered"
                    value={formData.reviewerLevels}
                    onChange={(e) => setFormData({...formData, reviewerLevels: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-4">
                  <input 
                    type="checkbox"
                    className="checkbox"
                    checked={formData.lockAfterSubmission}
                    onChange={(e) => setFormData({...formData, lockAfterSubmission: e.target.checked})}
                  />
                  <span className="label-text">Lock after submission</span>
                </label>
              </div>

              <div className="modal-action">
                <button type="button" className="btn btn-ghost" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Cycle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewModal && selectedCycle && renderViewModal()}

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Existing Cycles</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Cycle Name</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Completion</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cycles.map((cycle) => (
                  <tr key={cycle.id}>
                    <td>{cycle.name}</td>
                    <td>{cycle.startDate} to {cycle.endDate}</td>
                    <td>
                      <div className={`badge ${cycle.status === 'Active' ? 'badge-success' : 'badge-neutral'}`}>
                        {cycle.status}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <progress className="progress progress-primary w-20" value={parseInt(cycle.completion)} max="100"></progress>
                        <span className="text-sm">{cycle.completion}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-ghost" onClick={() => handleView(cycle)}>
                          <Eye size={16} />
                        </button>
                        <button className="btn btn-sm btn-ghost">
                          <Edit size={16} />
                        </button>
                        <button className="btn btn-sm btn-ghost text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
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

export default AppraisalCycles;
