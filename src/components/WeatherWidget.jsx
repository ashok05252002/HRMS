import React from 'react';

const WeatherWidget = ({ time }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-br from-primary via-primary-focus to-secondary rounded-lg p-6 text-primary-content relative overflow-hidden h-full flex flex-col justify-center">
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white bg-opacity-10 rounded-full"></div>
      <div className="relative z-10">
        <div className="text-2xl font-bold mb-2">
          {formatTime(time)}
        </div>
        <div className="text-lg mb-4 opacity-80">
          Good Morning
        </div>
        <div className="text-4xl font-bold">
          35°
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
