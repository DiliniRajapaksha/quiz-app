import { useState, useEffect, useCallback } from 'react';
import { QuizProgress, QuizStats } from '../types/progress';
import { QuizItem } from '../types/quiz';
import { saveProgress, loadProgress, calculateStats } from '../utils/storage';

export const useQuizProgress = (questions: QuizItem[]) => {
  const [progress, setProgress] = useState<QuizProgress>(() => {
    const stored = loadProgress();
    if (stored && stored.answers.length === questions.length) {
      return stored;
    }
    
    return {
      lastAttemptedAt: new Date().toISOString(),
      currentQuestionIndex: 0,
      answers: questions.map((q, index) => ({
        questionId: `q${index}`,
        question: q.question,
        userAnswer: '',
        correctAnswer: q.answer,
        isCorrect: false,
        answeredAt: ''
      })),
      isComplete: false
    };
  });

  const [stats, setStats] = useState<QuizStats>(() => 
    calculateStats(progress)
  );

  useEffect(() => {
    saveProgress(progress);
    setStats(calculateStats(progress));
  }, [progress]);

  const recordAnswer = useCallback((answer: string) => {
    setProgress(prev => {
      const isCorrect = answer.toLowerCase().trim() === 
        questions[prev.currentQuestionIndex].answer.toLowerCase();
      
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = {
        ...newAnswers[prev.currentQuestionIndex],
        userAnswer: answer,
        isCorrect,
        answeredAt: new Date().toISOString()
      };

      return {
        ...prev,
        lastAttemptedAt: new Date().toISOString(),
        answers: newAnswers
      };
    });
  }, [questions]);

  const moveToNext = useCallback(() => {
    setProgress(prev => {
      const nextIndex = prev.currentQuestionIndex + 1;
      const isComplete = nextIndex >= questions.length;

      return {
        ...prev,
        currentQuestionIndex: isComplete ? prev.currentQuestionIndex : nextIndex,
        isComplete
      };
    });
  }, [questions.length]);

  const resetProgress = useCallback(() => {
    const newProgress: QuizProgress = {
      lastAttemptedAt: new Date().toISOString(),
      currentQuestionIndex: 0,
      answers: questions.map((q, index) => ({
        questionId: `q${index}`,
        question: q.question,
        userAnswer: '',
        correctAnswer: q.answer,
        isCorrect: false,
        answeredAt: ''
      })),
      isComplete: false
    };
    setProgress(newProgress);
  }, [questions]);

  return {
    progress,
    stats,
    recordAnswer,
    moveToNext,
    resetProgress
  };
};