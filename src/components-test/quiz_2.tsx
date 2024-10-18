//src\components-test\quiz_1.tsx
import React, { useState, useEffect } from 'react';
import vocabDataRaw from '../data/vocabData.json';
import DisplayImage from '../components-learn/DisplayImage';
import AudioPlayer from '../components-learn/AudioPlayer';
import { VocabWord, QuizDisplayProps } from '../types';
import { useNavigate } from 'react-router-dom'; // 追加

export default function Quiz_2({ onBackToHome, onQuizStart }: QuizDisplayProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [choices, setChoices] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [showFeedbackOverlay, setShowFeedbackOverlay] = useState<string | null>(null);

  const navigate = useNavigate(); // 追加

  const vocabData:VocabWord[]=vocabDataRaw.filter(word => word.remind_frag === true);
  const currentWordData: VocabWord = vocabData[currentWordIndex];

  const getAudioSource = (): string => {
    const audioKey = `JPN_1`;
    let audioPath = currentWordData[audioKey as keyof VocabWord] as string;
    if (!audioPath) {
      console.warn(`Audio file not found for key: ${audioKey}`);
      return '';
    }
    audioPath = audioPath.replace(/\\/g, '/');
    if (audioPath.startsWith('public/')) {
      audioPath = audioPath.replace('public/', '/');
    }
    return audioPath;
  };

  const getImagePath = (imagePath: string): string => {
    if (imagePath.startsWith('public\\')) {
      return '/' + imagePath.replace('public\\', '').replace(/\\/g, '/');
    }
    return imagePath;
  };

  const generateChoices = () => {
    const sameClassWords = vocabDataRaw.filter(word => word.word_class === currentWordData.word_class);
    let randomChoices: string[] = [];
    while (randomChoices.length < 3) {
      const randomIndex = Math.floor(Math.random() * sameClassWords.length);
      const randomWord = sameClassWords[randomIndex].word_1_en;
      if (randomWord !== currentWordData.word_1_en && !randomChoices.includes(randomWord)) {
        randomChoices.push(randomWord);
      }
    }
    const allChoices = [...randomChoices, currentWordData.word_1_en].sort(() => Math.random() - 0.5);
    setChoices(allChoices);
  };

  useEffect(() => {
    generateChoices();
    setFeedback(null);
    setShowFeedbackOverlay(null);
  }, [currentWordIndex]);

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleChoiceClick = (choice: string) => {
    if (choice === currentWordData.word_1_en) {
      setFeedback('正解です！');
      setShowFeedbackOverlay('correct');
    } else {
      setFeedback('残念！');
      setShowFeedbackOverlay('incorrect');
    }
    setTimeout(() => {
      handleNextWord();
    }, 1500);
  };

  const handleNextWord = () => {
    if (currentWordIndex < vocabData.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setIsPlaying(true);
    } else {
      setIsQuizFinished(true);
      setShowFeedbackOverlay(null);
    }
  };
  const restartQuiz = () => {
    setIsPlaying(true);
    setIsQuizFinished(false);
    setCurrentWordIndex(0);
  };

  return (
    <div className="relative flex flex-col md:flex-row justify-center items-center h-full space-y-4 md:space-y-0 md:space-x-6 mb-6">
      <button
        onClick={onBackToHome}
        className="absolute top-4 left-4 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-all"
        aria-label="ホームに戻る"
      >
        &#x2715;
      </button>

      <div className="flex-grow w-full md:w-8/12 bg-white shadow-lg rounded-lg p-8 pt-8 transition-all duration-300 ease-in-out hover:shadow-xl">
        <div className="flex justify-center mt-6">
          <DisplayImage imagePath={getImagePath(currentWordData.img_URL)} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center md:w-4/12">
        <p className="text-5xl font-bold mb-6">{currentWordData.word_1_ja}</p>
        <AudioPlayer
          src={getAudioSource()}
          playbackRate={1}
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onStop={() => setIsPlaying(false)}
          onEnded={handleAudioEnded}
        />
        <div className="mt-6 justify-center ">
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoiceClick(choice)}
              className="block w-full text-xl p-4  bg-blue-500 text-white rounded mb-6 hover:bg-blue-600 transition-all"
            >
              {choice}
            </button>
          ))}
        </div>

        {isQuizFinished && (
          <div className="mt-6">
            <p className="text-2xl font-bold text-green-600">これでクイズは終了です！</p>
            <button
              onClick={() => restartQuiz()} // クイズ2へのナビゲート
              className="block w-full text-xl p-4  bg-green-500 text-white rounded mb-6 hover:bg-green-600 transition-all"
            >
              もう一度挑戦する
            </button>

            <button
              onClick={() => navigate('/quiz_1')} // クイズ2へのナビゲート
              className="block w-full text-xl p-4  bg-green-500 text-white rounded mb-6 hover:bg-blue-600 transition-all"
              >
              クイズ1へ進む
            </button>
          </div>
        )}
      </div>

      {showFeedbackOverlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          {showFeedbackOverlay === 'correct' ? (
            <div className="text-red-600" style={{ fontSize: '60rem' }}>&#x25CB;</div>
          ) : null}
          {feedback && <p className="mt-4 text-6xl text-white font-bold">{feedback}</p>}
        </div>
      )}
    </div>
  );
}
