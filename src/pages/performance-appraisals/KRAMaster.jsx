import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const KRAMaster = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedKra, setSelectedKra] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    weight: '',
    applicableRoles: []
  });

  const kras = [
    {
      id: 1,
      title: 'Technical Excellence',
      description: 'Deliver high-quality, scalable, and maintainable code. Adhere to coding standards and best practices. Actively participate in code reviews and provide constructive feedback to peers. Keep up-to-date with emerging technologies and apply them to projects where appropriate.',
      weight: 30,
      roles: ['Software Engineer', 'Senior Developer']
    },
    {
      id: 2,
      title: 'Team Collaboration',
      description: 'Work effectively with team members, product managers, and designers. Communicate clearly and proactively. Contribute to a positive and inclusive team environment. Share knowledge and mentor junior team members.',
      weight: 25,
      roles: ['All Roles']
    },
    {
      id: 3,
      title: 'Leadership',
      description: 'Guide and mentor team members, fostering their growth and development. Take ownership of projects and drive them to completion. Make sound technical decisions and effectively delegate tasks.',
      weight: 20,
      roles: ['Team Lead', 'Manager']
    }
  ];

  const totalWeight = kras.reduce((sum, kra) => sum + kra.weight, 0);

  const handleView = (kra) => {
    setSelectedKra(kra);
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
            <h3 className="font-bold text-lg mb-4">KRA/KPI Details: {selectedKra.title}</h3>
            <div className="space-y-4">
                <div><span className="font-semibold">Weight:</span> <div className="badge badge-primary">{selectedKra.weight}%</div></div>
                <div>
                    <span className="font-semibold">Applicable Roles:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedKra.roles.map(role => <div key={role} className="badge badge-outline">{role}</div>)}
                    </div>
                </div>
                <div>
                    <span className="font-semibold">Description:</span>
                    <p className="mt-1 text-base-content/80 bg-base-200 p-3 rounded-lg">{selectedKra.description}</p>
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
        <h1 className="text-2xl font-bold">KRA/KPI Master</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
        >
          <Plus size={20} />
          Add KRA/KPI
        </button>
      </div>

      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg">Add New KRA/KPI</h3>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">KRA/KPI Title</span>
                  </label>
                  <input 
                    type="text"
                    placeholder="Enter title"
                    className="input input-bordered"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Weight %</span>
                  </label>
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Enter weight percentage"
                    className="input input-bordered"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered h-24"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
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
                  <option>All Roles</option>
                </select>
              </div>

              <div className="modal-action">
                <button type="button" className="btn btn-ghost" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save KRA/KPI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewModal && selectedKra && renderViewModal()}

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title">KRA/KPI List</h2>
            <div className="stats bg-transparent">
              <div className="stat p-0">
                <div className="stat-title">Total Weight</div>
                <div className={`stat-value text-lg ${totalWeight === 100 ? 'text-success' : 'text-warning'}`}>
                  {totalWeight}%
                </div>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Weight %</th>
                  <th>Applicable Roles</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {kras.map((kra) => (
                  <tr key={kra.id}>
                    <td className="font-medium">{kra.title}</td>
                    <td>
                      <div className="max-w-xs truncate" title={kra.description}>
                        {kra.description}
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-primary">{kra.weight}%</div>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {kra.roles.map((role, index) => (
                          <div key={index} className="badge badge-outline badge-sm">
                            {role}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-ghost" onClick={() => handleView(kra)}>
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

export default KRAMaster;
