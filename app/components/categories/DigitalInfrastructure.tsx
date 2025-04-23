'use client';

import React, { useEffect, useState } from 'react';

interface DigitalData {
  data_centers: {
    energy_consumption: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
    pue_ratio: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
    renewable_energy: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
  };
  it_equipment: {
    server_efficiency: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
    storage_efficiency: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
    network_efficiency: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
  };
  optimization_measures: Array<{
    name: string;
    impact: string;
    status: string;
    savings: string;
  }>;
}

const DigitalInfrastructure: React.FC = () => {
  const [data, setData] = useState<DigitalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/digital');
        const digitalData = await response.json();
        setData(digitalData);
      } catch (error) {
        console.error('Error fetching digital data:', error);
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
        Digital Infrastructure
      </h2>

      <div className="space-y-6">
        {/* Data Center Metrics */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Data Center Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(data.data_centers).map(([metric, details]) => (
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

        {/* IT Equipment Efficiency */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            IT Equipment Efficiency
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(data.it_equipment).map(([metric, details]) => (
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

        {/* Optimization Measures */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Optimization Measures
          </h3>
          <div className="space-y-4">
            {data.optimization_measures.map((measure, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {measure.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {measure.savings}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm font-medium ${getImpactColor(
                        measure.impact
                      )}`}
                    >
                      {measure.impact}
                    </span>
                    <span className="text-sm text-gray-500">
                      {measure.status}
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
            <li>Implement server virtualization and consolidation</li>
            <li>Migrate to cloud-based infrastructure</li>
            <li>Upgrade to energy-efficient IT equipment</li>
            <li>Implement smart cooling systems</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DigitalInfrastructure; 