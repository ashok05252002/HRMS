import React, { useState } from 'react';
import { User, Mail, Building, Calendar } from 'lucide-react';

const SelfAssessment = () => {
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const employee = {
    name: 'John Doe',
    id: 'EMP001',
    email: 'john.doe@company.com',
    department: 'Engineering',
    designation: 'Senior Software Engineer',
    reviewPeriod: 'Jan 2024 - Dec 2024'
  };

  const kpis = [
    {
      id: 1,
      title: 'Technical Excellence',
      description: 'Deliver high-quality code and technical solutions',
      weight: 30
    },
    {
      id: 2,
      title: 'Team Collaboration',
      description: 'Work effectively with team members and stakeholders',
      weight: 25
    },
    {
      id: 3,
      title: 'Innovation',
      description: 'Bring innovative ideas and solutions to the team',
      weight: 20
    },
    {
      id: 4,
      title: 'Communication',
      description: 'Communicate effectively with all stakeholders',
      weight: 15
    },
    {
      id: 5,
      title: 'Learning & Development',
      description: 'Continuously learn and improve skills',
      weight: 10
    }
  ];

  const handleRatingChange = (kpiId, rating) => {
    setRatings(prev => ({
      ...prev,
      [kpiId]: rating
    }));
  };

  const handleCommentChange = (kpiId, comment) => {
    setComments(prev => ({
      ...prev,
      [kpiId]: comment
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Handle form submission
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Self Assessment</h1>

      {/* Employee Information */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Employee Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <User size={20} className="text-blue-600" />
              <div>
                <div className="font-medium">{employee.name}</div>
                <div className="text-sm text-gray-500">ID: {employee.id}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-blue-600" />
              <div>
                <div className="font-medium">{employee.email}</div>
                <div className="text-sm text-gray-500">{employee.designation}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building size={20} className="text-blue-600" />
              <div>
                <div className="font-medium">{employee.department}</div>
                <div className="text-sm text-gray-500">Department</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-blue-600" />
              <div>
                <div className="font-medium">{employee.reviewPeriod}</div>
                <div className="text-sm text-gray-500">Review Period</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Self Assessment Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Performance Assessment</h2>
          <div className="space-y-6">
            {kpis.map((kpi) => (
              <div key={kpi.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{kpi.title}</h3>
                  <div className="badge badge-primary">{kpi.weight}%</div>
                </div>
                <p className="text-gray-600 mb-4">{kpi.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Self Rating</span>
                    </label>
                    <div className="rating rating-lg">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <input
                          key={star}
                          type="radio"
                          name={`rating-${kpi.id}`}
                          className="mask mask-star-2 bg-orange-400"
                          checked={ratings[kpi.id] === star}
                          onChange={() => handleRatingChange(kpi.id, star)}
                          disabled={submitted}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {ratings[kpi.id] ? `${ratings[kpi.id]}/5` : 'Not rated'}
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Comments</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-20"
                      placeholder="Enter your comments..."
                      value={comments[kpi.id] || ''}
                      onChange={(e) => handleCommentChange(kpi.id, e.target.value)}
                      disabled={submitted}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!submitted && (
            <div className="card-actions justify-end mt-6">
              <button className="btn btn-ghost">Save Draft</button>
              <button 
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit Assessment
              </button>
            </div>
          )}

          {submitted && (
            <div className="alert alert-success mt-6">
              <div>
                <h3 className="font-bold">Assessment Submitted!</h3>
                <div className="text-xs">Your self-assessment has been submitted and locked for review.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelfAssessment;
