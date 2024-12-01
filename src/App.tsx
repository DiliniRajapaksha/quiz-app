import React, { useState } from 'react';
import { Quiz } from './components/Quiz';
import { StartScreen } from './components/StartScreen';
import { ConfigButton } from './components/ConfigButton';
import { CheckProgressButton } from './components/CheckProgressButton';
import { ConfigProvider } from './context/ConfigContext';
import { useQuizData } from './hooks/useQuizData';

function AppContent() {
  const { questions, isLoading, error, isUsingFallback, fetchQuestions } = useQuizData();
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStart = async () => {
    await fetchQuestions();
    setQuizStarted(true);
  };

  const handleNewQuiz = async () => {
    setQuizStarted(false); // Reset quiz started state
    await fetchQuestions(); // Fetch new questions
    setQuizStarted(true); // Start new quiz
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 relative">
        <ConfigButton />
        {!quizStarted || questions.length === 0 ? (
          <StartScreen
            onStart={handleStart}
            isLoading={isLoading}
            error={error}
            isUsingFallback={isUsingFallback}
          />
        ) : (
          <Quiz 
            key={Date.now()} // Add key to force component remount
            questions={questions}
            onNewQuiz={handleNewQuiz}
          />
        )}
        <CheckProgressButton />
      </div>
    </div>
  );
}

function App() {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
}

export default App;