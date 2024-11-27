import React, { useState } from 'react';
import { Quiz } from './components/Quiz';
import { StartScreen } from './components/StartScreen';
import { ConfigButton } from './components/ConfigButton';
import { ConfigProvider } from './context/ConfigContext';
import { useQuizData } from './hooks/useQuizData';

function AppContent() {
  const { questions, isLoading, error, isUsingFallback, fetchQuestions } = useQuizData();
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStart = async () => {
    await fetchQuestions();
    setQuizStarted(true);
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
          <Quiz questions={questions} />
        )}
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