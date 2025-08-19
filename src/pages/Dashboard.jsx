import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Calendar,
  Briefcase,
  FileText,
  Clock,
  UserCircle
} from 'lucide-react';
import WeatherWidget from '../components/WeatherWidget';
import StatCard from '../components/StatCard';
import CalendarWidget from '../components/CalendarWidget';
import NotificationPanel from '../components/NotificationPanel';
import { faker } from '@faker-js/faker';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const employeeStats = [
    { 
      title: 'Employees', 
      subtitle: 'Active', 
      count: faker.number.int({ min: 150, max: 200 }),
      icon: Users, 
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    { 
      title: 'Employees', 
      subtitle: 'Inactive', 
      count: faker.number.int({ min: 10, max: 20 }),
      icon: UserX, 
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    { 
      title: 'Present', 
      subtitle: 'Today', 
      count: faker.number.int({ min: 140, max: 150 }),
      icon: UserCheck, 
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    { 
      title: 'Absent', 
      subtitle: 'Today', 
      count: faker.number.int({ min: 5, max: 10 }),
      icon: Users, 
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    { 
      title: 'On Leave', 
      subtitle: 'Today', 
      count: faker.number.int({ min: 2, max: 8 }),
      icon: Calendar, 
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    { 
      title: 'Late', 
      subtitle: 'Today', 
      count: faker.number.int({ min: 1, max: 5 }),
      icon: Clock, 
      color: 'text-info',
      bgColor: 'bg-info/10'
    },
  ];
  
  const anniversaries = Array.from({ length: 2 }, () => ({
    name: faker.person.fullName(),
    years: faker.number.int({ min: 1, max: 10 }),
    date: faker.date.soon({ days: 30 }).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  }));

  return (
    <div className="space-y-6">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <WeatherWidget time={currentTime} />
        </div>
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
            {employeeStats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalendarWidget />
        <NotificationPanel />
      </div>

      {/* Additional Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-sm border border-base-300 p-6 h-full">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase size={20} className="text-primary" />
            <h3 className="text-lg font-semibold">Work Anniversary</h3>
          </div>
          <div className="space-y-3">
            {anniversaries.map((ann, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span>{ann.name.substring(0, 1)}</span>
                  </div>
                </div>
                <div>
                  <div className="font-medium">{ann.name}</div>
                  <div className="text-sm text-base-content/70">{ann.years} years on {ann.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-sm border border-base-300 p-6 h-full">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={20} className="text-primary" />
            <h3 className="text-lg font-semibold">Documents to Review</h3>
          </div>
          <p className="text-base-content/70 text-sm">No documents to review</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
