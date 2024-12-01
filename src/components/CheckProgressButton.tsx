import React, { useState } from 'react';
import { History } from 'lucide-react';
import { SavedProgressModal } from './SavedProgressModal';
import { loadProgress } from '../utils/storage';

export const CheckProgressButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const savedProgress = loadProgress();
  const hasProgress = savedProgress !== null;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={!hasProgress}
        className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg 
                   flex items-center gap-2 transition-all duration-200
                   ${hasProgress 
                     ? 'bg-blue-600 text-white hover:bg-blue-700' 
                     : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        title={hasProgress ? 'Check saved progress' : 'No saved progress available'}
      >
        <History className="w-5 h-5" />
      </button>
      <SavedProgressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};