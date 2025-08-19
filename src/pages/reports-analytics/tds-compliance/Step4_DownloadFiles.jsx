import React from 'react';
import { Download, FileText } from 'lucide-react';

const Step4_DownloadFiles = () => {
    return (
        <div className="space-y-8 text-center p-4">
            <h3 className="font-semibold text-lg">Step 4: Download Files for Submission</h3>
            <p className="text-sm text-base-content/70 mb-4">Your TDS files are ready. Download them for filing.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border rounded-lg bg-base-200">
                    <h4 className="font-semibold text-lg mb-2">FVU File</h4>
                    <p className="text-xs text-base-content/60 mb-4">The final validation utility file for upload.</p>
                    <button className="btn btn-primary"><Download size={16} className="mr-2"/> Download FVU File</button>
                </div>
                
                <div className="p-6 border rounded-lg bg-base-200">
                    <h4 className="font-semibold text-lg mb-2">Annexure I</h4>
                    <p className="text-xs text-base-content/60 mb-4">Deductee wise breakup of TDS.</p>
                    <button className="btn btn-secondary"><Download size={16} className="mr-2"/> Download Annexure I</button>
                </div>

                <div className="p-6 border rounded-lg bg-base-200">
                    <h4 className="font-semibold text-lg mb-2">Annexure II</h4>
                    <p className="text-xs text-base-content/60 mb-4">Salary details as per Section 192.</p>
                    <button className="btn btn-secondary"><Download size={16} className="mr-2"/> Download Annexure II</button>
                </div>
            </div>
        </div>
    );
};

export default Step4_DownloadFiles;
