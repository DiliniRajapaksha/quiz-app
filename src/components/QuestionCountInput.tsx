import React from 'react';
import { QuestionCountInputProps } from '../types/config';
import { HelpCircle } from 'lucide-react';

export const QuestionCountInput: React.FC<QuestionCountInputProps> = ({
  value,
  onChange,
  error
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Number of Questions
        <div className="inline-block ml-2 group relative">
          <HelpCircle className="w-4 h-4 text-gray-400 inline" />
          <div className="hidden group-hover:block absolute left-0 transform -translate-x-1/2 bottom-6 w-64 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg">
            Choose how many questions you want in your quiz. We recommend 5-20 questions for an optimal experience.
          </div>
        </div>
      </label>
      <input
        type="number"
        min="1"
        max="50"
        value={value}
        onChange={handleChange}
        placeholder="Enter 5-20 questions"
        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
          border p-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-300' : 'border-gray-300'}`}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};