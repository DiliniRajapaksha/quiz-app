import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface FeedbackMessageProps {
  isCorrect: boolean | null;
  correctAnswer?: string;
}

export const FeedbackMessage: React.FC<FeedbackMessageProps> = ({
  isCorrect,
  correctAnswer
}) => {
  if (isCorrect === null) return null;

  return (
    <div
      className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {isCorrect ? (
        <>
          <CheckCircle className="w-5 h-5" />
          <span>Correct!</span>
        </>
      ) : (
        <>
          <XCircle className="w-5 h-5" />
          <span>
            Incorrect. The correct spelling is: <strong>{correctAnswer}</strong>
          </span>
        </>
      )}
    </div>
  );
};