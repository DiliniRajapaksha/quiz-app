import React, { useState, useRef, useEffect } from 'react';
import { QuizItem } from '../types/quiz';
import { QuizProgress } from './QuizProgress';
import { QuizInput } from './QuizInput';
import { FeedbackMessage } from './FeedbackMessage';
import { QuestionDisplay } from './QuestionDisplay';
import { ResultsSummary } from './ResultsSummary';
import { useQuizProgress } from '../hooks/useQuizProgress';
import { ProgressStats } from './ProgressStats';
import { clearProgress } from '../utils/storage';

interface QuizProps {
  questions: QuizItem[];
  onNewQuiz: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onNewQuiz }) => {
  const {
    progress,
    stats,
    recordAnswer,
    moveToNext,
    resetProgress
  } = useQuizProgress(questions);

  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isAnswerSubmitted && isCorrect && nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  }, [isAnswerSubmitted, isCorrect]);

  if (questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[progress.currentQuestionIndex];
  const isLastQuestion = progress.currentQuestionIndex === questions.length - 1;

  const handleAnswerSubmit = () => {
    if (isAnswerSubmitted) {
      // Move to next question or complete quiz
      if (isLastQuestion) {
        moveToNext();
      } else {
        moveToNext();
        setUserAnswer('');
        setIsAnswerSubmitted(false);
        setIsCorrect(null);
      }
    } else {
      // Check current answer
      const isCorrect = 
        userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase();
      recordAnswer(userAnswer);
      setIsAnswerSubmitted(true);
      setIsCorrect(isCorrect);
    }
  };

  const handleNewQuiz = () => {
    clearProgress(); // Clear the stored progress before starting new quiz
    onNewQuiz(); // Call the parent's new quiz handler
  };

  if (progress.isComplete) {
    return (
      <ResultsSummary
        results={progress.answers.map(answer => ({
          question: answer.question,
          userAnswer: answer.userAnswer,
          correctAnswer: answer.correctAnswer,
          isCorrect: answer.isCorrect,
        }))}
        onRestartQuiz={resetProgress}
        onNewQuiz={handleNewQuiz}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <ProgressStats stats={stats} />
      
      <QuizProgress
        current={progress.currentQuestionIndex}
        total={questions.length}
      />

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <QuestionDisplay question={currentQuestion.question} />

        <div className="space-y-4 mt-6">
          <QuizInput
            value={userAnswer}
            onChange={setUserAnswer}
            onSubmit={handleAnswerSubmit}
            isDisabled={isAnswerSubmitted}
            autoFocus={!isAnswerSubmitted}
          />

          <FeedbackMessage
            isCorrect={isCorrect}
            correctAnswer={
              isAnswerSubmitted ? currentQuestion.answer : undefined
            }
          />

          <button
            ref={nextButtonRef}
            onClick={handleAnswerSubmit}
            disabled={!userAnswer && !isAnswerSubmitted}
            className="w-full mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50
                     disabled:cursor-not-allowed transition-colors"
          >
            {isAnswerSubmitted
              ? isLastQuestion
                ? 'Finish Quiz'
                : 'Next Question'
              : 'Check Answer'}
          </button>
        </div>
      </div>
    </div>
  );
};