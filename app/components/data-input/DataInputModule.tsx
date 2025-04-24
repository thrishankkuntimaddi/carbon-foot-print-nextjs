'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FileUpload from './FileUpload';
import SmartForm from './SmartForm';
import VoiceInput from './VoiceInput';
import UnitConverter from './UnitConverter';
import LanguageSelector from './LanguageSelector';

interface DataInputModuleProps {
  category: string;
  onDataSubmit: (data: any) => void;
}

const DataInputModule: React.FC<DataInputModuleProps> = ({ category, onDataSubmit }) => {
  const [activeTab, setActiveTab] = useState<'file' | 'form' | 'voice'>('form');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const tabs = [
    { id: 'file', label: 'File Upload', icon: '📁' },
    { id: 'form', label: 'Smart Form', icon: '📝' },
    { id: 'voice', label: 'Voice Input', icon: '🎤' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {category} Data Input
        </h2>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </div>

      {/* Input Method Tabs */}
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Unit Converter */}
      <div className="mb-6">
        <UnitConverter category={category} />
      </div>

      {/* Active Input Method */}
      <div className="mt-6">
        {activeTab === 'file' && (
          <FileUpload
            category={category}
            onUploadComplete={onDataSubmit}
            language={selectedLanguage}
          />
        )}
        {activeTab === 'form' && (
          <SmartForm
            category={category}
            onSubmit={onDataSubmit}
            language={selectedLanguage}
          />
        )}
        {activeTab === 'voice' && (
          <VoiceInput
            category={category}
            onTranscriptionComplete={onDataSubmit}
            language={selectedLanguage}
          />
        )}
      </div>

      {/* Data Preview */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Data Preview
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600">
            Your data will appear here after submission
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataInputModule; 