import React from 'react';
import { Award, Edit, Calendar, BookOpen, MessageSquare, Download, TrendingUp, UserCircle } from 'lucide-react';

const EmployeeSelfService = () => {
    const features = [
        { title: 'View Appraisal Score', icon: Award, desc: 'Access past and current appraisal scores and feedback.' },
        { title: 'Submit Self-Review', icon: Edit, desc: 'Complete and submit your self-review during an open cycle.' },
        { title: 'Training Calendar', icon: Calendar, desc: 'See all upcoming training sessions available to you.' },
        { title: 'Register / Nominate', icon: BookOpen, desc: 'Enroll in training programs or nominate yourself.' },
        { title: 'Give Feedback', icon: MessageSquare, desc: 'Provide feedback for completed training sessions.' },
        { title: 'Download Certificates', icon: Download, desc: 'Download certificates for completed training programs.' },
        { title: 'View Compensation Changes', icon: TrendingUp, desc: 'Review your salary and compensation history.' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <UserCircle size={24} className="text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">Employee Self-Service Features</h1>
            </div>
            <p className="text-gray-600">This page provides an overview of the features available to employees in their portal.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div key={index} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center gap-3 mb-3">
                                <feature.icon size={24} className="text-blue-600" />
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
