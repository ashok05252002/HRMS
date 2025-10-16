import React from 'react';

const AuditLogging = () => {
    const logTypes = [
        'Appraisal Edits', 'Appraisal Submission', 'Score Lock/Finalization', 'Salary Revisions',
        'Increment Rule Trigger', 'Training Attendance', 'Feedback Submitted', 'Certificate Generated',
        'Settings Changes', 'Access Role Changes', 'Login / Logout', 'Failed Login Attempts'
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Audit & Logging Settings</h1>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Logged Event Types</h2>
                    <p className="text-gray-600">Enable or disable logging for specific event types. All actions are logged by default for compliance.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {logTypes.map((type, index) => (
                            <div key={index} className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">{type}</span>
                                    <input type="checkbox" className="toggle toggle-success" defaultChecked />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuditLogging;
