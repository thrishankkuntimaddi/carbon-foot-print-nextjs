'use client';

import React, { useState, useEffect } from 'react';
import EnergyConsumption from '../components/categories/EnergyConsumption';
import Transportation from '../components/categories/Transportation';
import WasteManagement from '../components/categories/WasteManagement';
import Materials from '../components/categories/Materials';
import Production from '../components/categories/Production';
import WaterUsage from '../components/categories/WaterUsage';
import DigitalInfrastructure from '../components/categories/DigitalInfrastructure';
import ImpactPieChart from '../components/ImpactPieChart';

const CategoriesPage = () => {
  const [chartData, setChartData] = useState({
    labels: [
      'Energy Consumption',
      'Transportation',
      'Waste Management',
      'Materials',
      'Production',
      'Water Usage',
      'Digital Footprint',
    ],
    values: [25, 20, 15, 12, 10, 8, 10],
  });

  useEffect(() => {
    // Ensure data is properly formatted when component mounts
    setChartData(prevData => ({
      ...prevData,
      values: prevData.values.map(value => Number(value))
    }));
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Carbon Impact Categories
          </h1>

          {/* Impact Distribution Chart */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <ImpactPieChart 
              data={chartData} 
              title="Carbon Impact Distribution"
            />
          </div>

          {/* Category Components */}
          <div className="space-y-8">
            <EnergyConsumption />
            <Transportation />
            <WasteManagement />
            <Materials />
            <Production />
            <WaterUsage />
            <DigitalInfrastructure />
            {/* Add other category components here */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoriesPage; 