export interface QuizProgress {
  lastAttemptedAt: string;
  currentQuestionIndex: number;
  answers: Answer[];
  isComplete: boolean;
}

export interface Answer {
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  answeredAt: string;
}

export interface QuizStats {
  totalQuestions: number;
  questionsAttempted: number;
  correctAnswers: number;
  accuracyRate: number;
  completionRate: number;
}