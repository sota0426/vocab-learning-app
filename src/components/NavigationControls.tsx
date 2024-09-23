// src/components/NavigationControls.tsx
import React from 'react';

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrev,
  onNext,
  isPlaying,
  onPlayPause,
}) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onPrev}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        前に戻る
      </button>
      <button
        onClick={onPlayPause}
        className={`px-4 py-2 rounded ${
          isPlaying
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isPlaying ? 'ストップ' : 'スタート'}
      </button>
      <button
        onClick={onNext}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        次に進む
      </button>
    </div>
  );
};

export default NavigationControls;
