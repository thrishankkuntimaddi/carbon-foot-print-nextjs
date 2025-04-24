'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InsightCardProps {
  title: string;
  description: string;
  icon: string;
  value: string;
  trend: 'up' | 'down';
  percentage: number;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  icon,
  value,
  trend,
  percentage,
}) => {
  const CardWrapper = motion.div;
  
  return (
    <CardWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{icon}</span>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className={`flex items-center ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
          <span className="text-sm font-medium">
            {trend === 'up' ? '↑' : '↓'} {percentage}%
          </span>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </CardWrapper>
  );
};

const CarbonFootprintInsights: React.FC = () => {
  const insights = [
    {
      title: 'Total Carbon Footprint',
      description: 'Your business\'s total carbon emissions across all categories. This includes direct and indirect emissions from your operations.',
      icon: '🌍',
      value: '1,234 tCO2e',
      trend: 'down' as const,
      percentage: 12,
    },
    {
      title: 'Energy Efficiency',
      description: 'Measures how effectively your business uses energy. Higher efficiency means lower carbon emissions per unit of output.',
      icon: '⚡',
      value: '85%',
      trend: 'up' as const,
      percentage: 5,
    },
    {
      title: 'Sustainable Practices',
      description: 'Implementation of eco-friendly practices across your operations. Includes recycling, waste reduction, and green procurement.',
      icon: '♻️',
      value: '78%',
      trend: 'up' as const,
      percentage: 8,
    },
    {
      title: 'Carbon Intensity',
      description: 'Carbon emissions per unit of revenue. Lower intensity indicates better environmental performance relative to business size.',
      icon: '📊',
      value: '0.45 tCO2e/$',
      trend: 'down' as const,
      percentage: 15,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Carbon Footprint Insights</h2>
        <p className="text-gray-600">
          Understand your business's environmental impact and track progress towards sustainability goals
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <InsightCard key={index} {...insight} />
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Why Track Carbon Footprint?</h3>
        <ul className="space-y-3 text-blue-800">
          <li>• Identify areas for environmental improvement</li>
          <li>• Meet regulatory requirements and compliance standards</li>
          <li>• Enhance brand reputation and stakeholder trust</li>
          <li>• Reduce operational costs through efficiency measures</li>
          <li>• Contribute to global sustainability goals</li>
        </ul>
      </div>
    </div>
  );
};

export default CarbonFootprintInsights; 