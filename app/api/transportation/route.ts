import { NextResponse } from 'next/server';

const transportationData = {
  fleet: {
    total_vehicles: {
      value: 50,
      unit: 'vehicles',
      trend: 'up',
      percentage: 5,
    },
    electric_vehicles: {
      value: 15,
      unit: 'vehicles',
      trend: 'up',
      percentage: 20,
    },
    fuel_efficiency: {
      value: 85,
      unit: '%',
      trend: 'up',
      percentage: 8,
    },
  },
  business_travel: {
    air_travel: {
      value: 25000,
      unit: 'km',
      trend: 'down',
      percentage: 15,
    },
    rail_travel: {
      value: 15000,
      unit: 'km',
      trend: 'up',
      percentage: 10,
    },
    road_travel: {
      value: 35000,
      unit: 'km',
      trend: 'down',
      percentage: 12,
    },
  },
  logistics: {
    shipping_distance: {
      value: 100000,
      unit: 'km',
      trend: 'down',
      percentage: 8,
    },
    fuel_consumption: {
      value: 45000,
      unit: 'liters',
      trend: 'down',
      percentage: 10,
    },
    route_optimization: {
      value: 92,
      unit: '%',
      trend: 'up',
      percentage: 5,
    },
  },
};

export async function GET() {
  return NextResponse.json(transportationData);
}

export async function POST(request: Request) {
  const data = await request.json();
  // In a real app, you would save this data to a database
  return NextResponse.json({ message: 'Data received successfully', data });
} 