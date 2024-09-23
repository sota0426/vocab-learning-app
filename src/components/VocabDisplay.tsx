import React, { useState, useEffect } from 'react';
import vocabData from '../data/vocabData.json';
import DisplayWords from './DisplayWords';
import DisplayImage from './DisplayImage';
import AdditionalInfo from './AdditionalInfo';
import AudioPlayer from './AudioPlayer';
import NavigationControls from './NavigationControls';
import SettingsModal from './SettingsModal';
import { Settings } from 'lucide-react';

interface VocabWord {
  word_1_en: string;
  word_1_ja: string;
  word_IPA: string;
  word_image_URL: string;
  word_audio_1_female: string;
  word_audio_1_male: string;
}

export default function VocabDisplay() {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [nextWordDelay, setNextWordDelay] = useState<number>(1);
  const [audioSequence, setAudioSequence] = useState<string[]>([
    '英語（女性）',
    '英語（男性）',
    '日本語',
  ]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState<boolean>(true);

  const currentWord: VocabWord = vocabData[currentWordIndex];

  const getAudioSource = (): string => {
    const currentAudioType = audioSequence[currentAudioIndex];
    switch (currentAudioType) {
      case '英語（女性）':
        return currentWord.word_audio_1_female;
      case '英語（男性）':
        return currentWord.word_audio_1_male;
      case '日本語':
        return `/audio/audio_JPN/${currentWordIndex + 1}.mp3`;
      default:
        return '';
    }
  };

  const getImagePath = (imagePath: string): string => {
    if (imagePath.startsWith('public\\')) {
      return '/' + imagePath.replace('public\\', '').replace('\\', '/');
    }
    return imagePath;
  };

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) =>
      prevIndex < vocabData.length - 1 ? prevIndex + 1 : 0
    );
    setCurrentAudioIndex(0);
  };

  const prevWord = () => {
    setCurrentWordIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : vocabData.length - 1
    );
    setCurrentAudioIndex(0);
  };

  const handleAudioEnded = () => {
    setTimeout(() => {
      if (currentAudioIndex < audioSequence.length - 1) {
        setCurrentAudioIndex((prevIndex) => prevIndex + 1);
        setIsPlaying(true);
      } else {
        nextWord();
        setIsPlaying(true);
      }      
    }, nextWordDelay * 500);
  };

  const toggleAudioType = (audioType: string) => {
    setAudioSequence((prevSequence) => {
      if (prevSequence.includes(audioType)) {
        return prevSequence.filter((type) => type !== audioType);
      } else {
        return [...prevSequence, audioType];
      }
    });
    setCurrentAudioIndex(0);
  };

  useEffect(() => {
    if (isPlaying && audioSequence.length > 0) {
      // Start playing the current audio
    }
  }, [currentWordIndex, currentAudioIndex, audioSequence, isPlaying]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-sans p-4 overflow-hidden">
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 overflow-auto">
        <div className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-center">
          <DisplayWords word={currentWord} />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-center">
          <DisplayImage imagePath={getImagePath(currentWord.word_image_URL)} />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <AudioPlayer
          src={getAudioSource()}
          playbackRate={playbackRate}
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onStop={() => setIsPlaying(false)}
          onEnded={handleAudioEnded}
        />

        <NavigationControls
          onPrev={prevWord}
          onNext={nextWord}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying((prev) => !prev)}
        />

        <p className="text-xs text-gray-500">
          現在の再生順序: {audioSequence.join(' → ') || 'なし'}
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center space-x-2"
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm">設定</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-md max-h-[90vh] overflow-auto">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">設定</h2>
            <SettingsModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              playbackRate={playbackRate}
              setPlaybackRate={setPlaybackRate}
              nextWordDelay={nextWordDelay}
              setNextWordDelay={setNextWordDelay}
              audioSequence={audioSequence}
              toggleAudioType={toggleAudioType}
              showAdditionalInfo={showAdditionalInfo}
              setShowAdditionalInfo={setShowAdditionalInfo}
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out text-sm"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}