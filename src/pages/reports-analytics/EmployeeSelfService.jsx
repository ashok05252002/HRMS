import React from 'react';
import { User, Calendar, FileText, DollarSign, Award } from 'lucide-react';

const EmployeeSelfService = () => {
    const features = [
        { title: 'View Appraisal Score', desc: 'Access past and current appraisal scores and feedback.', icon: User },
        { title: 'Submit Self-Review', desc: 'Complete and submit your self-review during an open appraisal cycle.', icon: FileText },
        { title: 'Training Calendar', desc: 'See upcoming training sessions and register for them.', icon: Calendar },
        { title: 'Give Feedback', desc: 'Provide feedback for completed training sessions.', icon: FileText },
        { title: 'Download Certificates', desc: 'Download certificates for completed trainings.', icon: Award },
        { title: 'View Compensation', desc: 'Check your increment history and compensation details.', icon: DollarSign },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Employee Self-Service Portal (Preview)</h1>
            <p className="text-gray-600">This is a preview of the features available to employees in their self-service portal.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div key={index} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center gap-3 mb-3">
                                <feature.icon size={24} className="text-primary" />
                                <h3 className="card-title">{feature.title}</h3>
                            </div>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeSelfService;
