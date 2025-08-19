import React, { useState } from 'react';
import { Send, CheckCircle, UploadCloud } from 'lucide-react';

const Step5_Publish = () => {
    const [showConfirmModal, setShowConfirmModal] = useState(null); // 'publish' or 'email'
    const [logs, setLogs] = useState([]);

    const handleAction = (action) => {
        setShowConfirmModal(action);
    };

    const confirmAction = () => {
        const actionType = showConfirmModal;
        setShowConfirmModal(null);
        // Simulate action
        const newLog = {
            type: actionType,
            message: `${actionType === 'publish' ? 'Published to' : 'Emailed'} 5 employees.`,
            timestamp: new Date().toLocaleString()
        };
        setLogs(prev => [newLog, ...prev]);
    };

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-lg">Step 5: Publish or Email Form 16</h3>
            <p className="text-sm text-base-content/70">Distribute the signed Form 16 documents to your employees.</p>
            <div className="flex justify-center gap-6 p-6 bg-base-200 rounded-lg">
                <button className="btn btn-primary" onClick={() => handleAction('publish')}>
                    <UploadCloud size={20} className="mr-2" />
                    Publish to Employee Portal
                </button>
                <button className="btn btn-secondary" onClick={() => handleAction('email')}>
                    <Send size={20} className="mr-2" />
                    Email to Employees
                </button>
            </div>

            {logs.length > 0 && (
                <div className="space-y-2">
                    <h4 className="font-semibold">Activity Log:</h4>
                    {logs.map((log, index) => (
                        <div key={index} className="alert alert-success text-sm">
                            <CheckCircle size={20} />
                            <div>
                                <p>{log.message}</p>
                                <p className="text-xs">{log.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showConfirmModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm Action</h3>
                        <p className="py-4">Are you sure you want to {showConfirmModal === 'publish' ? 'publish Form 16 to all employee portals' : 'email Form 16 to all employees'}? This action cannot be undone.</p>
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowConfirmModal(null)}>Cancel</button>
                            <button className="btn btn-primary" onClick={confirmAction}>Confirm & {showConfirmModal}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step5_Publish;
