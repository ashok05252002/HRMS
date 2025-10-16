import React, { useState } from 'react';
import Step1_VerifyPartA from './form16-report/Step1_VerifyPartA';
import Step2_UploadPartB from './form16-report/Step2_VerifyPartB';
import Step3_ReviewMerged from './form16-report/Step3_ReviewMerged';
import Step4_DigitalSignature from './form16-report/Step4_DigitalSignature';
import Step5_Publish from './form16-report/Step5_Publish';

const Form16Report = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [partAData, setPartAData] = useState(null);
    const [partBData, setPartBData] = useState(null);

    const steps = [
        "Verify Part A",
        "Verify Part B",
        "Review Merged Data",
        "Digital Signature",
        "Publish / Email"
    ];

    const handlePartAVerified = (data) => {
        setPartAData(data);
        setActiveStep(2);
    };

    const handlePartBVerified = (data) => {
        setPartBData(data);
        setActiveStep(3);
    };

    const handleMergedVerified = () => {
        setActiveStep(4);
    };

    const handleSigned = () => {
        setActiveStep(5);
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 1: return <Step1_VerifyPartA onVerified={handlePartAVerified} />;
            case 2: return <Step2_UploadPartB onVerified={handlePartBVerified} />;
            case 3: return <Step3_ReviewMerged onVerified={handleMergedVerified} partAData={partAData} partBData={partBData} />;
            case 4: return <Step4_DigitalSignature onSigned={handleSigned} />;
            case 5: return <Step5_Publish />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Form 16 Generation (FY 2024-2025)</h1>
            <ul className="steps w-full">
                {steps.map((step, index) => (
                    <li key={index} className={`step ${activeStep > index ? 'step-primary' : ''}`}>
                        {step}
                    </li>
                ))}
            </ul>
            <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                    {renderStepContent()}
                </div>
            </div>
        </div>
    );
};

export default Form16Report;
