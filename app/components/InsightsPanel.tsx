'use client';

import React from 'react';

interface Insight {
  category: string;
  insight: string;
  impact: string;
  recommendation: string;
}

interface Alert {
  type: 'warning' | 'success' | 'info';
  message: string;
  timestamp: string;
}

interface InsightsPanelProps {
  insights: Insight[];
  alerts: Alert[];
  sustainabilityIndex: number;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({
  insights,
  alerts,
  sustainabilityIndex,
}) => {
  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'positive':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-100 border-yellow-400';
      case 'success':
        return 'bg-green-100 border-green-400';
      case 'info':
        return 'bg-blue-100 border-blue-400';
      default:
        return 'bg-gray-100 border-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Sustainability Index */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Sustainability Index
        </h2>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-blue-600"
                strokeWidth="10"
                strokeDasharray={`${sustainabilityIndex * 2.51} 251.2`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">
                {sustainabilityIndex}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Insights</h2>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">
                  {insight.category}
                </h3>
                <span
                  className={`text-sm font-medium ${getImpactColor(
                    insight.impact
                  )}`}
                >
                  {insight.impact}
                </span>
              </div>
              <p className="text-gray-600 mt-2">{insight.insight}</p>
              <p className="text-blue-600 mt-2">{insight.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Alerts</h2>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
            >
              <p className="text-gray-900">{alert.message}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(alert.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel; 