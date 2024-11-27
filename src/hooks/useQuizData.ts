import { useState, useCallback } from 'react';
import { QuizItem } from '../types/quiz';
import { useConfig } from '../context/ConfigContext';
import { sampleQuestions } from '../data/sampleQuestions';
import { isValidUrl } from '../utils/validation';

export const useQuizData = () => {
  const { webhookUrl, questionCount } = useConfig();
  const [questions, setQuestions] = useState<QuizItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsUsingFallback(false);

    // If no webhook URL is set or it's invalid, use sample questions
    if (!webhookUrl || !isValidUrl(webhookUrl)) {
      const shuffled = [...sampleQuestions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, questionCount));
      setIsUsingFallback(true);
      setError('No webhook configured. Using sample questions.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch quiz questions');
      }

      const data = await response.json();
      
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid response format');
      }

      const validQuestions = data.map((item: any) => ({
        question: String(item.question || ''),
        answer: String(item.answer || ''),
      })).filter(item => item.question && item.answer);

      if (validQuestions.length === 0) {
        throw new Error('No valid questions received');
      }

      const shuffled = [...validQuestions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, questionCount));
    } catch (err) {
      console.error('Error fetching quiz questions:', err);
      const shuffled = [...sampleQuestions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, questionCount));
      setIsUsingFallback(true);
      setError('Unable to load online questions. Using sample questions.');
    } finally {
      setIsLoading(false);
    }
  }, [webhookUrl, questionCount]);

  return { questions, isLoading, error, isUsingFallback, fetchQuestions };
};