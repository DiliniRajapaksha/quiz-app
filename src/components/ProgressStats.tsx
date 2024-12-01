import React from 'react';
import { QuizStats } from '../types/progress';

interface ProgressStatsProps {
  stats: QuizStats;
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Progress</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Questions Attempted</p>
          <p className="text-xl font-bold text-blue-600">
            {stats.questionsAttempted} / {stats.totalQuestions}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Accuracy Rate</p>
          <p className="text-xl font-bold text-green-600">
            {Math.round(stats.accuracyRate)}%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Correct Answers</p>
          <p className="text-xl font-bold text-indigo-600">
            {stats.correctAnswers}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Completion</p>
          <p className="text-xl font-bold text-purple-600">
            {Math.round(stats.completionRate)}%
          </p>
        </div>
      </div>
    </div>
  );
};