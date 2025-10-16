import React, { useState } from 'react';
import { Search, Check, X } from 'lucide-react';
import { faker } from '@faker-js/faker';

const generateRequests = (count) => {
    const requests = [];
    for (let i = 0; i < count; i++) {
        requests.push({
            id: i + 1,
            name: faker.person.fullName(),
            date: faker.date.recent({ days: 7 }).toLocaleDateString(),
            requestType: faker.helpers.arrayElement(['Check-in', 'Check-out']),
            time: faker.time.recent('past'),
            reason: faker.lorem.sentence(),
            status: faker.helpers.arrayElement(['Pending', 'Approved', 'Rejected']),
        });
    }
    return requests;
};

const PunchRequests = () => {
    const [requests, setRequests] = useState(() => generateRequests(10));
    const [filter, setFilter] = useState('All');

    const handleStatusChange = (id, newStatus) => {
        setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    };

    const filteredRequests = requests.filter(req => filter === 'All' || req.status === filter);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Manual Punch Requests</h1>

            <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <div className="tabs tabs-boxed">
                            <a className={`tab ${filter === 'All' ? 'tab-active' : ''}`} onClick={() => setFilter('All')}>All</a>
                            <a className={`tab ${filter === 'Pending' ? 'tab-active' : ''}`} onClick={() => setFilter('Pending')}>Pending</a>
                            <a className={`tab ${filter === 'Approved' ? 'tab-active' : ''}`} onClick={() => setFilter('Approved')}>Approved</a>
                            <a className={`tab ${filter === 'Rejected' ? 'tab-active' : ''}`} onClick={() => setFilter('Rejected')}>Rejected</a>
                        </div>
                        <div className="form-control">
                            <div className="input-group">
                                <input type="text" placeholder="Search..." className="input input-bordered" />
                                <button className="btn btn-square"><Search size={20} /></button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Date</th>
                                    <th>Request Type</th>
                                    <th>Time</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map(req => (
                                    <tr key={req.id}>
                                        <td>{req.name}</td>
                                        <td>{req.date}</td>
                                        <td>{req.requestType}</td>
                                        <td>{req.time}</td>
                                        <td className="max-w-xs truncate">{req.reason}</td>
                                        <td>
                                            <span className={`badge ${
                                                req.status === 'Approved' ? 'badge-success' :
                                                req.status === 'Rejected' ? 'badge-error' : 'badge-warning'
                                            }`}>{req.status}</span>
                                        </td>
                                        <td>
                                            {req.status === 'Pending' && (
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleStatusChange(req.id, 'Approved')} className="btn btn-xs btn-success"><Check size={14} /></button>
                                                    <button onClick={() => handleStatusChange(req.id, 'Rejected')} className="btn btn-xs btn-error"><X size={14} /></button>
                                                </div>
                                            )}
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

export default PunchRequests;
