import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check } from 'lucide-react';

const FeedbackFormBuilder = () => {
  const [showModal, setShowModal] = useState(false);
  const [forms, setForms] = useState([
    { id: 1, name: 'Training Feedback FY24', type: 'Training', sections: 3, questions: 10, active: true },
    { id: 2, name: 'Peer Review Form', type: 'Appraisal', sections: 2, questions: 8, active: true },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Feedback Form Builder</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={20} /> Add Form
        </button>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Custom Forms</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Form Name</th>
                  <th>Form Type</th>
                  <th>Sections</th>
                  <th>Questions</th>
                  <th className="text-center">Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form) => (
                  <tr key={form.id}>
                    <td className="font-semibold">{form.name}</td>
                    <td><div className={`badge ${form.type === 'Training' ? 'badge-info' : 'badge-success'}`}>{form.type}</div></td>
                    <td>{form.sections}</td>
                    <td>{form.questions}</td>
                    <td className="text-center">{form.active && <Check size={20} className="text-success" />}</td>
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
          <div className="modal-box w-11/12 max-w-4xl">
            <h3 className="font-bold text-lg">Create Feedback Form</h3>
            <form className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Form Name</span></label>
                  <input type="text" placeholder="e.g., Training Feedback FY24" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Form Type</span></label>
                  <select className="select select-bordered"><option>Appraisal</option><option>Training</option></select>
                </div>
              </div>
              <div className="divider">Form Sections</div>
              <div className="form-control">
                <label className="label"><span className="label-text">Section Name</span></label>
                <input type="text" placeholder="e.g., Knowledge Delivery" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Question Type</span></label>
                <select className="select select-bordered">
                  <option>Rating (1-5)</option>
                  <option>Yes/No</option>
                  <option>Text</option>
                  <option>Multiple Choice</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Question Text</span></label>
                <textarea className="textarea textarea-bordered" placeholder="Enter the question..."></textarea>
              </div>
              <div className="flex gap-4 items-center">
                <label className="label cursor-pointer"><input type="checkbox" className="checkbox checkbox-primary mr-2" /> Required?</label>
                <div className="form-control">
                  <label className="label"><span className="label-text">Scoring Weight (%)</span></label>
                  <input type="number" placeholder="Optional" className="input input-bordered input-sm w-24" />
                </div>
              </div>
              <label className="label cursor-pointer"><span className="label-text">Active</span><input type="checkbox" className="toggle toggle-primary" /></label>
            </form>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary">Save Form</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackFormBuilder;
