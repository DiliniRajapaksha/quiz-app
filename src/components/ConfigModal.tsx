import React, { useState } from 'react';
import { HelpCircle, X, Check, AlertCircle } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { isValidUrl } from '../utils/validation';
import { isWebhookConfigured } from '../utils/urlMasking';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose }) => {
  const { webhookUrl, setWebhookUrl } = useConfig();
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (inputUrl && !isValidUrl(inputUrl)) {
      setError('Please enter a valid HTTPS URL');
      return;
    }

    setWebhookUrl(inputUrl);
    setSuccess(true);
    setInputUrl('');
    setTimeout(() => {
      onClose();
      setSuccess(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Configure Webhook</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            {isWebhookConfigured(webhookUrl) ? (
              <>
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Webhook configured</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-600">Using sample questions</span>
              </>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Webhook URL
              <div className="inline-block ml-2 group relative">
                <HelpCircle className="w-4 h-4 text-gray-400 inline" />
                <div className="hidden group-hover:block absolute left-0 transform -translate-x-1/2 bottom-6 w-64 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg">
                  A webhook URL is an endpoint that receives quiz questions. Leave empty to use sample questions.
                </div>
              </div>
            </label>
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                       border p-2"
              placeholder="https://your-webhook-url.com (optional)"
              autoComplete="off"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Configuration
            </button>
          </div>

          {success && (
            <div className="mt-2 text-sm text-green-600 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Configuration saved successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};