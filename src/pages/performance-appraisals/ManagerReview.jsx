import React, { useState } from 'react';
import { Search, Filter, Eye, Edit } from 'lucide-react';

const ManagerReview = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const employees = [
    {
      id: 1,
      name: 'John Doe',
      designation: 'Senior Software Engineer',
      department: 'Engineering',
      selfRating: 4.2,
      managerRating: null,
      status: 'Pending Review'
    },
    {
      id: 2,
      name: 'Jane Smith',
      designation: 'Software Engineer',
      department: 'Engineering',
      selfRating: 3.8,
      managerRating: 4.0,
      status: 'Completed'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      designation: 'UI/UX Designer',
      department: 'Design',
      selfRating: 4.5,
      managerRating: null,
      status: 'Pending Review'
    }
  ];

  const kpis = [
    {
      id: 1,
      title: 'Technical Excellence',
      selfRating: 4,
      managerRating: '',
      weight: 30
    },
    {
      id: 2,
      title: 'Team Collaboration',
      selfRating: 5,
      managerRating: '',
      weight: 25
    },
    {
      id: 3,
      title: 'Innovation',
      selfRating: 4,
      managerRating: '',
      weight: 20
    }
  ];

  const [reviewData, setReviewData] = useState({
    ratings: {},
    comments: '',
    recommendation: '',
    submitted: false
  });

  const handleRatingChange = (kpiId, rating) => {
    setReviewData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [kpiId]: rating
      }
    }));
  };

  const handleSubmitReview = () => {
    setReviewData(prev => ({ ...prev, submitted: true }));
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || emp.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  if (selectedEmployee) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Manager Review - {selectedEmployee.name}</h1>
          <button 
            onClick={() => setSelectedEmployee(null)}
            className="btn btn-ghost"
          >
            Back to List
          </button>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="stat">
                <div className="stat-title">Employee</div>
                <div className="stat-value text-lg">{selectedEmployee.name}</div>
                <div className="stat-desc">{selectedEmployee.designation}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Department</div>
                <div className="stat-value text-lg">{selectedEmployee.department}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Self Rating</div>
                <div className="stat-value text-lg">{selectedEmployee.selfRating}/5</div>
              </div>
            </div>

            <div className="space-y-4">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{kpi.title}</h3>
                    <div className="badge badge-primary">{kpi.weight}%</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Self Rating</span>
                      </label>
                      <div className="rating rating-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <input
                            key={star}
                            type="radio"
                            className="mask mask-star-2 bg-orange-400"
                            checked={star <= kpi.selfRating}
                            disabled
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="label">
                        <span className="label-text">Manager Rating</span>
                      </label>
                      <div className="rating rating-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <input
                            key={star}
                            type="radio"
                            name={`manager-rating-${kpi.id}`}
                            className="mask mask-star-2 bg-blue-400"
                            checked={reviewData.ratings[kpi.id] === star}
                            onChange={() => handleRatingChange(kpi.id, star)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text">Manager Comments</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Enter your comments about the employee's performance..."
                value={reviewData.comments}
                onChange={(e) => setReviewData(prev => ({ ...prev, comments: e.target.value }))}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Final Recommendation</span>
              </label>
              <select 
                className="select select-bordered"
                value={reviewData.recommendation}
                onChange={(e) => setReviewData(prev => ({ ...prev, recommendation: e.target.value }))}
              >
                <option value="">Select recommendation</option>
                <option value="promotion">Promotion</option>
                <option value="training">Additional Training</option>
                <option value="no-change">No Change</option>
                <option value="improvement">Performance Improvement</option>
              </select>
            </div>

            <div className="card-actions justify-end mt-6">
              <button className="btn btn-ghost">Save Draft</button>
              <button 
                className="btn btn-primary"
                onClick={handleSubmitReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Manager Review</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="form-control flex-1">
              <div className="input-group">
                <span>
                  <Search size={20} />
                </span>
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="input input-bordered flex-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="form-control">
              <select 
                className="select select-bordered"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Self Rating</th>
                  <th>Manager Rating</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="font-medium">{employee.name}</div>
                    </td>
                    <td>{employee.designation}</td>
                    <td>{employee.department}</td>
                    <td>
                      <div className="badge badge-success">{employee.selfRating}/5</div>
                    </td>
                    <td>
                      {employee.managerRating ? (
                        <div className="badge badge-info">{employee.managerRating}/5</div>
                      ) : (
                        <span className="text-gray-400">Pending</span>
                      )}
                    </td>
                    <td>
                      <div className={`badge ${employee.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
                        {employee.status}
                      </div>
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => setSelectedEmployee(employee)}
                      >
                        <Edit size={16} />
                        Review
                      </button>
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

export default ManagerReview;
