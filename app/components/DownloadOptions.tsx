'use client';

import React, { useState } from 'react';
import { generateReportData, generateCSV, generatePDFContent, ReportGenerationError } from '../utils/reportGenerator';
import html2pdf from 'html2pdf.js';
import LoadingState from './LoadingState';

interface DownloadOptionsProps {
  onDownloadStart: () => void;
  onDownloadComplete: () => void;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({
  onDownloadStart,
  onDownloadComplete,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (type: 'pdf' | 'csv' | 'print') => {
    try {
      setIsGenerating(true);
      setError(null);
      onDownloadStart();

      const data = await generateReportData();

      switch (type) {
        case 'pdf':
          await downloadPDF(data);
          break;
        case 'csv':
          downloadCSV(data);
          break;
        case 'print':
          printReport(data);
          break;
      }
    } catch (error) {
      if (error instanceof ReportGenerationError) {
        setError(`Error: ${error.message}`);
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Error downloading report:', error);
    } finally {
      setIsGenerating(false);
      onDownloadComplete();
    }
  };

  const downloadPDF = async (data: any) => {
    const content = generatePDFContent(data);
    const element = document.createElement('div');
    element.innerHTML = content;

    const opt = {
      margin: 1,
      filename: 'carbon-footprint-report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    await html2pdf().set(opt).from(element).save();
  };

  const downloadCSV = (data: any) => {
    const csv = generateCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'carbon-footprint-report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printReport = (data: any) => {
    const content = generatePDFContent(data);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Carbon Footprint Report</title>
            <style>
              body { 
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
              }
              h1 { 
                color: #1a1a1a;
                text-align: center;
                margin-bottom: 30px;
              }
              h2 { 
                color: #2d3748;
                border-bottom: 2px solid #e2e8f0;
                padding-bottom: 10px;
              }
              h3 { 
                color: #4a5568;
                margin-bottom: 10px;
              }
              p { 
                margin: 5px 0;
                color: #4a5568;
              }
              .trend-up { color: #e53e3e; }
              .trend-down { color: #38a169; }
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Download Options</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => handleDownload('pdf')}
          disabled={isGenerating}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isGenerating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </button>
        <button
          onClick={() => handleDownload('csv')}
          disabled={isGenerating}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isGenerating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isGenerating ? 'Generating...' : 'Download CSV'}
        </button>
        <button
          onClick={() => handleDownload('print')}
          disabled={isGenerating}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isGenerating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isGenerating ? 'Generating...' : 'Print Report'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {isGenerating && <LoadingState />}
    </div>
  );
};

export default DownloadOptions; 