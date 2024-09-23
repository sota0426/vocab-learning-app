import React from 'react';
import AudioTypeSelector from './AudioTypeSelector';
import PlaybackSettings from './AudioPlaybackSettings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  playbackRate: number;
  setPlaybackRate: (rate: number) => void;
  nextWordDelay: number;
  setNextWordDelay: (delay: number) => void;
  audioSequence: string[];
  toggleAudioType: (audioType: string) => void;
  showAdditionalInfo: boolean;
  setShowAdditionalInfo: (show: boolean) => void;
  displayOptions: {
    showWordClass: boolean;
    showWordStructure: boolean;
    showWordAlt: boolean;
  };
  setDisplayOptions: (options: any) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  playbackRate,
  setPlaybackRate,
  nextWordDelay,
  setNextWordDelay,
  displayOptions,
  setDisplayOptions,
  audioSequence,
  toggleAudioType,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayOptions({
      ...displayOptions,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50`}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h1 className="text-lg font-semibold mb-4">設定</h1>
        <br />

        {/* AudioTypeSelector の追加 */}
        <AudioTypeSelector
          audioSequence={audioSequence}
          toggleAudioType={toggleAudioType}
        />
        <br />
        <br />

        {/* PlaybackSettings の追加 */}
        <PlaybackSettings
          playbackRate={playbackRate}
          setPlaybackRate={setPlaybackRate}
          nextWordDelay={nextWordDelay}
          setNextWordDelay={setNextWordDelay}
        />
        <br />

       {/* チェックボックスのオプション */}
       <div className="mb-4">
          <label className="block">
            <input
              type="checkbox"
              name="showWordClass"
              checked={displayOptions.showWordClass}
              onChange={handleCheckboxChange}
            />
            単語のクラス（品詞）
          </label>
          <label className="block">
            <input
              type="checkbox"
              name="showWordStructure"
              checked={displayOptions.showWordStructure}
              onChange={handleCheckboxChange}
            />
            単語の構造
          </label>
          <label className="block">
            <input
              type="checkbox"
              name="showWordAlt"
              checked={displayOptions.showWordAlt}
              onChange={handleCheckboxChange}
            />
            別の単語（英語・日本語）
          </label>
        </div>

        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
          閉じる
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
