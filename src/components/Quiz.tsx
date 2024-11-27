import React, { useState, useRef, useEffect } from 'react';
import { QuizItem, QuizState, QuizResult } from '../types/quiz';
import { QuizProgress } from './QuizProgress';
import { QuizInput } from './QuizInput';
import { FeedbackMessage } from './FeedbackMessage';
import { QuestionDisplay } from './QuestionDisplay';
import { ResultsSummary } from './ResultsSummary';

interface QuizProps {
  questions: QuizItem[];
}

export const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    userAnswer: '',
    isAnswerSubmitted: false,
    isCorrect: null,
    userAnswers: [],
    isComplete: false,
  });

  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (state.isAnswerSubmitted && state.isCorrect && nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  }, [state.isAnswerSubmitted, state.isCorrect]);

  if (questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === questions.length - 1;

  const handleAnswerSubmit = () => {
    if (state.isAnswerSubmitted) {
      // Move to next question or complete quiz
      if (isLastQuestion) {
        const results: QuizResult[] = questions.map((question, index) => ({
          question: question.question,
          userAnswer: state.userAnswers[index] || '',
          correctAnswer: question.answer,
          isCorrect: (state.userAnswers[index] || '').toLowerCase().trim() === question.answer.toLowerCase(),
        }));

        setState(prev => ({
          ...prev,
          isComplete: true,
        }));
      } else {
        setState({
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          userAnswer: '',
          isAnswerSubmitted: false,
          isCorrect: null,
        });
      }
    } else {
      // Check current answer
      const isCorrect = 
        state.userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase();
      setState(prev => ({
        ...prev,
        isAnswerSubmitted: true,
        isCorrect,
        userAnswers: [
          ...prev.userAnswers.slice(0, state.currentQuestionIndex),
          state.userAnswer,
          ...prev.userAnswers.slice(state.currentQuestionIndex + 1),
        ],
      }));
    }
  };

  const handleRestartQuiz = () => {
    setState({
      currentQuestionIndex: 0,
      userAnswer: '',
      isAnswerSubmitted: false,
      isCorrect: null,
      userAnswers: [],
      isComplete: false,
    });
  };

  if (state.isComplete) {
    const results: QuizResult[] = questions.map((question, index) => ({
      question: question.question,
      userAnswer: state.userAnswers[index] || '',
      correctAnswer: question.answer,
      isCorrect: (state.userAnswers[index] || '').toLowerCase().trim() === question.answer.toLowerCase(),
    }));

    return <ResultsSummary results={results} onRestartQuiz={handleRestartQuiz} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <QuizProgress
        current={state.currentQuestionIndex}
        total={questions.length}
      />

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <QuestionDisplay question={currentQuestion.question} />

        <div className="space-y-4 mt-6">
          <QuizInput
            value={state.userAnswer}
            onChange={(value) => setState(prev => ({ ...prev, userAnswer: value }))}
            onSubmit={handleAnswerSubmit}
            isDisabled={state.isAnswerSubmitted}
            autoFocus={!state.isAnswerSubmitted}
          />

          <FeedbackMessage
            isCorrect={state.isCorrect}
            correctAnswer={
              state.isAnswerSubmitted ? currentQuestion.answer : undefined
            }
          />

          <button
            ref={nextButtonRef}
            onClick={handleAnswerSubmit}
            disabled={!state.userAnswer && !state.isAnswerSubmitted}
            className="w-full mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50
                     disabled:cursor-not-allowed transition-colors"
          >
            {state.isAnswerSubmitted
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