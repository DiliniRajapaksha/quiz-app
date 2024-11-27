import React, { useState } from 'react';
import { Loader2, Wifi, WifiOff } from 'lucide-react';
import { QuestionCountInput } from './QuestionCountInput';
import { useConfig } from '../context/ConfigContext';

interface StartScreenProps {
  onStart: () => void;
  isLoading: boolean;
  error: string | null;
  isUsingFallback?: boolean;
}

export const StartScreen: React.FC<StartScreenProps> = ({ 
  onStart, 
  isLoading, 
  error,
  isUsingFallback 
}) => {
  const { questionCount, setQuestionCount } = useConfig();
  const [inputError, setInputError] = useState<string>();

  const handleQuestionCountChange = (value: number) => {
    if (value < 1 || value > 50) {
      setInputError('Please enter a number between 1 and 50');
    } else {
      setInputError(undefined);
      setQuestionCount(value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Spelling Challenge
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Test your spelling skills with our interactive quiz. Each question contains one misspelled word.
        Can you spot and correct them all?
      </p>
      
      <QuestionCountInput
        value={questionCount}
        onChange={handleQuestionCountChange}
        error={inputError}
      />
      
      {error && (
        <div className={`flex items-center gap-2 p-4 rounded-lg mb-6 max-w-md ${
          isUsingFallback ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-700'
        }`}>
          {isUsingFallback ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={onStart}
        disabled={isLoading || !!inputError}
        className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg
                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1
                 active:translate-y-0 flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading Questions...
          </>
        ) : (
          'Start Quiz'
        )}
      </button>
    </div>
  );
};