import React, { useState } from 'react';
import { KeyRound, User, RefreshCw, CheckCircle, Download } from 'lucide-react';

const Step4_DigitalSignature = ({ onSigned }) => {
    const [signing, setSigning] = useState(false);
    const [signed, setSigned] = useState(false);

    const handleSign = () => {
        setSigning(true);
        setTimeout(() => {
            setSigning(false);
            setSigned(true);
            onSigned(true);
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-lg">Step 4: Digital Signature</h3>
            <p className="text-sm text-base-content/70">Use your DSC token to digitally sign the merged Form 16 documents.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 p-4 border rounded-lg">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Authorized Signatory</span></label>
                        <select className="select select-bordered">
                            <option>Mr. Finance Head</option>
                            <option>Ms. HR Director</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">DSC Token Password</span></label>
                        <input type="password" placeholder="Enter token password" className="input input-bordered" />
                    </div>
                     <div className="form-control">
                        <label className="label"><span className="label-text">Select Token/Key</span></label>
                        <input type="file" className="file-input file-input-bordered file-input-sm" />
                    </div>
                </div>
                <div className="space-y-4 p-4 border rounded-lg bg-base-200 text-center flex flex-col justify-center items-center">
                    <button className="btn btn-outline btn-sm mb-4"><Download size={16} /> Download Digital Signer Utility</button>
                    <p className="text-xs text-base-content/60">Ensure the signer utility is running and your DSC token is connected.</p>
                    <button className="btn btn-ghost btn-sm"><RefreshCw size={16} /> Refresh</button>
                </div>
            </div>
            
            <div className="text-center mt-6">
                {!signed && !signing && (
                    <button className="btn btn-primary btn-lg" onClick={handleSign}>
                        <KeyRound size={20} className="mr-2" />
                        Digitally Sign Documents
                    </button>
                )}
                {signing && (
                    <div className="flex flex-col items-center gap-2">
                        <span className="loading loading-lg loading-spinner text-primary"></span>
                        <p>Signing documents... Please do not close this window.</p>
                    </div>
                )}
                {signed && (
                     <div className="alert alert-success max-w-md mx-auto">
                        <CheckCircle size={24} />
                        <div>
                            <h3 className="font-bold">Documents Signed Successfully!</h3>
                            <div className="text-xs">All Form 16 documents have been digitally signed. You can now proceed to the final step.</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Step4_DigitalSignature;
