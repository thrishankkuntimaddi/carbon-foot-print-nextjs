'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface VoiceInputProps {
  onTranscriptionComplete: (text: string) => void;
  category: string;
  language?: string;
}

const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscriptionComplete,
  category,
  language = 'en-US'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setError('Speech recognition is not supported in this browser.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const current = event.resultIndex;
        const transcriptResult = event.results[current][0].transcript;
        setTranscript(transcriptResult);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setError(`Error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      if (isListening) {
        recognition.start();
      }

      return () => {
        recognition.stop();
      };
    } catch (err) {
      setError('Failed to initialize speech recognition.');
      console.error('Speech recognition error:', err);
    }
  }, [isListening, language]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setError(null);
      setTranscript('');
    }
  };

  const handleSubmit = () => {
    if (transcript) {
      onTranscriptionComplete(transcript);
      setTranscript('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleListening}
          className={`px-4 py-2 rounded-lg font-medium ${
            isListening
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isListening ? 'Stop Recording' : 'Start Recording'}
        </motion.button>
        {transcript && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
          >
            Submit
          </motion.button>
        )}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-red-100 text-red-700 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {transcript && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-gray-50 rounded-lg"
        >
          <h3 className="font-medium mb-2">Transcription:</h3>
          <p className="text-gray-700">{transcript}</p>
        </motion.div>
      )}

      <div className="text-sm text-gray-500">
        <h4 className="font-medium mb-1">Tips:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Speak clearly and at a normal pace</li>
          <li>Use natural language to describe your {category.toLowerCase()} data</li>
          <li>You can pause and resume recording as needed</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceInput; 