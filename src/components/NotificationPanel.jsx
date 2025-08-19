import React from 'react';
import { Bell, Gift } from 'lucide-react';
import { faker } from '@faker-js/faker';

const NotificationPanel = () => {
  const notifications = [
    { text: `Leave request from ${faker.person.fullName()} is pending.`, time: '1h ago' },
    { text: `New training "${faker.company.catchPhraseAdjective()} Leadership" has been scheduled.`, time: '4h ago' },
  ];

  const birthdays = Array.from({ length: 2 }, () => ({
    name: faker.person.fullName(),
    date: faker.date.soon({ days: 30 }).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  }));

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="card bg-base-100 shadow-sm border border-base-300 p-6 flex-1">
        <div className="flex items-center gap-3 mb-4">
          <Bell size={20} className="text-primary" />
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>
        <div className="space-y-3">
          {notifications.map((notif, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
              <div>
                <p className="text-sm">{notif.text}</p>
                <p className="text-xs text-base-content/60">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card bg-base-100 shadow-sm border border-base-300 p-6 flex-1">
        <div className="flex items-center gap-3 mb-4">
          <Gift size={20} className="text-secondary" />
          <h3 className="text-lg font-semibold">Upcoming Birthdays</h3>
        </div>
        <div className="space-y-3">
          {birthdays.map((bday, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-secondary/20 text-secondary-focus rounded-full w-10">
                  <span>{bday.name.substring(0, 1)}</span>
                </div>
              </div>
              <div>
                <div className="font-medium">{bday.name}</div>
                <div className="text-sm text-base-content/70">{bday.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
