import React from 'react';
import { Download, FileText } from 'lucide-react';

const Step4_GenerateFiles = () => {
    return (
        <div className="space-y-8 text-center p-4">
            <div className="p-6 border rounded-lg bg-base-200">
                <h3 className="font-semibold text-lg mb-4">Step 4: Generate CSI File</h3>
                <p className="text-sm text-base-content/70 mb-4">Generate the Challan Status Inquiry (CSI) file for validation.</p>
                <button className="btn btn-secondary"><FileText size={16} className="mr-2"/> Generate CSI File</button>
                <div className="mt-4 text-left hidden">
                    <p>Generated File:</p>
                    <a href="#" className="link link-primary flex items-center gap-2"><Download size={16}/> challan_q2.csi</a>
                </div>
            </div>

            <div className="p-6 border rounded-lg bg-base-200">
                <h3 className="font-semibold text-lg mb-4">Step 5: Generate FVU File</h3>
                <p className="text-sm text-base-content/70 mb-4">Once challans are allocated and validated, generate the final File Validation Utility (FVU) file for submission.</p>
                <button className="btn btn-primary"><FileText size={16} className="mr-2"/> Generate FVU File</button>
                 <div className="mt-4 text-left hidden">
                    <p>Generated File:</p>
                    <a href="#" className="link link-primary flex items-center gap-2"><Download size={16}/> form24q_q2.fvu</a>
                </div>
            </div>
        </div>
    );
};

export default Step4_GenerateFiles;
