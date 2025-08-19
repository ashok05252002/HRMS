import React, { useState } from 'react';
import { Plus, Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

const FeedbackFormBuilder = () => {
    const [showModal, setShowModal] = useState(false);
    const [forms, setForms] = useState([
        { id: 1, name: 'Training Feedback FY24', type: 'Training', questions: 4, status: 'Active' },
        { id: 2, name: 'Peer Review Form', type: 'Appraisal', questions: 6, status: 'Active' },
        { id: 3, name: 'Exit Interview Form', type: 'HR', questions: 10, status: 'Inactive' },
    ]);
    const [questions, setQuestions] = useState([
        { text: 'How would you rate the trainer?', type: 'Rating (1-5)', required: true },
        { text: 'Was the content useful?', type: 'Yes/No', required: true },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Feedback Form Builder</h1>
                <button onClick={() => setShowModal(true)} className="btn btn-primary">
                    <Plus size={20} /> New Form
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
                                    <th>Type</th>
                                    <th>No. of Questions</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {forms.map((form) => (
                                    <tr key={form.id}>
                                        <td className="font-semibold">{form.name}</td>
                                        <td><div className="badge badge-outline">{form.type}</div></td>
                                        <td>{form.questions}</td>
                                        <td><div className={`badge ${form.status === 'Active' ? 'badge-success' : 'badge-ghost'}`}>{form.status}</div></td>
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
                        <h3 className="font-bold text-lg">Build Feedback Form</h3>
                        <form className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Form Name</span></label>
                                    <input type="text" placeholder="e.g., Training Feedback FY24" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Form Type</span></label>
                                    <select className="select select-bordered"><option>Appraisal</option><option>Training</option><option>HR</option></select>
                                </div>
                            </div>
                            <div className="divider">Questions</div>
                            
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Section Name</span></label>
                                <input type="text" placeholder="e.g., Knowledge Delivery" className="input input-bordered" />
                            </div>

                            <div className="space-y-2">
                                {questions.map((q, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2 border rounded-lg">
                                        <div className="flex-1">{q.text}</div>
                                        <div className="badge badge-info">{q.type}</div>
                                        <button className="btn btn-xs btn-ghost"><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="form-control p-4 border rounded-lg bg-base-200">
                                <label className="label"><span className="label-text font-semibold">Add New Question</span></label>
                                <textarea className="textarea textarea-bordered mb-2" placeholder="Question Text"></textarea>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label"><span className="label-text">Question Type</span></label>
                                        <select className="select select-bordered select-sm">
                                            <option>Rating (1-5)</option>
                                            <option>Yes/No</option>
                                            <option>Text</option>
                                            <option>Multiple Choice</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text">Scoring Weight (Appraisal only)</span></label>
                                        <input type="number" placeholder="%" className="input input-bordered input-sm" />
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-4 items-center">
                                    <label className="label cursor-pointer"><span className="label-text">Required?</span><input type="checkbox" className="toggle toggle-sm" /></label>
                                    <button className="btn btn-sm btn-secondary">Add Question</button>
                                </div>
                            </div>
                            
                            <div className="form-control mt-4">
                                <label className="label cursor-pointer"><span className="label-text font-semibold">Is this form active?</span><input type="checkbox" className="toggle toggle-success" defaultChecked /></label>
                            </div>
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
