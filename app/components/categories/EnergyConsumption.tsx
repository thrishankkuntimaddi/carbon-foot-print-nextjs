'use client';

import React from 'react';

interface EnergyMetric {
  title: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  percentage: number;
}

const EnergyConsumption: React.FC = () => {
  const metrics: EnergyMetric[] = [
    {
      title: 'Total Electricity Usage',
      value: 150000,
      unit: 'kWh',
      trend: 'down',
      percentage: 8,
    },
    {
      title: 'Renewable Energy',
      value: 45000,
      unit: 'kWh',
      trend: 'up',
      percentage: 15,
    },
    {
      title: 'Energy Efficiency Score',
      value: 85,
      unit: '%',
      trend: 'up',
      percentage: 5,
    },
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
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
        Energy Consumption
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

        {/* Detailed Breakdown */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Energy Source Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Renewable Energy</span>
              <span className="font-medium">30%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: '30%' }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Fossil Fuels</span>
              <span className="font-medium">70%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: '70%' }}
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
            <li>Implement LED lighting across all facilities</li>
            <li>Upgrade HVAC systems to energy-efficient models</li>
            <li>Install solar panels on facility rooftops</li>
            <li>Implement smart energy monitoring systems</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EnergyConsumption; 