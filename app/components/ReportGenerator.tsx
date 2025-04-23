'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const ReportGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    // In a real app, this would trigger a download
    alert('Report generated successfully! (This is a mock)');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Sustainability Report
      </h2>
      <p className="text-gray-600 mb-4">
        Generate a comprehensive sustainability report with detailed emissions data
        and reduction strategies.
      </p>
      <Link href="/report" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Generate Report
      </Link>
    </div>
  );
};

export default ReportGenerator; 