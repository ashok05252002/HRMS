import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Filter } from 'lucide-react';

const TrainingCalendar = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);

  const trainingSessions = [
    {
      id: 1,
      title: 'React Advanced Concepts',
      trainer: 'John Smith',
      date: '2024-01-15',
      time: '09:00 AM - 12:00 PM',
      location: 'Conference Room A',
      type: 'Internal',
      maxCapacity: 20,
      enrolled: 12,
      status: 'Confirmed',
      department: 'Engineering'
    },
    {
      id: 2,
      title: 'Leadership Skills Workshop',
      trainer: 'Sarah Johnson',
      date: '2024-01-16',
      time: '02:00 PM - 05:00 PM',
      location: 'Training Room 1',
      type: 'External',
      maxCapacity: 15,
      enrolled: 8,
      status: 'Confirmed',
      department: 'All'
    },
    {
      id: 3,
      title: 'Data Analytics Fundamentals',
      trainer: 'Mike Chen',
      date: '2024-01-18',
      time: '10:00 AM - 04:00 PM',
      location: 'Online',
      type: 'Online',
      maxCapacity: 25,
      enrolled: 18,
      status: 'Pending',
      department: 'Analytics'
    }
  ];

  const openTrainingModal = (training) => {
    setSelectedTraining(training);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Training Calendar</h1>
        <div className="flex gap-2">
          <div className="btn-group">
            <button 
              className={`btn btn-sm ${viewMode === 'list' ? 'btn-active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
            <button 
              className={`btn btn-sm ${viewMode === 'calendar' ? 'btn-active' : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              Calendar
            </button>
          </div>
          <button className="btn btn-primary btn-sm">
            <Plus size={16} />
            Schedule Training
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-wrap gap-4">
            <div className="form-control">
              <select className="select select-bordered select-sm">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Sales</option>
              </select>
            </div>
            <div className="form-control">
              <select className="select select-bordered select-sm">
                <option>All Types</option>
                <option>Internal</option>
                <option>External</option>
                <option>Online</option>
              </select>
            </div>
            <div className="form-control">
              <input 
                type="date" 
                className="input input-bordered input-sm"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Training Sessions */}
      <div className="grid grid-cols-1 gap-4">
        {trainingSessions.map((session) => (
          <div key={session.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="card-title text-lg">{session.title}</h3>
                  <p className="text-gray-600 mb-3">Trainer: {session.trainer}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-blue-600" />
                      <span className="text-sm">{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-green-600" />
                      <span className="text-sm">{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-red-600" />
                      <span className="text-sm">{session.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-purple-600" />
                      <span className="text-sm">{session.enrolled}/{session.maxCapacity}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <div className={`badge ${
                    session.status === 'Confirmed' ? 'badge-success' : 
                    session.status === 'Pending' ? 'badge-warning' : 'badge-neutral'
                  }`}>
                    {session.status}
                  </div>
                  <div className="badge badge-outline">{session.type}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Department:</span>
                  <div className="badge badge-sm badge-ghost">{session.department}</div>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => openTrainingModal(session)}
                  >
                    View Details
                  </button>
                  <button className="btn btn-sm btn-primary">
                    Manage
                  </button>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                  <span>Enrollment</span>
                  <span>{session.enrolled}/{session.maxCapacity}</span>
                </div>
                <progress 
                  className="progress progress-primary w-full" 
                  value={session.enrolled} 
                  max={session.maxCapacity}
                ></progress>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Training Detail Modal */}
      {showModal && selectedTraining && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">{selectedTraining.title}</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Trainer:</span>
                  <p>{selectedTraining.trainer}</p>
                </div>
                <div>
                  <span className="font-medium">Type:</span>
                  <p>{selectedTraining.type}</p>
                </div>
                <div>
                  <span className="font-medium">Date:</span>
                  <p>{selectedTraining.date}</p>
                </div>
                <div>
                  <span className="font-medium">Time:</span>
                  <p>{selectedTraining.time}</p>
                </div>
                <div>
                  <span className="font-medium">Location:</span>
                  <p>{selectedTraining.location}</p>
                </div>
                <div>
                  <span className="font-medium">Department:</span>
                  <p>{selectedTraining.department}</p>
                </div>
              </div>
              
              <div>
                <span className="font-medium">Enrollment Status:</span>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Enrolled: {selectedTraining.enrolled}</span>
                    <span>Capacity: {selectedTraining.maxCapacity}</span>
                  </div>
                  <progress 
                    className="progress progress-primary w-full" 
                    value={selectedTraining.enrolled} 
                    max={selectedTraining.maxCapacity}
                  ></progress>
                </div>
              </div>
            </div>
            
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button className="btn btn-primary">
                Manage Enrollments
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCalendar;
