'use client';

import React from 'react';

interface TransportMetric {
  title: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  percentage: number;
}

const Transportation: React.FC = () => {
  const metrics: TransportMetric[] = [
    {
      title: 'Fleet Emissions',
      value: 25000,
      unit: 'kg CO2e',
      trend: 'down',
      percentage: 12,
    },
    {
      title: 'Business Travel',
      value: 15000,
      unit: 'kg CO2e',
      trend: 'down',
      percentage: 8,
    },
    {
      title: 'Logistics Emissions',
      value: 35000,
      unit: 'kg CO2e',
      trend: 'down',
      percentage: 15,
    },
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-red-500';
      case 'down':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
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
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Transportation
      </h2>

      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">
                {metric.title}
              </h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {metric.value.toLocaleString()} {metric.unit}
                </p>
                <span
                  className={`ml-2 text-sm font-medium ${getTrendColor(
                    metric.trend
                  )}`}
                >
                  {getTrendIcon(metric.trend)} {metric.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Vehicle Fleet Breakdown */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Vehicle Fleet Composition
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Electric Vehicles</span>
              <span className="font-medium">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: '25%' }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Hybrid Vehicles</span>
              <span className="font-medium">35%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: '35%' }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Conventional Vehicles</span>
              <span className="font-medium">40%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: '40%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recommendations
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Increase electric vehicle adoption in fleet</li>
            <li>Implement telematics for route optimization</li>
            <li>Promote carpooling and public transit for employees</li>
            <li>Optimize delivery routes and schedules</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Transportation; 