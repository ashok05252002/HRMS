import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const AppraisalTemplate = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const allKras = [
    { id: 1, title: 'Technical Excellence' },
    { id: 2, title: 'Team Collaboration' },
    { id: 3, title: 'Leadership' },
    { id: 4, title: 'Innovation' },
    { id: 5, title: 'Communication' }
  ];

  const templates = [
    { id: 1, name: 'Engineering Appraisal Q1', kras: [1, 2, 4], workflow: 'Self > Manager > HR', comments: 'Mandatory' },
    { id: 2, name: 'Design Mid-Year Review', kras: [2, 4, 5], workflow: 'Self > Manager', comments: 'Optional' }
  ];

  const handleView = (template) => {
    setSelectedTemplate(template);
    setShowViewModal(true);
  };

  const renderViewModal = () => (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Template Details: {selectedTemplate.name}</h3>
        <div className="space-y-4">
          <div><span className="font-semibold">Workflow:</span> {selectedTemplate.workflow}</div>
          <div><span className="font-semibold">Comments:</span> <span className={`badge ${selectedTemplate.comments === 'Mandatory' ? 'badge-warning' : 'badge-ghost'}`}>{selectedTemplate.comments}</span></div>
          <div>
            <span className="font-semibold">Selected KRAs/KPIs:</span>
            <ul className="list-disc list-inside mt-2 bg-gray-50 p-3 rounded-lg">
              {selectedTemplate.kras.map(kraId => {
                const kra = allKras.find(k => k.id === kraId);
                return <li key={kraId}>{kra.title}</li>;
              })}
            </ul>
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
        <h1 className="text-2xl font-bold text-gray-800">Appraisal Templates</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
        >
          <Plus size={20} />
          New Template
        </button>
      </div>

      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg">Create New Appraisal Template</h3>
            <form className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Template Name</span>
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g., Engineering Appraisal"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Reviewer Workflow</span>
                  </label>
                  <select className="select select-bordered">
                    <option>Self > Manager > HR</option>
                    <option>Self > Manager</option>
                    <option>Manager > HR</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">KRAs/KPIs</span>
                </label>
                <div className="p-4 border rounded-lg h-48 overflow-y-auto">
                  {allKras.map(kra => (
                    <div key={kra.id} className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">{kra.title}</span> 
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" className="checkbox" />
                  <span className="label-text">Comments Required</span>
                </label>
              </div>

              <div className="modal-action">
                <button type="button" className="btn btn-ghost" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewModal && selectedTemplate && renderViewModal()}

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Existing Templates</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Template Name</th>
                  <th>KRAs/KPIs</th>
                  <th>Workflow</th>
                  <th>Comments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => (
                  <tr key={template.id}>
                    <td>{template.name}</td>
                    <td><div className="badge badge-primary">{template.kras.length} selected</div></td>
                    <td>{template.workflow}</td>
                    <td>
                      <div className={`badge ${template.comments === 'Mandatory' ? 'badge-warning' : 'badge-ghost'}`}>
                        {template.comments}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-ghost" onClick={() => handleView(template)}><Eye size={16} /></button>
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
    </div>
  );
};

export default AppraisalTemplate;
