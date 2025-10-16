import React, { useState } from 'react';
import { Plus, Download, Search } from 'lucide-react';
import { faker } from '@faker-js/faker';

const generateCertificates = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            id: i + 1,
            training: faker.helpers.arrayElement(['React Advanced', 'Leadership Skills']),
            employee: faker.person.fullName(),
            date: faker.date.past({ years: 1 }).toLocaleDateString(),
        });
    }
    return data;
};

const CertificateGenerator = () => {
    const [certificates, setCertificates] = useState(() => generateCertificates(5));
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Certificate Generator</h1>
                <button onClick={() => setShowModal(true)} className="btn btn-primary">
                    <Plus size={20} /> Add Certificate
                </button>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="card-title">Issued Certificates</h2>
                        <div className="form-control">
                            <div className="input-group">
                                <input type="text" placeholder="Search..." className="input input-bordered" />
                                <button className="btn btn-square"><Search size={20} /></button>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Training Name</th>
                                    <th>Employee Name</th>
                                    <th>Completion Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {certificates.map((cert) => (
                                    <tr key={cert.id}>
                                        <td>{cert.training}</td>
                                        <td>{cert.employee}</td>
                                        <td>{cert.date}</td>
                                        <td><button className="btn btn-sm btn-primary"><Download size={16} /> Download</button></td>
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
                        <h3 className="font-bold text-lg">Generate Certificate</h3>
                        <form className="space-y-4 mt-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Training Name</span></label>
                                <select className="select select-bordered"><option>React Advanced</option></select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Employee Name</span></label>
                                <select className="select select-bordered"><option>John Doe</option></select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Completion Date</span></label>
                                <input type="date" className="input input-bordered" />
                            </div>
                        </form>
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary">Generate</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertificateGenerator;
