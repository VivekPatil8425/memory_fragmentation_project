import React from 'react';

interface Stat {
  label: string;
  value: string;
}

interface StatisticsPanelProps {
  stats: Stat[];
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ stats }) => {
  return (
    <div className="bg-navy-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-3">Memory Statistics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-navy-700 p-3 rounded shadow-sm"
          >
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className="text-lg font-medium">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsPanel;