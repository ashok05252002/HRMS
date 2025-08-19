import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import { faker } from '@faker-js/faker';

const Step1_UploadPartA = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [pans, setPans] = useState([]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setUploading(true);
            // Simulate upload and validation
            setTimeout(() => {
                setUploading(false);
                onUploadSuccess(selectedFile);
                setPans(Array.from({ length: 5 }, () => `${faker.string.alpha(5).toUpperCase()}${faker.string.numeric(4)}${faker.string.alpha(1).toUpperCase()}`));
            }, 1500);
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-lg">Step 1: Upload Part A (Downloaded from TRACES)</h3>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 p-6 border-2 border-dashed rounded-lg text-center bg-base-200">
                    <UploadCloud size={48} className="mx-auto text-primary" />
                    <p className="mt-4">Drag & drop your Part A ZIP/PDF file here, or click to browse.</p>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs mt-4" onChange={handleFileChange} accept=".zip,.pdf" />
                    <p className="text-xs text-base-content/60 mt-2">Maximum file size: 10MB</p>
                    <a href="#" className="link link-secondary text-sm mt-4 inline-block">Download Sample Part A</a>
                </div>
                <div className="flex-1 p-6 border rounded-lg">
                    <h4 className="font-semibold mb-4">Upload Status</h4>
                    {uploading && <div className="flex items-center gap-2"><span className="loading loading-spinner loading-sm"></span> Validating file...</div>}
                    {file && !uploading && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-success">
                                <CheckCircle size={20} />
                                <div>
                                    <p className="font-medium">File Uploaded & Validated</p>
                                    <p className="text-xs">{file.name}</p>
                                </div>
                            </div>
                            <div>
                                <h5 className="font-medium">Detected PANs:</h5>
                                <ul className="list-disc list-inside text-sm font-mono bg-base-200 p-2 rounded mt-1">
                                    {pans.map(pan => <li key={pan}>{pan}</li>)}
                                </ul>
                            </div>
                        </div>
                    )}
                    {!file && !uploading && <p className="text-base-content/60">Please upload a file to proceed.</p>}
                </div>
            </div>
        </div>
    );
};

export default Step1_UploadPartA;
