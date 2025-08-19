import React, { useState } from 'react';
import { Search, Filter, Download, Eye } from 'lucide-react';

const AppraisalHistory = () => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const history = [
    { id: 1, name: 'John Doe', cycle: 'Annual 2024', score: 4.1, status: 'Completed', date: '2025-01-15', selfComments: 'I believe I met all my targets and contributed significantly to the new platform launch.', managerComments: 'John consistently delivers high-quality work and is a great mentor to junior developers. His work on the new platform was exceptional.', hrComments: 'Performance aligns with promotion to the next level. Salary revision recommended.' },
    { id: 2, name: 'Jane Smith', cycle: 'Annual 2024', score: 3.9, status: 'Completed', date: '2025-01-14', selfComments: 'I have improved my backend skills and took on more responsibilities this cycle.', managerComments: 'Jane has shown great progress. She needs to be more proactive in team discussions. Additional training on system design is recommended.', hrComments: 'Good progress. Recommend training and re-evaluation in the next cycle.' },
    { id: 3, name: 'John Doe', cycle: 'Mid-Year 2023', score: 3.8, status: 'Completed', date: '2024-07-20', selfComments: 'Focused on improving my testing skills.', managerComments: 'Improvement in test coverage noted. Keep up the good work.', hrComments: 'Steady performance.' }
  ];

  const handleView = (item) => {
    setSelectedHistory(item);
    setShowViewModal(true);
  };

  const renderViewModal = () => (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-3xl">
        <h3 className="font-bold text-lg mb-4">Appraisal Details</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><span className="font-semibold">Employee:</span> {selectedHistory.name}</div>
            <div><span className="font-semibold">Cycle:</span> {selectedHistory.cycle}</div>
            <div><span className="font-semibold">Final Score:</span> <div className="badge badge-info">{selectedHistory.score}/5</div></div>
            <div><span className="font-semibold">Completion Date:</span> {selectedHistory.date}</div>
          </div>
          <div className="divider">Reviewer Comments</div>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">Self Comments:</h4>
              <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{selectedHistory.selfComments}</p>
            </div>
            <div>
              <h4 className="font-semibold">Manager Comments:</h4>
              <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{selectedHistory.managerComments}</p>
            </div>
            <div>
              <h4 className="font-semibold">HR Remarks:</h4>
              <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{selectedHistory.hrComments}</p>
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
      <h1 className="text-2xl font-bold text-gray-800">Appraisal History</h1>
      {showViewModal && selectedHistory && renderViewModal()}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <h2 className="card-title">Completed Appraisals</h2>
            <div className="flex flex-wrap gap-2">
              <div className="form-control">
                <input type="text" placeholder="Search Employee..." className="input input-bordered input-sm" />
              </div>
              <div className="form-control">
                <select className="select select-bordered select-sm">
                  <option>All Cycles</option>
                  <option>Annual 2024</option>
                  <option>Mid-Year 2023</option>
                </select>
              </div>
              <button className="btn btn-sm btn-ghost"><Filter size={16} /> Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Appraisal Cycle</th>
                  <th>Final Score</th>
                  <th>Completion Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.cycle}</td>
                    <td><div className="badge badge-info">{item.score}/5</div></td>
                    <td>{item.date}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-outline" onClick={() => handleView(item)}>
                          <Eye size={16} /> Details
                        </button>
                        <button className="btn btn-sm btn-primary">
                          <Download size={16} /> PDF
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

export default AppraisalHistory;
