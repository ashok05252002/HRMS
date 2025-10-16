import React, { useState } from 'react';
import { Upload, FileCheck } from 'lucide-react';

const Step3_UploadCSI = ({ onComplete }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 3: Upload CSI File</h3>
            <p className="text-sm text-base-content/70">Upload the Challan Status Inquiry (CSI) file downloaded from the OLTAS portal to verify your challan payments.</p>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Select CSI File (.csi)</span>
                </label>
                <div className="flex items-center gap-4">
                    <input type="file" accept=".csi" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
                    {file && (
                        <div className="flex items-center gap-2 text-success">
                            <FileCheck size={20} />
                            <span>{file.name}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="alert alert-info">
                <div>
                    <Upload size={20} />
                    <span>Ensure the CSI file corresponds to the challans added in the previous step.</span>
                </div>
            </div>

            <div className="flex justify-end">
                <button onClick={onComplete} className="btn btn-primary" disabled={!file}>Verify & Continue</button>
            </div>
        </div>
    );
};

export default Step3_UploadCSI;
