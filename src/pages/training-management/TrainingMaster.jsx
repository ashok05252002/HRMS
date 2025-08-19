import React, { useState } from 'react';
import { Plus, Edit, Trash2, Clock, Users, DollarSign, Eye } from 'lucide-react';

const formatCurrency = (value) => `INR ${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const TrainingMaster = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [formData, setFormData] = useState({
    trainingName: '',
    type: 'internal',
    duration: '',
    durationUnit: 'hours',
    department: [],
    costPerHead: '',
    description: '',
    prerequisites: ''
  });

  const trainings = [
    {
      id: 1,
      name: 'React Advanced Concepts',
      type: 'Internal',
      duration: '8 hours',
      departments: ['Engineering', 'Design'],
      costPerHead: 5000,
      status: 'Active',
      enrolled: 12,
      capacity: 20,
      description: 'Deep dive into React hooks, context API, performance optimization, and advanced patterns.',
      prerequisites: 'Minimum 1 year of React experience. Familiarity with ES6+ JavaScript.'
    },
    {
      id: 2,
      name: 'Leadership Skills',
      type: 'External',
      duration: '2 days',
      departments: ['All'],
      costPerHead: 15000,
      status: 'Active',
      enrolled: 8,
      capacity: 15,
      description: 'A workshop for aspiring leaders covering communication, delegation, and team motivation.',
      prerequisites: 'Recommended for Team Leads and Managers.'
    },
    {
      id: 3,
      name: 'Data Analytics',
      type: 'Internal',
      duration: '16 hours',
      departments: ['Engineering', 'Analytics'],
      costPerHead: 8000,
      status: 'Draft',
      enrolled: 0,
      capacity: 25,
      description: 'Introduction to data analysis using Python libraries like Pandas and Matplotlib.',
      prerequisites: 'Basic Python knowledge.'
    }
  ];

  const handleView = (training) => {
    setSelectedTraining(training);
    setShowViewModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAddModal(false);
    // Handle form submission
  };

  const renderViewModal = () => (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-3xl">
        <h3 className="font-bold text-lg mb-4">Training Details: {selectedTraining.name}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-semibold">Type:</span> <div className="badge badge-outline">{selectedTraining.type}</div></div>
            <div><span className="font-semibold">Duration:</span> {selectedTraining.duration}</div>
            <div><span className="font-semibold">Cost per Head:</span> {formatCurrency(selectedTraining.costPerHead)}</div>
            <div><span className="font-semibold">Status:</span> <div className={`badge ${selectedTraining.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{selectedTraining.status}</div></div>
          </div>
          <div>
            <span className="font-semibold">Applicable Departments:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedTraining.departments.map(dept => <div key={dept} className="badge badge-ghost">{dept}</div>)}
            </div>
          </div>
          <div>
            <span className="font-semibold">Description:</span>
            <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedTraining.description}</p>
          </div>
          <div>
            <span className="font-semibold">Prerequisites:</span>
            <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedTraining.prerequisites}</p>
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
        <h1 className="text-2xl font-bold text-gray-800">Training Master</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
        >
          <Plus size={20} />
          Add Training
        </button>
      </div>

      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-4xl">
            <h3 className="font-bold text-lg">Add New Training</h3>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              {/* Form content remains the same */}
            </form>
          </div>
        </div>
      )}

      {showViewModal && selectedTraining && renderViewModal()}

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Training List</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Training Name</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Cost</th>
                  <th>Enrollment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainings.map((training) => (
                  <tr key={training.id}>
                    <td className="font-medium">{training.name}</td>
                    <td>
                      <div className="badge badge-outline">{training.type}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {training.duration}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <DollarSign size={16} />
                        {formatCurrency(training.costPerHead).replace('INR ', '')}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{training.enrolled}/{training.capacity}</span>
                        <progress 
                          className="progress progress-primary w-16" 
                          value={training.enrolled} 
                          max={training.capacity}
                        ></progress>
                      </div>
                    </td>
                    <td>
                      <div className={`badge ${
                        training.status === 'Active' ? 'badge-success' : 
                        training.status === 'Draft' ? 'badge-warning' : 'badge-neutral'
                      }`}>
                        {training.status}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-ghost" onClick={() => handleView(training)}>
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

export default TrainingMaster;
