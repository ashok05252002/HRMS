import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Step1_SetParameters from './Step1_SetParameters';
import Step2_AddChallan from './Step2_AddChallan';
import Step3_UploadCSI from './Step3_UploadCSI';
import Step4_DownloadFiles from './Step4_DownloadFiles';

const QuarterlyWorkflow = () => {
    const { quarterId } = useParams();
    const [currentStep, setCurrentStep] = useState(1);
    const steps = ['Set Parameters', 'Add Challan', 'Upload CSI', 'Download Files'];

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return <Step1_SetParameters />;
            case 2: return <Step2_AddChallan />;
            case 3: return <Step3_UploadCSI />;
            case 4: return <Step4_DownloadFiles />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">24Q Filing for Quarter {quarterId.toUpperCase()}</h1>
            
            <ul className="steps w-full">
                {steps.map((step, index) => (
                    <li key={step} className={`step ${index + 1 <= currentStep ? 'step-primary' : ''}`}>
                        {step}
                    </li>
                ))}
            </ul>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {renderStepContent()}
                </div>
            </div>

            <div className="flex justify-between">
                <button 
                    className="btn" 
                    onClick={() => setCurrentStep(s => s - 1)} 
                    disabled={currentStep === 1}
                >
                    Previous
                </button>
                <button 
                    className="btn btn-primary" 
                    onClick={() => setCurrentStep(s => s + 1)} 
                    disabled={currentStep === steps.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default QuarterlyWorkflow;
