'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ImpactPieChartProps {
  data: {
    categories: string[];
    values: number[];
  };
}

const ImpactPieChart: React.FC<ImpactPieChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: data.categories,
    colors: [
      '#FF4560',
      '#008FFB',
      '#00E396',
      '#FEB019',
      '#775DD0',
      '#3F51B5',
      '#03A9F4',
      '#4CAF50',
      '#FFC107',
      '#FF5722',
      '#795548',
      '#607D8B',
      '#9C27B0',
      '#E91E63',
      '#2196F3',
    ],
    legend: {
      position: 'right',
      fontSize: '14px',
      markers: {
        width: 12,
        height: 12,
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value}%`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '0%',
        },
        customScale: 0.8,
      },
    },
  };

  const series = data.values;

  return (
    <div className="w-full h-[500px] bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Carbon Impact Distribution
      </h2>
      <Chart options={options} series={series} type="pie" height="100%" />
    </div>
  );
};

export default ImpactPieChart; 