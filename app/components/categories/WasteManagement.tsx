'use client';

import React from 'react';

interface WasteMetric {
  title: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  percentage: number;
}

const WasteManagement: React.FC = () => {
  const metrics: WasteMetric[] = [
    {
      title: 'Total Waste Generated',
      value: 50000,
      unit: 'kg',
      trend: 'down',
      percentage: 10,
    },
    {
      title: 'Recycling Rate',
      value: 65,
      unit: '%',
      trend: 'up',
      percentage: 5,
    },
    {
      title: 'Landfill Waste',
      value: 17500,
      unit: 'kg',
      trend: 'down',
      percentage: 15,
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
        Waste Management
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

        {/* Waste Composition */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Waste Composition
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Recyclable</span>
              <span className="font-medium">65%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: '65%' }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Organic</span>
              <span className="font-medium">20%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-yellow-500 h-2.5 rounded-full"
                style={{ width: '20%' }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Landfill</span>
              <span className="font-medium">15%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: '15%' }}
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
            <li>Implement comprehensive recycling program</li>
            <li>Set up composting facilities for organic waste</li>
            <li>Reduce packaging waste in supply chain</li>
            <li>Educate employees on waste segregation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WasteManagement; 