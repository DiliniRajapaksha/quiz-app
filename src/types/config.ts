export interface WebhookConfig {
  url: string;
}

export interface ConfigContextType {
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
  questionCount: number;
  setQuestionCount: (count: number) => void;
}

export interface QuestionCountInputProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}