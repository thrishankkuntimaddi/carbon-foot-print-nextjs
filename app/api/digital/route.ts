import { NextResponse } from 'next/server';

const digitalData = {
  data_centers: {
    energy_consumption: {
      value: 85000,
      unit: 'kWh',
      trend: 'down',
      percentage: 12,
    },
    pue_ratio: {
      value: 1.5,
      unit: '',
      trend: 'down',
      percentage: 8,
    },
    renewable_energy: {
      value: 65,
      unit: '%',
      trend: 'up',
      percentage: 15,
    },
  },
  it_equipment: {
    server_efficiency: {
      value: 92,
      unit: '%',
      trend: 'up',
      percentage: 5,
    },
    storage_efficiency: {
      value: 88,
      unit: '%',
      trend: 'up',
      percentage: 4,
    },
    network_efficiency: {
      value: 85,
      unit: '%',
      trend: 'up',
      percentage: 3,
    },
  },
  optimization_measures: [
    {
      name: 'Server Virtualization',
      impact: 'High',
      status: 'Implemented',
      savings: '30% energy reduction',
    },
    {
      name: 'Cloud Migration',
      impact: 'High',
      status: 'In Progress',
      savings: '25% infrastructure costs',
    },
    {
      name: 'Energy-Efficient Cooling',
      impact: 'Medium',
      status: 'Planned',
      savings: '20% cooling costs',
    },
  ],
};

export async function GET() {
  return NextResponse.json(digitalData);
}

export async function POST(request: Request) {
  const data = await request.json();
  // In a real app, you would save this data to a database
  return NextResponse.json({ message: 'Data received successfully', data });
} 