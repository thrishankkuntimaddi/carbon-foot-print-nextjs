import { NextResponse } from 'next/server';

const wasteData = {
  generation: {
    total_waste: {
      value: 50000,
      unit: 'kg',
      trend: 'down',
      percentage: 10,
    },
    hazardous_waste: {
      value: 5000,
      unit: 'kg',
      trend: 'down',
      percentage: 15,
    },
    non_hazardous_waste: {
      value: 45000,
      unit: 'kg',
      trend: 'down',
      percentage: 8,
    },
  },
  recycling: {
    recycling_rate: {
      value: 65,
      unit: '%',
      trend: 'up',
      percentage: 5,
    },
    recycled_materials: {
      value: 32500,
      unit: 'kg',
      trend: 'up',
      percentage: 8,
    },
    composting_rate: {
      value: 25,
      unit: '%',
      trend: 'up',
      percentage: 12,
    },
  },
  disposal: {
    landfill: {
      value: 17500,
      unit: 'kg',
      trend: 'down',
      percentage: 15,
    },
    incineration: {
      value: 5000,
      unit: 'kg',
      trend: 'down',
      percentage: 10,
    },
    other_methods: {
      value: 2500,
      unit: 'kg',
      trend: 'down',
      percentage: 8,
    },
  },
};

export async function GET() {
  return NextResponse.json(wasteData);
}

export async function POST(request: Request) {
  const data = await request.json();
  // In a real app, you would save this data to a database
  return NextResponse.json({ message: 'Data received successfully', data });
} 