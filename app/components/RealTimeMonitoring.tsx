'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

// Dynamically import ApexCharts with no SSR
const Chart = dynamic(
  () => import('react-apexcharts'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[400px] flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    )
  }
);

interface EmissionData {
  timestamp: number;
  energy: number;
  transport: number;
  waste: number;
}

const RealTimeMonitoring: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<EmissionData[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [currentValues, setCurrentValues] = useState({
    energy: 0,
    transport: 0,
    waste: 0
  });

  // Thresholds for alerts (in CO2e)
  const THRESHOLDS = {
    energy: 280,
    transport: 250,
    waste: 120
  };

  useEffect(() => {
    setIsClient(true);
    
    // Initialize with some data
    const initialData = {
      timestamp: Date.now(),
      energy: 245,
      transport: 220,
      waste: 90
    };
    
    setData([initialData]);
    setCurrentValues({
      energy: initialData.energy,
      transport: initialData.transport,
      waste: initialData.waste
    });

    // Set up the interval for updates
    const interval = setInterval(() => {
      const now = Date.now();
      
      // Simulate IoT sensor data with some randomness
      const newEnergy = 245 + Math.random() * 70;
      const newTransport = 220 + Math.random() * 60;
      const newWaste = 90 + Math.random() * 40;

      // Check thresholds and create alerts
      if (newEnergy > THRESHOLDS.energy) {
        setAlerts(prev => [`⚠️ Energy consumption exceeded threshold: ${newEnergy.toFixed(1)} CO2e`, ...prev.slice(0, 4)]);
      }
      if (newTransport > THRESHOLDS.transport) {
        setAlerts(prev => [`⚠️ Transport emissions exceeded threshold: ${newTransport.toFixed(1)} CO2e`, ...prev.slice(0, 4)]);
      }
      if (newWaste > THRESHOLDS.waste) {
        setAlerts(prev => [`⚠️ Waste emissions exceeded threshold: ${newWaste.toFixed(1)} CO2e`, ...prev.slice(0, 4)]);
      }

      // Update current values
      setCurrentValues({
        energy: newEnergy,
        transport: newTransport,
        waste: newWaste
      });

      // Update chart data
      setData(prev => {
        const newData = [...prev, {
          timestamp: now,
          energy: newEnergy,
          transport: newTransport,
          waste: newWaste
        }];
        // Keep last 20 data points
        return newData.slice(-20);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime',
      range: 60000, // 1 minute range
    },
    yaxis: {
      title: {
        text: 'CO2e (metric tons)'
      }
    },
    legend: {
      show: true,
      position: 'top'
    },
    grid: {
      padding: {
        top: 20
      }
    },
    colors: ['#10B981', '#3B82F6', '#F59E0B']
  };

  const series = [
    {
      name: 'Energy',
      data: data.map(d => [d.timestamp, d.energy])
    },
    {
      name: 'Transport',
      data: data.map(d => [d.timestamp, d.transport])
    },
    {
      name: 'Waste',
      data: data.map(d => [d.timestamp, d.waste])
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current Values Cards */}
        <div className={`p-4 rounded-lg shadow-md ${currentValues.energy > THRESHOLDS.energy ? 'bg-red-50' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-2">Energy Consumption</h3>
          <p className="text-2xl font-bold text-gray-700">
            {currentValues.energy.toFixed(1)}
            <span className="text-sm ml-1">CO2e</span>
          </p>
          <p className="text-sm text-gray-500">Current Rate</p>
        </div>

        <div className={`p-4 rounded-lg shadow-md ${currentValues.transport > THRESHOLDS.transport ? 'bg-red-50' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-2">Transport Emissions</h3>
          <p className="text-2xl font-bold text-gray-700">
            {currentValues.transport.toFixed(1)}
            <span className="text-sm ml-1">CO2e</span>
          </p>
          <p className="text-sm text-gray-500">Current Rate</p>
        </div>

        <div className={`p-4 rounded-lg shadow-md ${currentValues.waste > THRESHOLDS.waste ? 'bg-red-50' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-2">Waste Emissions</h3>
          <p className="text-2xl font-bold text-gray-700">
            {currentValues.waste.toFixed(1)}
            <span className="text-sm ml-1">CO2e</span>
          </p>
          <p className="text-sm text-gray-500">Current Rate</p>
        </div>
      </div>

      {/* Real-time Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Real-Time Emissions Monitor</h3>
        <div className="h-[400px]">
          <Chart
            options={chartOptions}
            series={series}
            type="line"
            height="100%"
          />
        </div>
      </div>

      {/* Alerts Panel */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Real-Time Alerts</h3>
        <div className="space-y-2">
          {alerts.length === 0 ? (
            <p className="text-gray-500">No active alerts</p>
          ) : (
            alerts.map((alert, index) => (
              <div
                key={index}
                className="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700"
              >
                {alert}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring; 