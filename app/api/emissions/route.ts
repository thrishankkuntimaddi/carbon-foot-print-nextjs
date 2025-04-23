import { NextResponse } from 'next/server';

// Dummy data for emissions
const emissionsData = {
  energy: {
    electricity: [120, 130, 110, 100, 90, 95],
    gas: [80, 85, 88, 70, 65, 60],
    renewable: [30, 40, 35, 20, 15, 10],
  },
  transportation: {
    fleet: [50, 55, 58, 45, 40, 35],
    business_travel: [30, 35, 38, 25, 20, 15],
    logistics: [20, 25, 28, 15, 10, 5],
  },
  waste: {
    general: [30, 40, 35, 20, 15, 10],
    hazardous: [10, 15, 12, 8, 5, 3],
    recyclable: [20, 25, 22, 15, 10, 8],
  },
  materials: {
    raw_materials: [40, 45, 42, 35, 30, 25],
    packaging: [25, 30, 28, 20, 15, 12],
    supplies: [15, 20, 18, 12, 10, 8],
  },
  labor: {
    office: [20, 25, 22, 18, 15, 12],
    production: [35, 40, 38, 30, 25, 20],
    maintenance: [15, 20, 18, 12, 10, 8],
  },
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
};

export async function GET() {
  return NextResponse.json(emissionsData);
}

export async function POST(request: Request) {
  const data = await request.json();
  // In a real app, you would save this data to a database
  return NextResponse.json({ message: 'Data received successfully', data });
} 