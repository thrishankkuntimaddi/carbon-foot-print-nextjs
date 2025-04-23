'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface EmissionChartProps {
  data: {
    energy: number[];
    transport: number[];
    waste: number[];
    labels: string[];
  };
}

const EmissionChart: React.FC<EmissionChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      categories: data.labels,
    },
    yaxis: {
      title: {
        text: 'Emissions (tons CO2e)',
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: 'top',
    },
  };

  const series = [
    {
      name: 'Energy',
      data: data.energy,
    },
    {
      name: 'Transportation',
      data: data.transport,
    },
    {
      name: 'Waste',
      data: data.waste,
    },
  ];

  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-lg p-4">
      <Chart options={options} series={series} type="line" height="100%" />
    </div>
  );
};

export default EmissionChart; 