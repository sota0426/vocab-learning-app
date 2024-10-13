// components/AudioTypeSelector.tsx
import React from 'react';

interface AudioTypeSelectorProps {
  audioSequence: string[];
  toggleAudioType: (audioType: string) => void;
}

const AudioTypeSelector: React.FC<AudioTypeSelectorProps> = ({
  audioSequence,
  toggleAudioType,
}) => {
  const audioTypes = ['英語（女性）', '英語（男性）', '日本語（女性）', '日本語（男性）',];

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">音声タイプを選択</h3>
      <div className="flex space-x-2">
        {audioTypes.map((audioType) => (
          <button
            key={audioType}
            onClick={() => toggleAudioType(audioType)}
            className={`px-4 py-2 rounded ${
              audioSequence.includes(audioType)
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            {audioType}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AudioTypeSelector;
