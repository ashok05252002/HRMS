import React, { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import Step1_UploadPartA from './form16-report/Step1_UploadPartA';
import Step2_VerifyPartA from './form16-report/Step2_VerifyPartA';
import Step3_VerifyPartB_System from './form16-report/Step3_UploadPartB';
import Step4_ReviewMergedData from './form16-report/Step4_VerifyPartB';
import Step5_DigitalSignature from './form16-report/Step5_DigitalSignature';
import Step6_Publish from './form16-report/Step6_Publish';

const Form16Report = () => {
    const [currentStep, setCurrentStep] = useState(1);
    
    // State to track completion of each step
    const [partAUploaded, setPartAUploaded] = useState(false);
    const [partAVerified, setPartAVerified] = useState(false);
    const [partBSystemVerified, setPartBSystemVerified] = useState(false);
    const [mergedDataVerified, setMergedDataVerified] = useState(false);
    const [isSigned, setIsSigned] = useState(false);

    const steps = [
        "Upload Part A",
        "Verify Part A",
        "Review Part B Details",
        "Preview Final Form 16",
        "Digital Signature",
        "Publish / Email"
    ];

    const handleNext = () => setCurrentStep(s => s + 1);
    const handleBack = () => setCurrentStep(s => s - 1);

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return <Step1_UploadPartA onUploadSuccess={() => setPartAUploaded(true)} />;
            case 2: return <Step2_VerifyPartA onVerified={setPartAVerified} />;
            case 3: return <Step3_VerifyPartB_System onVerified={setPartBSystemVerified} />;
            case 4: return <Step4_ReviewMergedData onVerified={setMergedDataVerified} />;
            case 5: return <Step5_DigitalSignature onSigned={setIsSigned} />;
            case 6: return <Step6_Publish />;
            default: return null;
        }
    };
    
    const isNextDisabled = () => {
        switch (currentStep) {
            case 1: return !partAUploaded;
            case 2: return !partAVerified;
            case 3: return !partBSystemVerified;
            case 4: return !mergedDataVerified;
            case 5: return !isSigned;
            default: return false;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <FileSpreadsheet size={24} className="text-primary" />
                <h1 className="text-2xl font-bold">Form 16 Generation (FY 2024-2025)</h1>
            </div>

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
                    onClick={handleBack} 
                    disabled={currentStep === 1}
                >
                    Back
                </button>
                <button 
                    className="btn btn-primary" 
                    onClick={handleNext} 
                    disabled={currentStep === steps.length || isNextDisabled()}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Form16Report;
