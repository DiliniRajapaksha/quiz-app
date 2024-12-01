import { QuizProgress, QuizStats } from '../types/progress';

const STORAGE_KEY = 'quiz_progress';

export const saveProgress = (progress: QuizProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

export const loadProgress = (): QuizProgress | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return null;
  }
};

export const clearProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear progress:', error);
  }
};

export const calculateStats = (progress: QuizProgress): QuizStats => {
  const totalQuestions = progress.answers.length;
  const questionsAttempted = progress.answers.filter(a => a.userAnswer).length;
  const correctAnswers = progress.answers.filter(a => a.isCorrect).length;
  
  return {
    totalQuestions,
    questionsAttempted,
    correctAnswers,
    accuracyRate: questionsAttempted > 0 ? (correctAnswers / questionsAttempted) * 100 : 0,
    completionRate: (questionsAttempted / totalQuestions) * 100
  };
};