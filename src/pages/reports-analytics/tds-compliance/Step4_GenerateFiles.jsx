import React from 'react';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';

const Step4_GenerateFiles = () => {
  const generatedFiles = [
    { name: 'Form24Q_Q1.fvu', type: 'FVU File', size: '1.2 MB' },
    { name: 'Annexure_I.xlsx', type: 'Annexure I', size: '850 KB' },
    { name: 'Annexure_II.xlsx', type: 'Annexure II', size: '420 KB' },
    { name: 'Form27A.pdf', type: 'Form 27A', size: '150 KB' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Step 4: Download Generated Files</h3>
      <p className="text-sm text-base-content/70">Your e-TDS files have been generated successfully. Download the files below for submission.</p>

      <div className="space-y-4">
        {generatedFiles.map(file => (
          <div key={file.name} className="card card-side bg-base-200 shadow-md">
            <div className="card-body flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                {file.type.includes('FVU') ? <FileSpreadsheet size={32} className="text-primary" /> : <FileText size={32} className="text-primary" />}
                <div>
                  <h4 className="font-semibold">{file.name}</h4>
                  <p className="text-sm text-base-content/70">{file.type} - {file.size}</p>
                </div>
              </div>
              <button className="btn btn-primary">
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step4_GenerateFiles;
