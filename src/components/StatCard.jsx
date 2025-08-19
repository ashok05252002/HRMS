import React from 'react';

const StatCard = ({ title, subtitle, count, icon: Icon, color, bgColor }) => {
  return (
    <div className="bg-base-100 rounded-lg shadow-sm border border-base-300 p-4 h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon size={20} className={color} />
        </div>
        <div>
          <div className="text-sm text-base-content/70">{title}</div>
          <div className="text-xs text-base-content/50">{subtitle}</div>
        </div>
      </div>
      <div className={`text-2xl font-bold ${color}`}>
        {count}
      </div>
    </div>
  );
};

export default StatCard;
