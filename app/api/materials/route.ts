import { NextResponse } from 'next/server';

const materialsData = {
  raw_materials: {
    steel: {
      usage: 50000,
      unit: 'kg',
      carbon_intensity: 1.8,
      trend: 'down',
      percentage: 5,
    },
    plastic: {
      usage: 30000,
      unit: 'kg',
      carbon_intensity: 2.5,
      trend: 'down',
      percentage: 8,
    },
    paper: {
      usage: 20000,
      unit: 'kg',
      carbon_intensity: 0.8,
      trend: 'down',
      percentage: 12,
    },
  },
  sustainable_materials: {
    recycled_steel: {
      usage: 15000,
      unit: 'kg',
      carbon_intensity: 0.9,
      trend: 'up',
      percentage: 15,
    },
    bioplastic: {
      usage: 8000,
      unit: 'kg',
      carbon_intensity: 1.2,
      trend: 'up',
      percentage: 20,
    },
    recycled_paper: {
      usage: 12000,
      unit: 'kg',
      carbon_intensity: 0.4,
      trend: 'up',
      percentage: 18,
    },
  },
  sourcing: {
    local_suppliers: {
      percentage: 65,
      trend: 'up',
      change: 5,
    },
    international_suppliers: {
      percentage: 35,
      trend: 'down',
      change: 5,
    },
  },
};

export async function GET() {
  return NextResponse.json(materialsData);
}

export async function POST(request: Request) {
  const data = await request.json();
  // In a real app, you would save this data to a database
  return NextResponse.json({ message: 'Data received successfully', data });
} 