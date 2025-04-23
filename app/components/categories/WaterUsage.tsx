'use client';

import React, { useEffect, useState } from 'react';

interface WaterData {
  consumption: {
    total_usage: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
    recycled_water: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
    water_efficiency: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
  };
  wastewater: {
    treatment_efficiency: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
    discharge_quality: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
    recycling_rate: {
      value: number;
      unit: string;
      trend: string;
      percentage: number;
    };
  };
  conservation_measures: Array<{
    name: string;
    impact: string;
    status: string;
    savings: string;
  }>;
}

const WaterUsage: React.FC = () => {
  const [data, setData] = useState<WaterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/water');
        const waterData = await response.json();
        setData(waterData);
      } catch (error) {
        console.error('Error fetching water data:', error);
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
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Water Usage</h2>

      <div className="space-y-6">
        {/* Water Consumption */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Water Consumption
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(data.consumption).map(([metric, details]) => (
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

        {/* Wastewater Management */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Wastewater Management
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(data.wastewater).map(([metric, details]) => (
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

        {/* Conservation Measures */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Conservation Measures
          </h3>
          <div className="space-y-4">
            {data.conservation_measures.map((measure, index) => (
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
            <li>Implement water-efficient fixtures and equipment</li>
            <li>Enhance water recycling and reuse systems</li>
            <li>Install smart water monitoring systems</li>
            <li>Develop water conservation awareness programs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WaterUsage; 