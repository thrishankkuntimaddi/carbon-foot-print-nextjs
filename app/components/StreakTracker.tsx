'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StreakDay {
  date: Date;
  completed: boolean;
  points: number;
}

const StreakTracker: React.FC = () => {
  const [streak, setStreak] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [streakDays, setStreakDays] = useState<StreakDay[]>([]);

  useEffect(() => {
    // Simulate loading streak data
    const mockStreakData: StreakDay[] = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date,
        completed: i < 5, // Last 5 days completed
        points: Math.floor(Math.random() * 50) + 10,
      };
    });

    setStreakDays(mockStreakData);
    setStreak(5); // Current streak
    setTotalPoints(mockStreakData.reduce((sum, day) => sum + day.points, 0));
  }, []);

  const DayWrapper = motion.div;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Sustainability Streak</h2>
        <p className="text-gray-600">Keep tracking your carbon footprint to maintain your streak!</p>
      </div>

      <div className="flex justify-center items-center mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">{streak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
        <div className="mx-8 text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">{totalPoints}</div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {streakDays.map((day, index) => (
          <DayWrapper
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`text-center p-2 rounded-lg ${
              day.completed
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <div className="text-xs font-medium">
              {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="text-lg font-bold">{day.date.getDate()}</div>
            {day.completed && (
              <div className="text-xs mt-1">+{day.points} pts</div>
            )}
          </DayWrapper>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Complete daily tasks to earn points and maintain your streak!
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-center text-sm text-gray-700">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Update carbon data
          </div>
          <div className="flex items-center justify-center text-sm text-gray-700">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            View reports
          </div>
          <div className="flex items-center justify-center text-sm text-gray-700">
            <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
            Share insights
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakTracker; 