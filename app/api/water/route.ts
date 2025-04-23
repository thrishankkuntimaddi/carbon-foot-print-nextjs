import { NextResponse } from 'next/server';

const waterData = {
  consumption: {
    total_usage: {
      value: 150000,
      unit: 'm³',
      trend: 'down',
      percentage: 8,
    },
    recycled_water: {
      value: 45000,
      unit: 'm³',
      trend: 'up',
      percentage: 15,
    },
    water_efficiency: {
      value: 85,
      unit: '%',
      trend: 'up',
      percentage: 5,
    },
  },
  wastewater: {
    treatment_efficiency: {
      value: 92,
      unit: '%',
      trend: 'up',
      percentage: 3,
    },
    discharge_quality: {
      value: 95,
      unit: '%',
      trend: 'up',
      percentage: 2,
    },
    recycling_rate: {
      value: 78,
      unit: '%',
      trend: 'up',
      percentage: 6,
    },
  },
  conservation_measures: [
    {
      name: 'Rainwater Harvesting',
      impact: 'High',
      status: 'Implemented',
      savings: '20% water reduction',
    },
    {
      name: 'Water Recycling System',
      impact: 'High',
      status: 'In Progress',
      savings: '30% water reuse',
    },
    {
      name: 'Smart Irrigation',
      impact: 'Medium',
      status: 'Planned',
      savings: '15% water savings',
    },
  ],
};

export async function GET() {
  return NextResponse.json(waterData);
}

export async function POST(request: Request) {
  const data = await request.json();
  // In a real app, you would save this data to a database
  return NextResponse.json({ message: 'Data received successfully', data });
} 