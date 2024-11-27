import { useState, useCallback } from 'react';
import { QuizItem } from '../types/quiz';
import { useConfig } from '../context/ConfigContext';
import { sampleQuestions } from '../data/sampleQuestions';

export const useQuizData = () => {
  const { webhookUrl } = useConfig();
  const [questions, setQuestions] = useState<QuizItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsUsingFallback(false);

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
      
      // Validate the response structure
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

      setQuestions(validQuestions);
    } catch (err) {
      console.error('Error fetching quiz questions:', err);
      // Use sample questions as fallback
      setQuestions(sampleQuestions);
      setIsUsingFallback(true);
      setError('Unable to load online questions. Using offline question set.');
    } finally {
      setIsLoading(false);
    }
  }, [webhookUrl]);

  return { questions, isLoading, error, isUsingFallback, fetchQuestions };
};