import React from 'react';

interface QuizProgressProps {
  current: number;
  total: number;
}

export const QuizProgress: React.FC<QuizProgressProps> = ({ current, total }) => {
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm text-gray-600">
          {Math.round(((current + 1) / total) * 100)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
};