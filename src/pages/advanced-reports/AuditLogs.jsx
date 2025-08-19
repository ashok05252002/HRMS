import React from 'react';
import { Search, Filter } from 'lucide-react';
import { faker } from '@faker-js/faker';

// Generate more comprehensive mock data
const logTypes = ['Appraisal Edit', 'Salary Revision', 'Login Success', 'Setting Change', 'Training Enrollment', 'Failed Login'];
const users = ['HR Admin', 'Manager Bob', 'Finance Lead', 'John Doe', 'Super Admin'];

const generateLogEntry = (id) => {
    const logType = faker.helpers.arrayElement(logTypes);
    const user = faker.helpers.arrayElement(users);
    let changeDetails = '';

    switch (logType) {
        case 'Appraisal Edit':
            changeDetails = `Edited score for ${faker.person.fullName()} from ${faker.number.float({ min: 3, max: 4, precision: 0.1 })} to ${faker.number.float({ min: 4, max: 5, precision: 0.1 })}`;
            break;
        case 'Salary Revision':
            const oldCTC = faker.finance.amount(50000, 80000, 0);
            const newCTC = (parseFloat(oldCTC) * 1.1).toFixed(0);
            changeDetails = `Approved salary for ${faker.person.fullName()}. CTC: OMR ${oldCTC}.000 -> OMR ${newCTC}.000`;
            break;
        case 'Login Success':
            changeDetails = `Successful login from device: ${faker.helpers.arrayElement(['Desktop', 'Mobile'])}`;
            break;
        case 'Setting Change':
            changeDetails = `Updated Increment Rule: "FY24 Merit Rule"`;
            break;
        case 'Training Enrollment':
            changeDetails = `Enrolled ${faker.person.fullName()} in "${faker.company.catchPhraseAdjective()} Skills" training.`;
            break;
        case 'Failed Login':
            changeDetails = `3 failed login attempts. Account temporarily locked.`;
            break;
        default:
            changeDetails = faker.lorem.sentence();
    }

    return {
        id,
        logType,
        user,
        changeDetails,
        timestamp: faker.date.recent({ days: 30 }).toLocaleString(),
        sourceIp: faker.internet.ip(),
        deviceInfo: faker.helpers.arrayElement(['Chrome on Windows', 'Safari on macOS', 'Mobile App v2.1']),
    };
};

const logs = Array.from({ length: 50 }, (_, i) => generateLogEntry(i + 1));


const AuditLogs = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">System-wide Audit Logs</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <h2 className="card-title">Change History</h2>
            <div className="flex flex-wrap gap-2">
              <div className="form-control">
                <input type="text" placeholder="Search..." className="input input-bordered input-sm" />
              </div>
              <div className="form-control">
                <select className="select select-bordered select-sm">
                  <option>All Log Types</option>
                  {logTypes.map(type => <option key={type}>{type}</option>)}
                </select>
              </div>
              <div className="form-control">
                <input type="date" className="input input-bordered input-sm" />
              </div>
              <button className="btn btn-sm btn-ghost"><Filter size={16} /> Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Log Type</th>
                  <th>User</th>
                  <th>Change Details</th>
                  <th>Timestamp</th>
                  <th>Source IP</th>
                  <th>Device Info</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td><div className="badge badge-outline">{log.logType}</div></td>
                    <td>{log.user}</td>
                    <td className="font-mono text-xs max-w-md">{log.changeDetails}</td>
                    <td>{log.timestamp}</td>
                    <td>{log.sourceIp}</td>
                    <td>{log.deviceInfo}</td>
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

export default AuditLogs;
