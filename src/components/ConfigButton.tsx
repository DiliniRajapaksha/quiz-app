import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { ConfigModal } from './ConfigModal';

export const ConfigButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 
                   hover:bg-gray-100 rounded-lg transition-colors focus:outline-none 
                   focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Configure Webhook"
      >
        <Settings className="w-5 h-5" />
      </button>
      <ConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};