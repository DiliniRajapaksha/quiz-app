import React from 'react';

interface QuestionDisplayProps {
  question: string;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  return (
    <div className="space-y-4">
      <div className="text-gray-600">
        <p className="font-medium mb-1">There is one spelling mistake in this sentence.</p>
        <p>Write the correct spelling of the word in the box.</p>
      </div>
      <p className="text-xl font-medium text-gray-900">{question}</p>
    </div>
  );
};