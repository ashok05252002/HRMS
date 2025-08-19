import React, { useState } from 'react';
import { Plus, Edit, Trash2, Star, Phone, Mail, Eye } from 'lucide-react';

const TrainerManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [trainers, setTrainers] = useState([
    { id: 1, name: 'John Smith', type: 'Internal', contact: 'john.s@company.com', rating: 4.8, specialization: 'Frontend Technologies', bio: 'John is a senior engineer with 10+ years of experience in web development.' },
    { id: 2, name: 'Sarah Johnson', type: 'External', contact: 'sarah.j@vendor.com', rating: 4.5, specialization: 'Leadership & Management', bio: 'Sarah is a certified corporate trainer and leadership coach.' },
    { id: 3, name: 'Mike Chen', type: 'Internal', contact: 'mike.c@company.com', rating: 4.9, specialization: 'Data Science & Python', bio: 'Mike leads the data analytics team and is passionate about sharing his knowledge.' },
  ]);

  const handleView = (trainer) => {
    setSelectedTrainer(trainer);
    setShowViewModal(true);
  };

  const renderViewModal = () => (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Trainer Details: {selectedTrainer.name}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-semibold">Type:</span> <div className={`badge ${selectedTrainer.type === 'Internal' ? 'badge-info' : 'badge-success'}`}>{selectedTrainer.type}</div></div>
            <div><span className="font-semibold">Contact:</span> {selectedTrainer.contact}</div>
            <div><span className="font-semibold">Avg. Rating:</span> <div className="flex items-center gap-1"><Star size={16} className="text-yellow-400" /> {selectedTrainer.rating}</div></div>
            <div><span className="font-semibold">Specialization:</span> {selectedTrainer.specialization}</div>
          </div>
          <div>
            <span className="font-semibold">Bio:</span>
            <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedTrainer.bio}</p>
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
        <h1 className="text-2xl font-bold text-gray-800">Trainer Management</h1>
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <Plus size={20} /> Add Trainer
        </button>
      </div>

      {showViewModal && selectedTrainer && renderViewModal()}

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Trainer List</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Trainer Name</th>
                  <th>Type</th>
                  <th>Contact Info</th>
                  <th>Avg. Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainers.map((trainer) => (
                  <tr key={trainer.id}>
                    <td>{trainer.name}</td>
                    <td><div className={`badge ${trainer.type === 'Internal' ? 'badge-info' : 'badge-success'}`}>{trainer.type}</div></td>
                    <td>{trainer.contact}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400" />
                        {trainer.rating}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-ghost" onClick={() => handleView(trainer)}><Eye size={16} /></button>
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
            <h3 className="font-bold text-lg">Add New Trainer</h3>
            <form className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Trainer Name</span></label>
                <input type="text" placeholder="Enter name" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Type</span></label>
                <select className="select select-bordered">
                  <option>Internal</option>
                  <option>External</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Contact Info</span></label>
                <div className="input-group">
                  <span><Mail size={16} /></span>
                  <input type="email" placeholder="Email or Phone" className="input input-bordered w-full" />
                </div>
              </div>
            </form>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary">Save Trainer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerManagement;
