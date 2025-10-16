import React, { useState } from 'react';
import { CheckCircle, Clock, XCircle, ArrowRight } from 'lucide-react';
import Step1_SetParameters from './tds-compliance/Step1_SetParameters';
import Step2_AddChallan from './tds-compliance/Step2_AddChallan';
import Step3_UploadCSI from './tds-compliance/Step3_UploadCSI';
import Step4_GenerateFiles from './tds-compliance/Step4_GenerateFiles';

const TdsCompliance = () => {
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [activeStep, setActiveStep] = useState(1);

  const quarters = [
    { id: 1, name: 'Q1', period: 'Apr - Jun', status: 'Completed' },
    { id: 2, name: 'Q2', period: 'Jul - Sep', status: 'Completed' },
    { id: 3, name: 'Q3', period: 'Oct - Dec', status: 'In Progress' },
    { id: 4, name: 'Q4', period: 'Jan - Mar', status: 'Not Started' },
  ];

  const handleQuarterSelect = (quarter) => {
    setSelectedQuarter(quarter);
    setActiveStep(1);
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="text-success" />;
      case 'In Progress': return <Clock className="text-warning" />;
      case 'Not Started': return <XCircle className="text-error" />;
      default: return null;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1: return <Step1_SetParameters onComplete={() => setActiveStep(2)} />;
      case 2: return <Step2_AddChallan onComplete={() => setActiveStep(3)} />;
      case 3: return <Step3_UploadCSI onComplete={() => setActiveStep(4)} />;
      case 4: return <Step4_GenerateFiles />;
      default: return null;
    }
  };

  if (selectedQuarter) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">TDS Compliance (24Q) - {selectedQuarter.name} ({selectedQuarter.period})</h1>
          <button onClick={() => setSelectedQuarter(null)} className="btn btn-ghost">Back to Quarters</button>
        </div>
        <ul className="steps w-full">
          <li className={`step ${activeStep >= 1 ? 'step-primary' : ''}`}>Set Parameters</li>
          <li className={`step ${activeStep >= 2 ? 'step-primary' : ''}`}>Add Challan</li>
          <li className={`step ${activeStep >= 3 ? 'step-primary' : ''}`}>Upload CSI File</li>
          <li className={`step ${activeStep >= 4 ? 'step-primary' : ''}`}>Generate Files</li>
        </ul>
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            {renderStepContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">TDS Compliance (24Q)</h1>
      <p className="text-base-content/70">Manage your quarterly TDS filings for Form 24Q.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quarters.map(q => (
          <div key={q.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer" onClick={() => handleQuarterSelect(q)}>
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title">{q.name}</h2>
                {renderStatusIcon(q.status)}
              </div>
              <p className="text-base-content/70">{q.period}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">
                  {q.status === 'Completed' ? 'View' : 'Start'} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TdsCompliance;
