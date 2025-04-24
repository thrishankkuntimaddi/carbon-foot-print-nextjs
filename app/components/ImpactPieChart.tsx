'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import ErrorBoundary from './ErrorBoundary';

// Import Chart component with SSR disabled
const Chart = dynamic(
  () => import('react-apexcharts').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        <div className="text-gray-600">Loading Chart...</div>
      </div>
    )
  }
);

interface ImpactPieChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  title?: string;
}

const ImpactPieChart: React.FC<ImpactPieChartProps> = ({ data, title = 'Impact Distribution' }) => {
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<{ labels: string[]; values: number[] }>({ 
    labels: [], 
    values: [] 
  });

  useEffect(() => {
    setMounted(true);
    if (data && Array.isArray(data.labels) && Array.isArray(data.values)) {
      setChartData(data);
    }
  }, [data]);

  if (!mounted || !chartData.labels.length || !chartData.values.length) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        <div className="text-gray-600">Loading Chart...</div>
      </div>
    );
  }

  const options: ApexOptions = {
    chart: {
      type: 'pie',
      toolbar: {
        show: true,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    labels: chartData.labels,
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
        expandOnClick: true
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
      style: {
        fontSize: '14px',
        fontWeight: 500,
      },
      dropShadow: {
        enabled: true
      }
    },
    tooltip: {
      enabled: true,
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
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  try {
    return (
      <ErrorBoundary>
        <div className="w-full h-full min-h-[300px]">
          <Chart
            options={options}
            series={chartData.values}
            type="pie"
            height={400}
            width="100%"
          />
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Error rendering chart:', error);
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Unable to load chart</h2>
          <p className="text-gray-500">Please try refreshing the page</p>
        </div>
      </div>
    );
  }
};

export default ImpactPieChart; 