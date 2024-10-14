// src/components/SettingsModal.tsx

import React, { useState } from 'react';
import PlaybackSettings from './AudioPlaybackSettings';
import AudioSettings from './AudioSettingsModal';
import { SelectedItem } from '../types';

interface DisplayOptions {
  showWordPronunciation: boolean;
  showWordClass: boolean;
  showWordStructure: boolean;
  showWordAlt: boolean;
  showWordDescription: boolean;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  playbackRate: number;
  setPlaybackRate: (rate: number) => void;
  nextWordDelay: number;
  setNextWordDelay: (delay: number) => void;
  displayOptions: DisplayOptions;
  setDisplayOptions: (options: DisplayOptions) => void;
  selectedItems: SelectedItem[];
  setSelectedItems: (items: SelectedItem[]) => void;
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
  selectedItems,
  setSelectedItems,
}) => {
  const [activeTab, setActiveTab] = useState<'playback' | 'audio'>('audio'); // アクティブなタブの初期値

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayOptions({
      ...displayOptions,
      [e.target.name]: e.target.checked,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h1 className="text-lg font-semibold mb-4">設定</h1>

        {/* タブ */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab('playback')}
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === 'playback' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            再生設定
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === 'audio' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            音声設定
          </button>
        </div>

        {/* アクティブなタブの内容を表示 */}
        {activeTab === 'playback' && (
          <div>
            {/* PlaybackSettings の追加 */}
            <PlaybackSettings
              playbackRate={playbackRate}
              setPlaybackRate={setPlaybackRate}
              nextWordDelay={nextWordDelay}
              setNextWordDelay={setNextWordDelay}
            />

            {/* チェックボックスのオプション */}
            <div className="mb-4 text-left">
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="showWordPronunciation"
                  checked={displayOptions.showWordPronunciation}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
               発音
              </label>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="showWordDescription"
                  checked={displayOptions.showWordDescription}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                単語の説明
              </label>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="showWordClass"
                  checked={displayOptions.showWordClass}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                単語のクラス（品詞）
              </label>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="showWordStructure"
                  checked={displayOptions.showWordStructure}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                単語の構造
              </label>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="showWordAlt"
                  checked={displayOptions.showWordAlt}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                別の単語（英語・日本語）
              </label>
            </div>
          </div>
        )}

        {activeTab === 'audio' && (
          <div>
            {/* AudioSettings の追加 */}
            <AudioSettings
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
