import React, { useState } from 'react';
import { Send, Globe, CheckCircle } from 'lucide-react';

const Step5_Publish = () => {
    const [action, setAction] = useState(null);

    const handlePublish = () => {
        setAction('publish');
        setTimeout(() => setAction('published'), 2000);
    };

    const handleEmail = () => {
        setAction('email');
        setTimeout(() => setAction('emailed'), 2000);
    };

    if (action === 'published' || action === 'emailed') {
        return (
            <div className="text-center p-8">
                <CheckCircle size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-xl font-bold">Action Successful!</h3>
                <p>Form 16s have been successfully {action}.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 5: Publish or Email Form 16</h3>
            <p className="text-sm text-base-content/70">The documents are now digitally signed and ready for distribution to employees.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-base-200 text-center p-6">
                    <Globe size={40} className="mx-auto text-primary mb-4" />
                    <h4 className="font-semibold text-lg mb-2">Publish to Employee Portal</h4>
                    <p className="text-sm mb-4">Make the Form 16 available for download in each employee's self-service portal.</p>
                    <button onClick={handlePublish} className={`btn btn-primary ${action === 'publish' ? 'loading' : ''}`}>
                        {action === 'publish' ? 'Publishing...' : 'Publish Now'}
                    </button>
                </div>
                <div className="card bg-base-200 text-center p-6">
                    <Send size={40} className="mx-auto text-secondary mb-4" />
                    <h4 className="font-semibold text-lg mb-2">Email to Employees</h4>
                    <p className="text-sm mb-4">Send the password-protected Form 16 as an attachment to each employee's registered email address.</p>
                    <button onClick={handleEmail} className={`btn btn-secondary ${action === 'email' ? 'loading' : ''}`}>
                        {action === 'email' ? 'Sending Emails...' : 'Send Emails Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step5_Publish;
