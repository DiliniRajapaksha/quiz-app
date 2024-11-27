import React from 'react';
import { QuizResult } from '../types/quiz';
import { CheckCircle, XCircle } from 'lucide-react';

interface ResultsSummaryProps {
  results: QuizResult[];
  onRestartQuiz: () => void;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({ results, onRestartQuiz }) => {
  const correctAnswers = results.filter(result => result.isCorrect).length;
  const totalQuestions = results.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Results</h2>
      
      {/* Score Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-600 mb-2">{percentage}%</p>
          <p className="text-gray-600">
            You got {correctAnswers} out of {totalQuestions} questions correct
          </p>
        </div>
      </div>

      {/* Question Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Question Breakdown</h3>
        {results.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              result.isCorrect ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <div className="flex items-start gap-3">
              {result.isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="text-gray-900 mb-2">
                  Question {index + 1}: {result.question}
                </p>
                <div className="text-sm">
                  <p className="text-gray-600">
                    Your answer: 
                    <span className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {' '}{result.userAnswer || '(no answer)'}
                    </span>
                  </p>
                  {!result.isCorrect && (
                    <p className="text-gray-600">
                      Correct answer: <span className="text-green-600">{result.correctAnswer}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Restart Button */}
      <button
        onClick={onRestartQuiz}
        className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg
                 hover:bg-blue-700 focus:outline-none focus:ring-2 
                 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};