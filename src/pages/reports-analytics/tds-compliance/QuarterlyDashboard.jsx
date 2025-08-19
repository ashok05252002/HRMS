import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, PlayCircle } from 'lucide-react';

const QuarterlyDashboard = () => {
    const quarters = [
        { id: 'q1', name: 'Quarter 1', period: 'Apr - Jun', status: 'Completed', icon: CheckCircle, color: 'text-success' },
        { id: 'q2', name: 'Quarter 2', period: 'Jul - Sep', status: 'In Progress', icon: Clock, color: 'text-warning' },
        { id: 'q3', name: 'Quarter 3', period: 'Oct - Dec', status: 'Not Started', icon: PlayCircle, color: 'text-info' },
        { id: 'q4', name: 'Quarter 4', period: 'Jan - Mar', status: 'Not Started', icon: PlayCircle, color: 'text-info' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">TDS Compliance (Form 24Q)</h1>
            <p className="text-base-content/70">Manage your quarterly TDS filings for salaries under section 192.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quarters.map(q => (
                    <Link key={q.id} to={`/reports-analytics/tds-compliance-24q/${q.id}`} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <h2 className="card-title">{q.name}</h2>
                                <q.icon size={24} className={q.color} />
                            </div>
                            <p className="text-base-content/60">{q.period}</p>
                            <div className="card-actions justify-end mt-4">
                                <div className={`badge badge-outline ${q.color}`}>{q.status}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuarterlyDashboard;
