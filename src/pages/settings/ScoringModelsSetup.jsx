import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check } from 'lucide-react';

const ScoringModelsSetup = () => {
  const [showModal, setShowModal] = useState(false);
  const [models, setModels] = useState([
    { id: 1, name: '5-Point Scale', type: 'Rating (1-5)', default: true, weightConfig: true },
    { id: 2, name: 'Percentage Based', type: 'Numeric (%)', default: false, weightConfig: true },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Scoring Models Setup</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={20} /> Add Model
        </button>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Scoring Models</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Model Name</th>
                  <th>Scoring Type</th>
                  <th className="text-center">Default Model</th>
                  <th className="text-center">Weight Config Allowed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model.id}>
                    <td className="font-semibold">{model.name}</td>
                    <td>{model.type}</td>
                    <td className="text-center">{model.default && <Check size={20} className="text-success" />}</td>
                    <td className="text-center">{model.weightConfig && <Check size={20} className="text-success" />}</td>
                    <td>
                      <div className="flex gap-2">
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

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg">Add Scoring Model</h3>
            <form className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Model Name</span></label>
                <input type="text" placeholder="e.g., 5-Point Scale" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Scoring Type</span></label>
                <select className="select select-bordered">
                  <option>Numeric (%)</option>
                  <option>Rating (1-5)</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer"><span className="label-text">Default Model</span><input type="checkbox" className="toggle toggle-primary" /></label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer"><span className="label-text">Allow Weight Configuration</span><input type="checkbox" className="toggle toggle-primary" /></label>
              </div>
            </form>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary">Save Model</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoringModelsSetup;
