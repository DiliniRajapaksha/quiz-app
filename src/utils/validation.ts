export const isValidUrl = (url: string): boolean => {
  try {
    const urlObject = new URL(url);
    return urlObject.protocol === 'https:';
  } catch {
    return false;
  }
};