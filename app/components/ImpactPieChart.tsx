'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ImpactPieChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  title?: string;
}

const ImpactPieChart: React.FC<ImpactPieChartProps> = ({ data, title = 'Impact Distribution' }) => {
  const options: ApexOptions = {
    chart: {
      type: 'pie',
      toolbar: {
        show: true,
      },
    },
    labels: data.labels,
    colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'],
    legend: {
      position: 'bottom',
      fontSize: '14px',
      markers: {
        size: 12,
        strokeWidth: 0,
        shape: 'circle',
        offsetX: 0,
        offsetY: 0,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '0%',
        },
        customScale: 0.9,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
      style: {
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toFixed(1)}%`,
      },
    },
    title: {
      text: title,
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 600,
      },
    },
  };

  const series = data.values;

  return (
    <div className="w-full h-full min-h-[300px]">
      <Chart
        options={options}
        series={series}
        type="pie"
        height="100%"
        width="100%"
      />
    </div>
  );
};

export default ImpactPieChart; 