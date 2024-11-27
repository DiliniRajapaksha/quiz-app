export interface QuizItem {
  question: string;
  answer: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  userAnswer: string;
  isAnswerSubmitted: boolean;
  isCorrect: boolean | null;
  userAnswers: string[];
  isComplete: boolean;
}

export interface QuizResult {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}