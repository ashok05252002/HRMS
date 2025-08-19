import React from 'react';
import { Mail, MessageSquare, Bell } from 'lucide-react';

const NotificationRules = () => {
    const rules = [
        { event: 'Appraisal Start', target: 'Employee, Manager', channels: ['Email', 'In-app'] },
        { event: 'Self Review Due in 3 Days', target: 'Employee', channels: ['Email', 'SMS'] },
        { event: 'Manager Review Pending', target: 'Manager', channels: ['Email'] },
        { event: 'HR Finalization Needed', target: 'HRBP', channels: ['In-app'] },
        { event: 'Training Scheduled', target: 'Nominated Employees', channels: ['Email', 'SMS', 'In-app'] },
        { event: 'Increment Letter Issued', target: 'Employee', channels: ['Email'] },
        { event: 'Certificate Ready', target: 'Trainee', channels: ['Email', 'In-app'] },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Notification Rules</h1>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Automated Alerts</h2>
                    <p className="text-sm text-gray-500 mb-4">Enable, disable, and customize notifications for key events.</p>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Event Trigger</th>
                                    <th>Target Audience</th>
                                    <th>Channels</th>
                                    <th>Status</th>
                                    <th>Customize</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rules.map((rule, index) => (
                                    <tr key={index}>
                                        <td className="font-semibold">{rule.event}</td>
                                        <td>{rule.target}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                {rule.channels.includes('Email') && <Mail size={16} title="Email" />}
                                                {rule.channels.includes('SMS') && <MessageSquare size={16} title="SMS" />}
                                                {rule.channels.includes('In-app') && <Bell size={16} title="In-app" />}
                                            </div>
                                        </td>
                                        <td><input type="checkbox" className="toggle toggle-success" defaultChecked /></td>
                                        <td><button className="btn btn-sm btn-ghost">Edit Template</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationRules;
