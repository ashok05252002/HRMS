import React, { useState } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';

const Step3_UploadCSI = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setUploading(true);
            setValidated(false);
            // Simulate upload and validation
            setTimeout(() => {
                setUploading(false);
                setValidated(true);
            }, 1500);
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-lg">Step 3: Upload CSI File</h3>
            <p className="text-sm text-base-content/70">Upload the Challan Status Inquiry (CSI) file you downloaded from the NSDL website to validate your challan payments.</p>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 p-6 border-2 border-dashed rounded-lg text-center bg-base-200">
                    <UploadCloud size={48} className="mx-auto text-primary" />
                    <p className="mt-4">Drag & drop your CSI file here, or click to browse.</p>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs mt-4" onChange={handleFileChange} accept=".csi" />
                </div>
                <div className="flex-1 p-6 border rounded-lg">
                    <h4 className="font-semibold mb-4">Validation Status</h4>
                    {uploading && <div className="flex items-center gap-2"><span className="loading loading-spinner loading-sm"></span> Validating challans...</div>}
                    {validated && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-success">
                                <CheckCircle size={20} />
                                <div>
                                    <p className="font-medium">CSI File Validated</p>
                                    <p className="text-xs">{file.name}</p>
                                </div>
                            </div>
                            <p>All challan details have been successfully validated.</p>
                        </div>
                    )}
                    {!file && !uploading && <p className="text-base-content/60">Please upload a file to proceed.</p>}
                </div>
            </div>
        </div>
    );
};

export default Step3_UploadCSI;
