import React, { useState } from 'react';
import { Key, RefreshCw, UserCheck } from 'lucide-react';

const Step4_DigitalSignature = ({ onSigned }) => {
    const [isSigning, setIsSigning] = useState(false);

    const handleSign = () => {
        setIsSigning(true);
        setTimeout(() => {
            onSigned();
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 4: Digital Signature</h3>
            <p className="text-sm text-base-content/70">Please use the digital signer utility to sign the generated Form 16 documents.</p>

            <div className="card bg-base-200 shadow-inner">
                <div className="card-body">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <button className="btn btn-outline">
                            <Key size={16} /> Download Digital Signer Utility
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Signer Login ID</span></label>
                            <input type="text" placeholder="Enter login ID" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Signer Password</span></label>
                            <input type="password" placeholder="Enter password" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Select Token/Key</span></label>
                            <select className="select select-bordered">
                                <option>ePass2003</option>
                                <option>SafeNet eToken</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Authorized Signatory</span></label>
                            <select className="select select-bordered">
                                <option>Mr. Anand Kumar</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <button className="btn btn-ghost">Back</button>
                <button onClick={handleSign} className={`btn btn-primary ${isSigning ? 'loading' : ''}`} disabled={isSigning}>
                    {!isSigning && <UserCheck size={16} />}
                    {isSigning ? 'Signing Documents...' : 'Sign & Proceed'}
                </button>
            </div>
        </div>
    );
};

export default Step4_DigitalSignature;
