import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check } from 'lucide-react';

const ScoringModelsSetup = () => {
    const [showModal, setShowModal] = useState(false);
    const [models, setModels] = useState([
        { id: 1, name: '5-Point Scale', type: 'Rating (1-5)', weightConfig: true, default: true },
        { id: 2, name: 'Percentage Based', type: 'Numeric (%)', weightConfig: true, default: false },
    ]);
    const [scale, setScale] = useState([{ value: 1, label: 'Poor' }, { value: 5, label: 'Excellent' }]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Scoring Models Setup</h1>
                <button onClick={() => setShowModal(true)} className="btn btn-primary">
                    <Plus size={20} /> New Model
                </button>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Defined Scoring Models</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Model Name</th>
                                    <th>Scoring Type</th>
                                    <th>Weight Config Allowed</th>
                                    <th>Default</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {models.map((m) => (
                                    <tr key={m.id}>
                                        <td className="font-semibold">{m.name}</td>
                                        <td>{m.type}</td>
                                        <td className="text-center">{m.weightConfig && <Check size={20} className="text-success" />}</td>
                                        <td className="text-center">{m.default && <Check size={20} className="text-success" />}</td>
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
                        <h3 className="font-bold text-lg">Create Scoring Model</h3>
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
                                    <option>Custom Labels</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Rating Scale (if applicable)</span></label>
                                <div className="space-y-2">
                                    {scale.map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="number" value={item.value} className="input input-bordered w-20" readOnly />
                                            <input type="text" value={item.label} className="input input-bordered flex-1" readOnly />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <label className="label cursor-pointer"><span className="label-text">Allow Weight Config</span><input type="checkbox" className="toggle toggle-primary" defaultChecked /></label>
                                <label className="label cursor-pointer"><span className="label-text">Set as Default</span><input type="checkbox" className="toggle toggle-success" /></label>
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
