import React, { useState, useEffect, useRef } from 'react';
import vocabData from '../data/vocabData.json';

const VocabDisplay = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [nextWordDelay, setNextWordDelay] = useState(1);
  const [audioSequence, setAudioSequence] = useState(['英語（女性）', '英語（男性）', '日本語']);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const audioRef = useRef(null);
  const currentWord = vocabData[currentWordIndex];

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % vocabData.length);
    setCurrentAudioIndex(0);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentAudioIndex(0);
    }
  };

  useEffect(() => {
    if (audioSequence.length > 0) {
      playAudio();
    }
  }, [currentWordIndex, currentAudioIndex]);

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setTimeout(() => {
      if (currentAudioIndex < audioSequence.length - 1) {
        setCurrentAudioIndex(prevIndex => prevIndex + 1);
      } else {
        nextWord();
      }
    }, nextWordDelay * 1000);
  };

  const getAudioSource = () => {
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

  const toggleAudioType = (audioType) => {
    setAudioSequence(prevSequence => {
      if (prevSequence.includes(audioType)) {
        return prevSequence.filter(type => type !== audioType);
      } else {
        return [...prevSequence, audioType];
      }
    });
    setCurrentAudioIndex(0);
  };

  // 画像のパスを修正する関数
  const getImagePath = (imagePath) => {
    if (imagePath.startsWith('public\\')) {
      return '/' + imagePath.replace('public\\', '').replace('\\', '/');
    }
    return imagePath;
  };

  return (
    <div className="flex flex-col items-center p-5 space-y-4">
      <h1 className="text-3xl font-bold">{currentWord.word_1_en}</h1>
      <h3 className="text-xl">{currentWord.word_1_ja}</h3>
      <p className="text-sm">IPA: {currentWord.word_IPA}</p>

      <img
        src={getImagePath(currentWord.word_image_URL)}
        alt={currentWord.word_1_en}
        className="w-64 h-auto object-contain"
      />

      <audio
        ref={audioRef}
        src={getAudioSource()}
        onEnded={handleAudioEnded}
        className="hidden"
      />

      <div className="flex space-x-2">
        {isPlaying ? (
          <button
            onClick={stopAudio}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={playAudio}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Play
          </button>
        )}
      </div>

      <p className="text-sm">
        現在の音声: {audioSequence[currentAudioIndex] || 'なし'}
      </p>

      <div className="w-full max-w-md space-y-2">
        <label className="block">
          再生速度: {playbackRate.toFixed(1)}x
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={playbackRate}
            onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
            className="w-full"
          />
        </label>

        <label className="block">
          音声間の遅延: {nextWordDelay}秒
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={nextWordDelay}
            onChange={(e) => setNextWordDelay(parseFloat(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="flex space-x-2">
        {['英語（女性）', '英語（男性）', '日本語'].map(audioType => (
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

      <p className="text-sm">現在の再生順序: {audioSequence.join(' → ')}</p>
    </div>
  );
};

export default VocabDisplay;