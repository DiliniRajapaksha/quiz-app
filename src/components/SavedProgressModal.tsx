import React from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { loadProgress } from '../utils/storage';
import { calculateStats } from '../utils/storage';
import { formatDate } from '../utils/dateFormat';

interface SavedProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SavedProgressModal: React.FC<SavedProgressModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  const progress = loadProgress();
  if (!progress) return null;

  const stats = calculateStats(progress);
  const lastAttempted = new Date(progress.lastAttemptedAt);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Saved Progress</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">
              Last attempted: {formatDate(lastAttempted)}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Current question: {progress.currentQuestionIndex + 1} of {stats.totalQuestions}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600">Accuracy Rate</p>
              <p className="text-2xl font-bold text-green-700">
                {Math.round(stats.accuracyRate)}%
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600">Completion</p>
              <p className="text-2xl font-bold text-purple-700">
                {Math.round(stats.completionRate)}%
              </p>
            </div>
          </div>

          <div className="border rounded-lg divide-y">
            {progress.answers.map((answer, index) => (
              <div key={answer.questionId} className="p-4">
                <div className="flex items-start gap-3">
                  {answer.userAnswer && (
                    answer.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    )
                  )}
                  <div className="flex-1">
                    <p className="text-gray-900 mb-1">
                      Question {index + 1}: {answer.question}
                    </p>
                    {answer.userAnswer && (
                      <div className="text-sm">
                        <p className={`${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          Your answer: {answer.userAnswer}
                        </p>
                        {!answer.isCorrect && (
                          <p className="text-green-600">
                            Correct answer: {answer.correctAnswer}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};