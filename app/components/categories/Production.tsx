'use client';

import React, { useEffect, useState } from 'react';

interface ProductionData {
  manufacturing: {
    energy_intensity: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
    process_emissions: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
    automation_level: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
  };
  efficiency_metrics: {
    material_efficiency: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
    energy_efficiency: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
    waste_reduction: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
  };
  process_improvements: Array<{
    name: string;
    impact: string;
    status: string;
    savings: string;
  }>;
}

const Production: React.FC = () => {
  const [data, setData] = useState<ProductionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/production');
        const productionData = await response.json();
        setData(productionData);
      } catch (error) {
        console.error('Error fetching production data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Production Processes
      </h2>

      <div className="space-y-6">
        {/* Manufacturing Metrics */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Manufacturing Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(data.manufacturing).map(([metric, details]) => (
              <div key={metric} className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 capitalize">
                  {metric.replace('_', ' ')}
                </h4>
                <div className="mt-2">
                  <p className="text-2xl font-semibold text-gray-900">
                    {details.value.toLocaleString()} {details.unit}
                  </p>
                  <span
                    className={`text-sm font-medium ${getTrendColor(
                      details.trend
                    )}`}
                  >
                    {getTrendIcon(details.trend)} {details.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Metrics */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Efficiency Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(data.efficiency_metrics).map(([metric, details]) => (
              <div key={metric} className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 capitalize">
                  {metric.replace('_', ' ')}
                </h4>
                <div className="mt-2">
                  <p className="text-2xl font-semibold text-gray-900">
                    {details.value.toLocaleString()} {details.unit}
                  </p>
                  <span
                    className={`text-sm font-medium ${getTrendColor(
                      details.trend
                    )}`}
                  >
                    {getTrendIcon(details.trend)} {details.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Improvements */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Process Improvements
          </h3>
          <div className="space-y-4">
            {data.process_improvements.map((improvement, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {improvement.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {improvement.savings}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm font-medium ${getImpactColor(
                        improvement.impact
                      )}`}
                    >
                      {improvement.impact}
                    </span>
                    <span className="text-sm text-gray-500">
                      {improvement.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recommendations
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Implement automated quality control systems</li>
            <li>Optimize production schedules for energy efficiency</li>
            <li>Upgrade to energy-efficient machinery</li>
            <li>Implement waste heat recovery systems</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Production; 