import { NextResponse } from 'next/server';

export async function GET() {
  const dummyData = {
    energy: {
      electricity: { value: 150000, unit: 'kWh', trend: 'down', percentage: 12 },
      gas: { value: 75000, unit: 'm³', trend: 'down', percentage: 8 },
      renewable: { value: 45000, unit: 'kWh', trend: 'up', percentage: 25 },
    },
    transportation: {
      fleet: {
        total_vehicles: { value: 50, unit: 'vehicles', trend: 'up', percentage: 5 },
        electric_vehicles: { value: 15, unit: 'vehicles', trend: 'up', percentage: 20 },
        fuel_efficiency: { value: 85, unit: '%', trend: 'up', percentage: 8 },
      },
      business_travel: {
        air_travel: { value: 25000, unit: 'km', trend: 'down', percentage: 15 },
        rail_travel: { value: 15000, unit: 'km', trend: 'up', percentage: 10 },
        road_travel: { value: 35000, unit: 'km', trend: 'down', percentage: 12 },
      },
      logistics: {
        shipping_distance: { value: 100000, unit: 'km', trend: 'down', percentage: 8 },
        fuel_consumption: { value: 45000, unit: 'liters', trend: 'down', percentage: 10 },
        route_optimization: { value: 92, unit: '%', trend: 'up', percentage: 5 },
      },
    },
    waste: {
      generation: {
        total_waste: { value: 50000, unit: 'kg', trend: 'down', percentage: 10 },
        hazardous_waste: { value: 5000, unit: 'kg', trend: 'down', percentage: 15 },
        non_hazardous_waste: { value: 45000, unit: 'kg', trend: 'down', percentage: 8 },
      },
      recycling: {
        recycling_rate: { value: 65, unit: '%', trend: 'up', percentage: 5 },
        recycled_materials: { value: 32500, unit: 'kg', trend: 'up', percentage: 8 },
        composting_rate: { value: 25, unit: '%', trend: 'up', percentage: 12 },
      },
      disposal: {
        landfill: { value: 17500, unit: 'kg', trend: 'down', percentage: 15 },
        incineration: { value: 5000, unit: 'kg', trend: 'down', percentage: 10 },
        other_methods: { value: 2500, unit: 'kg', trend: 'down', percentage: 8 },
      },
    },
    materials: {
      raw_materials: {
        steel: { value: 25000, unit: 'kg', trend: 'down', percentage: 5 },
        plastic: { value: 15000, unit: 'kg', trend: 'down', percentage: 8 },
        paper: { value: 10000, unit: 'kg', trend: 'down', percentage: 12 },
      },
      sustainable_materials: {
        recycled_steel: { value: 12500, unit: 'kg', trend: 'up', percentage: 15 },
        bioplastic: { value: 7500, unit: 'kg', trend: 'up', percentage: 20 },
        recycled_paper: { value: 5000, unit: 'kg', trend: 'up', percentage: 18 },
      },
      sourcing: {
        local_suppliers: { value: 65, unit: '%', trend: 'up', percentage: 65 },
        international_suppliers: { value: 35, unit: '%', trend: 'down', percentage: 35 },
      },
    },
    production: {
      manufacturing: {
        energy_intensity: { value: 85, unit: 'kWh/unit', trend: 'down', percentage: 10 },
        process_emissions: { value: 25000, unit: 'kg CO2e', trend: 'down', percentage: 8 },
        automation_level: { value: 75, unit: '%', trend: 'up', percentage: 5 },
      },
      efficiency_metrics: {
        material_efficiency: { value: 92, unit: '%', trend: 'up', percentage: 3 },
        energy_efficiency: { value: 88, unit: '%', trend: 'up', percentage: 4 },
        waste_reduction: { value: 78, unit: '%', trend: 'up', percentage: 6 },
      },
      process_improvements: {
        '0': { value: 85, unit: '%', trend: 'up', percentage: 5 },
        '1': { value: 92, unit: '%', trend: 'up', percentage: 8 },
        '2': { value: 78, unit: '%', trend: 'up', percentage: 3 },
      },
    },
    water: {
      consumption: {
        total_usage: { value: 150000, unit: 'm³', trend: 'down', percentage: 8 },
        recycled_water: { value: 45000, unit: 'm³', trend: 'up', percentage: 15 },
        water_efficiency: { value: 85, unit: '%', trend: 'up', percentage: 5 },
      },
      wastewater: {
        treatment_efficiency: { value: 92, unit: '%', trend: 'up', percentage: 3 },
        discharge_quality: { value: 95, unit: '%', trend: 'up', percentage: 2 },
        recycling_rate: { value: 78, unit: '%', trend: 'up', percentage: 6 },
      },
      conservation_measures: {
        '0': { value: 85, unit: '%', trend: 'up', percentage: 5 },
        '1': { value: 92, unit: '%', trend: 'up', percentage: 8 },
        '2': { value: 78, unit: '%', trend: 'up', percentage: 3 },
      },
    },
    digital: {
      data_centers: {
        energy_consumption: { value: 85000, unit: 'kWh', trend: 'down', percentage: 12 },
        pue_ratio: { value: 1.5, unit: '', trend: 'down', percentage: 8 },
        renewable_energy: { value: 65, unit: '%', trend: 'up', percentage: 15 },
      },
      it_equipment: {
        server_efficiency: { value: 92, unit: '%', trend: 'up', percentage: 5 },
        storage_efficiency: { value: 88, unit: '%', trend: 'up', percentage: 4 },
        network_efficiency: { value: 85, unit: '%', trend: 'up', percentage: 3 },
      },
      optimization_measures: {
        '0': { value: 85, unit: '%', trend: 'up', percentage: 5 },
        '1': { value: 92, unit: '%', trend: 'up', percentage: 8 },
        '2': { value: 78, unit: '%', trend: 'up', percentage: 3 },
      },
    },
  };

  return NextResponse.json(dummyData);
} 