'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DownloadOptions from '../components/DownloadOptions';

export default function Report() {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Sustainability Report
              </h1>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Dashboard
              </Link>
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Executive Summary
                </h2>
                <p className="text-gray-600">
                  This report provides a comprehensive overview of our company's
                  carbon footprint and sustainability initiatives. Our total
                  emissions have decreased by 12% compared to the previous year,
                  demonstrating our commitment to environmental responsibility.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Findings
                </h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Energy consumption reduced by 8%</li>
                  <li>Transportation emissions decreased by 15%</li>
                  <li>Waste management improvements led to 20% reduction</li>
                  <li>Overall carbon footprint down by 12%</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Recommendations
                </h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Implement renewable energy sources</li>
                  <li>Optimize transportation routes</li>
                  <li>Enhance waste recycling programs</li>
                  <li>Set more aggressive reduction targets</li>
                </ul>
              </section>

              <div className="mt-8">
                <DownloadOptions
                  onDownloadStart={() => setIsGenerating(true)}
                  onDownloadComplete={() => setIsGenerating(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 