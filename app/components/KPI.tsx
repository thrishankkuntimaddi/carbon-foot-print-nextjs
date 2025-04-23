'use client';

import React from 'react';

interface KPIProps {
  title: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  percentage: number;
}

const KPI: React.FC<KPIProps> = ({ title, value, unit, trend, percentage }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-red-500';
      case 'down':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">
          {value.toLocaleString()} {unit}
        </p>
        <span className={`ml-2 text-sm font-medium ${getTrendColor()}`}>
          {getTrendIcon()} {percentage}%
        </span>
      </div>
    </div>
  );
};

export default KPI; 