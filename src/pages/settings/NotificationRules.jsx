import React from 'react';

const NotificationRules = () => {
    const rules = [
        { event: 'Appraisal Start', email: true, sms: false, inApp: true, target: 'Employee, Manager' },
        { event: 'Self Review Due in X Days', email: true, sms: true, inApp: true, target: 'Employee' },
        { event: 'Manager Review Pending', email: true, sms: false, inApp: true, target: 'Manager' },
        { event: 'HR Finalization Needed', email: true, sms: false, inApp: true, target: 'HRBP' },
        { event: 'Training Scheduled', email: true, sms: true, inApp: true, target: 'Nominated Employees' },
        { event: 'Increment Letter Issued', email: true, sms: false, inApp: true, target: 'Employee' },
        { event: 'Certificate Ready', email: true, sms: false, inApp: true, target: 'Trainee' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Notification Rules</h1>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Automated Alerts</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Event Trigger</th>
                                    <th>Target</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">SMS</th>
                                    <th className="text-center">In-App</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rules.map((rule, index) => (
                                    <tr key={index}>
                                        <td className="font-semibold">{rule.event}</td>
                                        <td>{rule.target}</td>
                                        <td className="text-center"><input type="checkbox" className="toggle toggle-sm toggle-success" defaultChecked={rule.email} /></td>
                                        <td className="text-center"><input type="checkbox" className="toggle toggle-sm toggle-success" defaultChecked={rule.sms} /></td>
                                        <td className="text-center"><input type="checkbox" className="toggle toggle-sm toggle-success" defaultChecked={rule.inApp} /></td>
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
