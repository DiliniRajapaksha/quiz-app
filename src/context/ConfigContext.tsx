import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigContextType } from '../types/config';

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    const stored = localStorage.getItem('quiz_webhook_url');
    return stored || 'https://hook.eu2.make.com/t7oez2zaywaq3pt5jhfgy3xil9q2fs0u';
  });

  useEffect(() => {
    localStorage.setItem('quiz_webhook_url', webhookUrl);
  }, [webhookUrl]);

  return (
    <ConfigContext.Provider value={{ webhookUrl, setWebhookUrl }}>
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