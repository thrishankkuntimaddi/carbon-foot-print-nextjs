'use client';

import React, { useEffect, useState } from 'react';

interface MaterialData {
  raw_materials: {
    [key: string]: {
      usage: number;
      unit: string;
      carbon_intensity: number;
      trend: string;
      percentage: number;
    };
  };
  sustainable_materials: {
    [key: string]: {
      usage: number;
      unit: string;
      carbon_intensity: number;
      trend: string;
      percentage: number;
    };
  };
  sourcing: {
    local_suppliers: {
      percentage: number;
      trend: string;
      change: number;
    };
    international_suppliers: {
      percentage: number;
      trend: string;
      change: number;
    };
  };
}

const Materials: React.FC = () => {
  const [data, setData] = useState<MaterialData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/materials');
        const materialsData = await response.json();
        setData(materialsData);
      } catch (error) {
        console.error('Error fetching materials data:', error);
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
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Materials</h2>

      <div className="space-y-6">
        {/* Raw Materials */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Raw Materials Usage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(data.raw_materials).map(([material, details]) => (
              <div key={material} className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 capitalize">
                  {material.replace('_', ' ')}
                </h4>
                <div className="mt-2">
                  <p className="text-2xl font-semibold text-gray-900">
                    {details.usage.toLocaleString()} {details.unit}
                  </p>
                  <p className="text-sm text-gray-600">
                    Carbon Intensity: {details.carbon_intensity} kg CO2e/kg
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

        {/* Sustainable Materials */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Sustainable Materials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(data.sustainable_materials).map(
              ([material, details]) => (
                <div key={material} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 capitalize">
                    {material.replace('_', ' ')}
                  </h4>
                  <div className="mt-2">
                    <p className="text-2xl font-semibold text-gray-900">
                      {details.usage.toLocaleString()} {details.unit}
                    </p>
                    <p className="text-sm text-gray-600">
                      Carbon Intensity: {details.carbon_intensity} kg CO2e/kg
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
              )
            )}
          </div>
        </div>

        {/* Sourcing Distribution */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Supplier Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Local Suppliers</span>
              <span className="font-medium">
                {data.sourcing.local_suppliers.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{
                  width: `${data.sourcing.local_suppliers.percentage}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">International Suppliers</span>
              <span className="font-medium">
                {data.sourcing.international_suppliers.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{
                  width: `${data.sourcing.international_suppliers.percentage}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recommendations
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Increase use of recycled materials</li>
            <li>Source more materials locally</li>
            <li>Implement material efficiency programs</li>
            <li>Develop sustainable material alternatives</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Materials; 