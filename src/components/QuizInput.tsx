import React, { useRef, useEffect } from 'react';

interface QuizInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isDisabled: boolean;
  autoFocus?: boolean;
}

export const QuizInput: React.FC<QuizInputProps> = ({
  value,
  onChange,
  onSubmit,
  isDisabled,
  autoFocus = true
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && !isDisabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, isDisabled]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isDisabled) {
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-md">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isDisabled}
        placeholder="Type your answer here..."
        className="w-full px-4 py-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />
    </div>
  );
};