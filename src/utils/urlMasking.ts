export const maskUrl = (url: string): string => {
  if (!url) return '';
  try {
    const urlObj = new URL(url);
    const host = urlObj.host;
    const maskedHost = `${host.slice(0, 4)}****${host.slice(-4)}`;
    return `${urlObj.protocol}//${maskedHost}${urlObj.pathname}`;
  } catch {
    return '****';
  }
};

export const isWebhookConfigured = (url: string): boolean => {
  return url.trim().length > 0;
};