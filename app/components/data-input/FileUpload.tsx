'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

interface FileUploadProps {
  category: string;
  onUploadComplete: (data: any) => void;
  language: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  category,
  onUploadComplete,
  language,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      formData.append('category', category);
      formData.append('language', language);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onUploadComplete(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, [category, language, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/json': ['.json'],
    },
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-500'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <div className="text-4xl mb-2">📁</div>
          {isDragActive ? (
            <p className="text-blue-600">Drop the file here...</p>
          ) : (
            <>
              <p className="text-gray-600">
                Drag and drop your file here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: CSV, Excel, JSON
              </p>
            </>
          )}
        </div>
      </div>

      {uploading && (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Uploading...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">File Requirements</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Maximum file size: 10MB</li>
          <li>• Supported formats: CSV, Excel, JSON</li>
          <li>• Required columns: Date, Value, Unit</li>
          <li>• Optional columns: Notes, Category</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload; 