// src/components/SettingsModal.tsx
import React from 'react';
import PlaybackSettings from './PlaybackSettings';
import AudioTypeSelector from './AudioTypeSelector';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  playbackRate: number;
  setPlaybackRate: (value: number) => void;
  nextWordDelay: number;
  setNextWordDelay: (value: number) => void;
  audioSequence: string[];
  toggleAudioType: (audioType: string) => void;
  showAdditionalInfo: boolean;
  setShowAdditionalInfo: (value: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  playbackRate,
  setPlaybackRate,
  nextWordDelay,
  setNextWordDelay,
  audioSequence,
  toggleAudioType,
  showAdditionalInfo,
  setShowAdditionalInfo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded shadow-lg z-10 w-11/12 md:w-1/2">
        <h2 className="text-xl font-bold mb-4">設定</h2>

        <PlaybackSettings
          playbackRate={playbackRate}
          setPlaybackRate={setPlaybackRate}
          nextWordDelay={nextWordDelay}
          setNextWordDelay={setNextWordDelay}
        />

        <AudioTypeSelector
          audioSequence={audioSequence}
          toggleAudioType={toggleAudioType}
        />

        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showAdditionalInfo}
              onChange={(e) => setShowAdditionalInfo(e.target.checked)}
            />
            <span>追加情報を表示する</span>
          </label>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
