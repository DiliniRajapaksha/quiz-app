export interface WebhookConfig {
  url: string;
}

export interface ConfigContextType {
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
}