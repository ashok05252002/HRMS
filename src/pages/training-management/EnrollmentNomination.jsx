import React, { useState } from 'react';
import { Plus, Filter, UserPlus } from 'lucide-react';
import { faker } from '@faker-js/faker';

const generateEnrollments = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            id: i + 1,
            training: faker.helpers.arrayElement(['React Advanced', 'Leadership Skills', 'Data Analytics']),
            employee: faker.person.fullName(),
            nominatedBy: faker.helpers.arrayElement(['HR', 'Manager']),
            status: faker.helpers.arrayElement(['Pending', 'Confirmed', 'Attended']),
        });
    }
    return data;
};

const EnrollmentNomination = () => {
    const [enrollments, setEnrollments] = useState(() => generateEnrollments(15));
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Enrollment & Nomination</h1>
                <button onClick={() => setShowModal(true)} className="btn btn-primary">
                    <UserPlus size={20} /> Nominate Employee
                </button>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                        <h2 className="card-title">Enrollment List</h2>
                        <div className="flex flex-wrap gap-2">
                            <select className="select select-bordered select-sm"><option>All Trainings</option></select>
                            <select className="select select-bordered select-sm"><option>All Statuses</option></select>
                            <button className="btn btn-sm btn-ghost"><Filter size={16} /> Filter</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Training</th>
                                    <th>Employee</th>
                                    <th>Nominated By</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map((item) => (
                                    <tr key={item.id}>
                                        <td className="font-semibold">{item.training}</td>
                                        <td>{item.employee}</td>
                                        <td>{item.nominatedBy}</td>
                                        <td><div className={`badge ${item.status === 'Confirmed' || item.status === 'Attended' ? 'badge-success' : 'badge-warning'}`}>{item.status}</div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Nominate Employee</h3>
                        <form className="space-y-4 mt-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Training</span></label>
                                <select className="select select-bordered"><option>React Advanced</option><option>Leadership Skills</option></select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Employee</span></label>
                                <select className="select select-bordered"><option>John Doe</option><option>Jane Smith</option></select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Status</span></label>
                                <select className="select select-bordered"><option>Pending</option><option>Confirmed</option></select>
                            </div>
                        </form>
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary">Submit Nomination</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnrollmentNomination;
