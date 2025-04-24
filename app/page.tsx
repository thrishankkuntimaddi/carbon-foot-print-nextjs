"use client";

import React, { useEffect, useState } from "react";
import EmissionChart from "./components/EmissionChart";
import KPI from "./components/KPI";
import ReportGenerator from "./components/ReportGenerator";
import InsightsPanel from "./components/InsightsPanel";
import CategoriesPage from "./categories/categories";
import CarbonFootprintInsights from './components/CarbonFootprintInsights';
import StreakTracker from './components/StreakTracker';
import ImpactPieChart from './components/ImpactPieChart';
import DataInputModule from './components/data-input/DataInputModule';
import FileUpload from './components/FileUpload';
import dynamic from 'next/dynamic';

// Dynamically import RealTimeMonitoring with no SSR
const RealTimeMonitoring = dynamic(
  () => import('./components/RealTimeMonitoring'),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse">
        <div className="h-24 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-96 bg-gray-200 rounded-lg"></div>
      </div>
    ),
  }
);

interface EmissionsData {
  energy: {
    electricity: number[];
    gas: number[];
    renewable: number[];
  };
  transportation: {
    fleet: number[];
    business_travel: number[];
    logistics: number[];
  };
  waste: {
    general: number[];
    hazardous: number[];
    recyclable: number[];
  };
  materials: {
    raw_materials: number[];
    packaging: number[];
    supplies: number[];
  };
  labor: {
    office: number[];
    production: number[];
    maintenance: number[];
  };
  labels: string[];
}

interface InsightsData {
  current_insights: Array<{
    category: string;
    insight: string;
    impact: string;
    recommendation: string;
  }>;
  sustainability_index: number;
  alerts: Array<{
    type: "warning" | "success" | "info";
    message: string;
    timestamp: string;
  }>;
}

export default function Home() {
  const [emissionsData, setEmissionsData] = useState<EmissionsData | null>(null);
  const [insightsData, setInsightsData] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>("energy");
  const [chartData, setChartData] = useState({
    energy: [0, 0, 0],
    transport: [0, 0, 0],
    waste: [0, 0, 0],
    labels: ['Jan', 'Feb', 'Mar']
  });

  const handleDataLoaded = (data: any) => {
    // Process the uploaded data
    const dates = Object.keys(data).sort();
    const labels = dates.map(date => {
      const d = new Date(date);
      return d.toLocaleString('default', { month: 'short' });
    });

    // Initialize arrays for each category
    const energy: number[] = [];
    const transport: number[] = [];
    const waste: number[] = [];

    // Process data for each date
    dates.forEach(date => {
      const dateData = data[date];
      
      // Sum up energy values
      const energyTotal = Object.values(dateData.energy || {}).reduce((sum: number, val: any) => sum + val, 0);
      energy.push(energyTotal);

      // Sum up transportation values
      const transportTotal = Object.values(dateData.transportation || {}).reduce((sum: number, val: any) => sum + val, 0);
      transport.push(transportTotal);

      // Sum up waste values
      const wasteTotal = Object.values(dateData.waste || {}).reduce((sum: number, val: any) => sum + val, 0);
      waste.push(wasteTotal);
    });

    // Update chart data
    setChartData({
      energy,
      transport,
      waste,
      labels
    });

    // Calculate total emissions for KPIs
    const totalEmissions = energy.reduce((sum, val) => sum + val, 0) +
                         transport.reduce((sum, val) => sum + val, 0) +
                         waste.reduce((sum, val) => sum + val, 0);

    // Generate insights based on the data
    const insights: InsightsData = {
      current_insights: [
        {
          category: "Energy",
          insight: `Energy consumption ${energy[energy.length - 1] > energy[energy.length - 2] ? 'increased' : 'decreased'} in the last month`,
          impact: "Medium",
          recommendation: "Consider implementing energy-saving measures"
        },
        {
          category: "Transportation",
          insight: `Transportation emissions ${transport[transport.length - 1] > transport[transport.length - 2] ? 'increased' : 'decreased'} in the last month`,
          impact: "High",
          recommendation: "Optimize logistics routes and consider electric vehicles"
        },
        {
          category: "Waste",
          insight: `Waste management ${waste[waste.length - 1] > waste[waste.length - 2] ? 'increased' : 'decreased'} in the last month`,
          impact: "Low",
          recommendation: "Implement better recycling practices"
        }
      ],
      sustainability_index: Math.round((1 - totalEmissions / 1000) * 100),
      alerts: [
        {
          type: "info",
          message: "Data successfully loaded and processed",
          timestamp: new Date().toISOString()
        }
      ]
    };

    setInsightsData(insights);
    setLoading(false);
  };

  const handleDataSubmit = async (data: any) => {
    try {
      console.log("Submitted data:", data);
      
      // Prevent default form submission
      if (data.preventDefault) {
        data.preventDefault();
      }

      // Update chart data safely
      setChartData(prevData => {
        const newData = { ...prevData };
        const value = Number(data.value) || 0;
        
        // Update the relevant category based on submitted data
        switch (data.category.toLowerCase()) {
          case 'energy':
            newData.energy = [...newData.energy.slice(1), value];
            break;
          case 'transportation':
            newData.transport = [...newData.transport.slice(1), value];
            break;
          case 'waste':
            newData.waste = [...newData.waste.slice(1), value];
            break;
        }

        // Update labels with the new date
        const newDate = new Date(data.date);
        const monthName = newDate.toLocaleString('default', { month: 'short' });
        newData.labels = [...newData.labels.slice(1), monthName];

        return newData;
      });

      // Show success message
      alert('Data submitted successfully!');

    } catch (error) {
      console.error("Error submitting data:", error);
      alert('Error submitting data. Please try again.');
    }
  };

  const impactData = {
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
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [emissionsResponse, insightsResponse] = await Promise.all([
          fetch("/api/emissions"),
          fetch("/api/insights"),
        ]);

        const emissions = await emissionsResponse.json();
        const insights = await insightsResponse.json();

        setEmissionsData(emissions);
        setInsightsData(insights);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Carbon Footprint Dashboard
          </h1>

          {/* File Upload Section */}
          <div className="mb-8">
            <FileUpload onDataLoaded={handleDataLoaded} />
          </div>

          {/* Insights Section */}
          <div className="mb-8">
            <CarbonFootprintInsights />
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <KPI
              title="Total Emissions"
              value={285}
              unit="tons CO2e"
              trend="down"
              percentage={12}
            />
            <KPI
              title="Energy Usage"
              value={95}
              unit="tons CO2e"
              trend="down"
              percentage={8}
            />
            <KPI
              title="Transportation"
              value={60}
              unit="tons CO2e"
              trend="down"
              percentage={15}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Impact Distribution Chart */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Impact Distribution
                </h2>
                <EmissionChart data={chartData} />
              </div>
            </div>

            {/* Streak Tracker */}
            <div>
              <StreakTracker />
            </div>
          </div>

          {/* Real-Time Monitoring Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Real-Time Emission Monitoring
            </h2>
            <RealTimeMonitoring />
          </div>

          <div>
            <CategoriesPage />
          </div>

          {/* Data Input Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Data Input
            </h2>
            <DataInputModule 
              category={currentCategory}
              onDataSubmit={handleDataSubmit}
            />
          </div>

          {/* Report Generator */}
          <div className="max-w-2xl mx-auto mt-8">
            <ReportGenerator />
          </div>
        </div>
      </div>
    </main>
  );
}
