import { NextResponse } from 'next/server';

// Dummy data for insights and recommendations
const insightsData = {
  current_insights: [
    {
      category: 'Energy',
      insight: 'Electricity consumption has increased by 15% in the last month',
      impact: 'High',
      recommendation: 'Consider implementing energy-efficient lighting and HVAC systems',
    },
    {
      category: 'Transportation',
      insight: 'Fleet emissions are above target by 20%',
      impact: 'Medium',
      recommendation: 'Optimize delivery routes and consider electric vehicle adoption',
    },
    {
      category: 'Waste',
      insight: 'Recycling rate has improved by 25%',
      impact: 'Positive',
      recommendation: 'Continue current waste management practices',
    },
  ],
  sustainability_index: 75, // 0-100 scale
  alerts: [
    {
      type: 'warning',
      message: 'Energy consumption threshold exceeded',
      timestamp: '2024-03-15T10:00:00Z',
    },
    {
      type: 'success',
      message: 'Monthly reduction target achieved',
      timestamp: '2024-03-14T15:30:00Z',
    },
  ],
};

export async function GET() {
  return NextResponse.json(insightsData);
} 