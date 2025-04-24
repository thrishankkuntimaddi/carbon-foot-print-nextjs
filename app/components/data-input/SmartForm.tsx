'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';

interface SmartFormProps {
  category: string;
  onSubmit: (data: any) => void;
  language: string;
}

interface FormData {
  date: string;
  value: number;
  unit: string;
  notes: string;
  category: string;
}

const SmartForm: React.FC<SmartFormProps> = ({
  category,
  onSubmit,
  language,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      value: 0,
      unit: '',
      notes: '',
      category: category,
    },
  });

  const notesValue = watch('notes');

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (notesValue.length < 3) return;

      setLoading(true);
      try {
        const response = await fetch('/api/suggestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: notesValue,
            category,
            language,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.suggestions);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [notesValue, category, language]);

  const onSuggestionClick = (suggestion: string) => {
    setValue('notes', suggestion);
    setSuggestions([]);
  };

  const onFormSubmit = (formData: FormData) => {
    // Format the data before submission
    const submissionData = {
      ...formData,
      category: category, // Ensure category is included
      value: Number(formData.value),
      date: new Date(formData.date).toISOString(),
    };
    
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Date
          </label>
          <Controller
            name="date"
            control={control}
            rules={{ required: 'Date is required' }}
            render={({ field }) => (
              <input
                type="date"
                {...field}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 text-base rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block transition-all duration-200
                hover:border-blue-400 shadow-sm"
              />
            )}
          />
          {errors.date && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Value
          </label>
          <Controller
            name="value"
            control={control}
            rules={{ required: 'Value is required' }}
            render={({ field }) => (
              <input
                type="number"
                step="any"
                {...field}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 text-base rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block transition-all duration-200
                hover:border-blue-400 shadow-sm"
                placeholder="Enter value"
              />
            )}
          />
          {errors.value && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.value.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Unit
          </label>
          <Controller
            name="unit"
            control={control}
            rules={{ required: 'Unit is required' }}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 text-base rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block transition-all duration-200
                hover:border-blue-400 shadow-sm appearance-none cursor-pointer"
              >
                <option value="">Select a unit</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="t">Metric tons (t)</option>
                <option value="kWh">Kilowatt-hours (kWh)</option>
                <option value="m³">Cubic meters (m³)</option>
                <option value="km">Kilometers (km)</option>
              </select>
            )}
          />
          {errors.unit && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.unit.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Notes
          </label>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <textarea
                  {...field}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 text-base rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block transition-all duration-200
                  hover:border-blue-400 shadow-sm resize-none"
                  placeholder="Enter notes about this entry..."
                />
                {loading && (
                  <div className="absolute right-3 top-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">
            Suggested Entries
          </h4>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700
                rounded-md transition-all duration-200 font-medium"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white text-base font-semibold rounded-lg
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          transition-all duration-200 shadow-sm hover:shadow-md active:transform active:scale-95"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SmartForm; 