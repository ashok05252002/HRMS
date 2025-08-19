import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuarterlyDashboard from './tds-compliance/QuarterlyDashboard';
import QuarterlyWorkflow from './tds-compliance/QuarterlyWorkflow';

const TdsCompliance = () => {
    return (
        <Routes>
            <Route path="/" element={<QuarterlyDashboard />} />
            <Route path="/:quarterId" element={<QuarterlyWorkflow />} />
        </Routes>
    );
};

export default TdsCompliance;
