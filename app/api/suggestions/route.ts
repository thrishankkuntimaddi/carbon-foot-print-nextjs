import { NextResponse } from 'next/server';

const mockSuggestions: Record<string, string[]> = {
  energy: [
    'Electricity consumption: 1500 kWh',
    'Natural gas usage: 500 m³',
    'Renewable energy: 300 kWh',
    'Solar panel output: 200 kWh',
  ],
  transportation: [
    'Fleet fuel consumption: 500 L',
    'Business travel: 1000 km',
    'Logistics distance: 2000 km',
    'Electric vehicle charging: 100 kWh',
  ],
  waste: [
    'General waste: 100 kg',
    'Recyclable materials: 50 kg',
    'Hazardous waste: 10 kg',
    'Compost: 30 kg',
  ],
  materials: [
    'Raw materials: 1000 kg',
    'Packaging: 200 kg',
    'Sustainable materials: 300 kg',
    'Recycled content: 150 kg',
  ],
};

export async function POST(request: Request) {
  try {
    const { text, category, language } = await request.json();

    if (!text || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Filter suggestions based on input text
    const suggestions = mockSuggestions[category]?.filter(suggestion =>
      suggestion.toLowerCase().includes(text.toLowerCase())
    ) || [];

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
} 