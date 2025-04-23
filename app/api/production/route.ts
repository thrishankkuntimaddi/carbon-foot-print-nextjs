import { NextResponse } from 'next/server';

const productionData = {
  manufacturing: {
    energy_intensity: {
      value: 85,
      unit: 'kWh/unit',
      trend: 'down',
      percentage: 10,
    },
    process_emissions: {
      value: 25000,
      unit: 'kg CO2e',
      trend: 'down',
      percentage: 8,
    },
    automation_level: {
      value: 75,
      unit: '%',
      trend: 'up',
      percentage: 5,
    },
  },
  efficiency_metrics: {
    material_efficiency: {
      value: 92,
      unit: '%',
      trend: 'up',
      percentage: 3,
    },
    energy_efficiency: {
      value: 88,
      unit: '%',
      trend: 'up',
      percentage: 4,
    },
    waste_reduction: {
      value: 78,
      unit: '%',
      trend: 'up',
      percentage: 6,
    },
  },
  process_improvements: [
    {
      name: 'Automated Quality Control',
      impact: 'High',
      status: 'Implemented',
      savings: '15% energy reduction',
    },
    {
      name: 'Smart Manufacturing',
      impact: 'Medium',
      status: 'In Progress',
      savings: '10% process optimization',
    },
    {
      name: 'Waste Heat Recovery',
      impact: 'High',
      status: 'Planned',
      savings: '20% energy recovery',
    },
  ],
};

export async function GET() {
  return NextResponse.json(productionData);
}

export async function POST(request: Request) {
  const data = await request.json();
  // In a real app, you would save this data to a database
  return NextResponse.json({ message: 'Data received successfully', data });
} 