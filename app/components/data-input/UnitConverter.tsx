'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface UnitConverterProps {
  category: string;
}

interface ConversionRule {
  from: string;
  to: string;
  factor: number;
  offset?: number;
}

const conversionRules: Record<string, ConversionRule[]> = {
  energy: [
    { from: 'kWh', to: 'MJ', factor: 3.6 },
    { from: 'kWh', to: 'GJ', factor: 0.0036 },
    { from: 'MJ', to: 'kWh', factor: 0.277778 },
    { from: 'GJ', to: 'kWh', factor: 277.778 },
  ],
  mass: [
    { from: 'kg', to: 't', factor: 0.001 },
    { from: 't', to: 'kg', factor: 1000 },
    { from: 'kg', to: 'lb', factor: 2.20462 },
    { from: 'lb', to: 'kg', factor: 0.453592 },
  ],
  volume: [
    { from: 'm³', to: 'L', factor: 1000 },
    { from: 'L', to: 'm³', factor: 0.001 },
    { from: 'm³', to: 'gal', factor: 264.172 },
    { from: 'gal', to: 'm³', factor: 0.00378541 },
  ],
  distance: [
    { from: 'km', to: 'm', factor: 1000 },
    { from: 'm', to: 'km', factor: 0.001 },
    { from: 'km', to: 'mi', factor: 0.621371 },
    { from: 'mi', to: 'km', factor: 1.60934 },
  ],
};

const UnitConverter: React.FC<UnitConverterProps> = ({ category }) => {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableUnits = Object.keys(conversionRules).includes(category)
    ? [...new Set(conversionRules[category].flatMap(rule => [rule.from, rule.to]))]
    : [];

  useEffect(() => {
    if (fromValue && fromUnit && toUnit) {
      try {
        const value = parseFloat(fromValue);
        if (isNaN(value)) {
          throw new Error('Please enter a valid number');
        }

        const rule = conversionRules[category]?.find(
          r => r.from === fromUnit && r.to === toUnit
        );

        if (!rule) {
          throw new Error('Conversion not available for these units');
        }

        const converted = value * rule.factor + (rule.offset || 0);
        setResult(converted);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Conversion failed');
        setResult(null);
      }
    }
  }, [fromValue, fromUnit, toUnit, category]);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Unit Converter
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Value
          </label>
          <input
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter value"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select unit</option>
            {availableUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select unit</option>
            {availableUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-green-50 text-green-700 p-3 rounded-md"
        >
          <p className="font-medium">
            {fromValue} {fromUnit} = {result.toFixed(4)} {toUnit}
          </p>
        </motion.div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>Available conversions for {category}:</p>
        <ul className="list-disc list-inside mt-2">
          {conversionRules[category]?.map((rule, index) => (
            <li key={index}>
              {rule.from} → {rule.to}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UnitConverter; 