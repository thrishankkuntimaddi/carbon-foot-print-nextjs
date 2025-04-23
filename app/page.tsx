"use client";

import React, { useEffect, useState } from "react";
import EmissionChart from "./components/EmissionChart";
import KPI from "./components/KPI";
import ReportGenerator from "./components/ReportGenerator";
import InsightsPanel from "./components/InsightsPanel";
import CategoriesPage from "./categories/categories";

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
  const [emissionsData, setEmissionsData] = useState<EmissionsData | null>(
    null
  );
  const [insightsData, setInsightsData] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(true);

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
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Carbon Footprint Dashboard
          </h1>

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart */}
            <div className="lg:col-span-2">
              {emissionsData && (
                <EmissionChart
                  data={{
                    energy: emissionsData.energy.electricity,
                    transport: emissionsData.transportation.fleet,
                    waste: emissionsData.waste.general,
                    labels: emissionsData.labels,
                  }}
                />
              )}
            </div>

            {/* Insights Panel */}
            <div className="lg:col-span-1">
              {insightsData && (
                <InsightsPanel
                  insights={insightsData.current_insights}
                  alerts={insightsData.alerts}
                  sustainabilityIndex={insightsData.sustainability_index}
                />
              )}
            </div>
          </div>
          <div>
            <CategoriesPage />
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
