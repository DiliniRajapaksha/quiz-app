import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigContextType } from '../types/config';

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

const STORAGE_KEYS = {
  WEBHOOK_URL: 'quiz_webhook_url',
  QUESTION_COUNT: 'quiz_question_count'
} as const;

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.WEBHOOK_URL);
    return stored || '';
  });

  const [questionCount, setQuestionCount] = useState<number>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.QUESTION_COUNT);
    return stored ? parseInt(stored, 10) : 10;
  });

  useEffect(() => {
    if (webhookUrl) {
      localStorage.setItem(STORAGE_KEYS.WEBHOOK_URL, webhookUrl);
    } else {
      localStorage.removeItem(STORAGE_KEYS.WEBHOOK_URL);
    }
  }, [webhookUrl]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUESTION_COUNT, questionCount.toString());
  }, [questionCount]);

  return (
    <ConfigContext.Provider value={{ 
      webhookUrl, 
      setWebhookUrl,
      questionCount,
      setQuestionCount
    }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};