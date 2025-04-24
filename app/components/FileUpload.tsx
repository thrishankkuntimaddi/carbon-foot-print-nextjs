'use client';

import React, { useState } from 'react';
import Papa, { ParseResult, ParseConfig } from 'papaparse';

interface FileUploadProps {
  onDataLoaded: (data: any) => void;
}

interface CsvData {
  date: string;
  category: string;
  subcategory: string;
  value: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processData = (results: ParseResult<CsvData>) => {
    const { data } = results;
    
    // Group data by date and category
    const processedData = data.reduce((acc: any, row: CsvData) => {
      const { date, category, subcategory, value } = row;
      
      if (!acc[date]) {
        acc[date] = {};
      }
      if (!acc[date][category]) {
        acc[date][category] = {};
      }
      
      acc[date][category][subcategory] = parseFloat(value);
      return acc;
    }, {});

    onDataLoaded(processedData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setLoading(true);

    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv') {
      setError('Please upload a CSV file');
      setLoading(false);
      return;
    }

    // Create a FileReader instance
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        Papa.parse<CsvData>(e.target.result as string, {
          header: true,
          complete: (results: ParseResult<CsvData>) => {
            processData(results);
            setLoading(false);
          },
          error: (error) => {
            setError(`Error parsing CSV file: ${error.message}`);
            setLoading(false);
          }
        });
      }
    };
    reader.onerror = () => {
      setError('Error reading file');
      setLoading(false);
    };
    reader.readAsText(file);
  };

  const handleDemoData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/sample_data.csv');
      const text = await response.text();
      
      Papa.parse<CsvData>(text, {
        header: true,
        complete: (results: ParseResult<CsvData>) => {
          processData(results);
          setLoading(false);
        },
        error: (error) => {
          setError(`Error loading demo data: ${error.message}`);
          setLoading(false);
        }
      });
    } catch (error) {
      setError('Error loading demo data');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Data Upload</h2>
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Choose CSV File
          </label>
          <p className="mt-2 text-sm text-gray-500">or</p>
          <button
            onClick={handleDemoData}
            className="mt-2 text-blue-500 hover:text-blue-600 transition-colors"
          >
            Load Demo Data
          </button>
        </div>
        
        {loading && (
          <div className="text-center text-gray-600">
            Processing data...
          </div>
        )}
        
        {error && (
          <div className="text-center text-red-500">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload; 