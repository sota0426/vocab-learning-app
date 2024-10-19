import React, { useState, useEffect } from 'react';
import vocabDataRaw from '../data/vocabData.json';
import DisplayImage from '../components-learn/DisplayImage';
import AudioPlayer from '../components-learn/AudioPlayer';
import { VocabWord } from '../components-tools/types';
import { useNavigate } from 'react-router-dom';

interface QuizDisplayProps {
  onBackToHome: () => void;
  onQuizStart: () => void;
  quizType: 'enToJa' | 'jaToEn';  // クイズのタイプを指定する引数を追加
}

export default function Quiz_1({ onBackToHome, onQuizStart, quizType }: QuizDisplayProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [choices, setChoices] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [showFeedbackOverlay, setShowFeedbackOverlay] = useState<string | null>(null);
  const [clickedButtonIndex, setClickedButtonIndex] = useState<number | null>(null);
  
  // 正解・不正解の単語リストを管理するステートを追加
  const [correctAnswers, setCorrectAnswers] = useState<VocabWord[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<VocabWord[]>([]);

  const navigate = useNavigate();

  const vocabData: VocabWord[] = vocabDataRaw.filter(word => word.remind_frag === true);
  const currentWordData: VocabWord = vocabData[currentWordIndex];

  const getAudioSource = (): string => {
    const audioKey = quizType === 'enToJa' ? "ENG_1" : "JPN_1";  // クイズタイプに応じてオーディオを切り替え
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
      const randomWord = quizType === 'enToJa' ? sameClassWords[randomIndex].word_1_ja : sameClassWords[randomIndex].word_1_en;
      if (randomWord !== (quizType === 'enToJa' ? currentWordData.word_1_ja : currentWordData.word_1_en) && !randomChoices.includes(randomWord)) {
        randomChoices.push(randomWord);
      }
    }
    const correctAnswer = quizType === 'enToJa' ? currentWordData.word_1_ja : currentWordData.word_1_en;
    const allChoices = [...randomChoices, correctAnswer].sort(() => Math.random() - 0.5);
    setChoices(allChoices);
  };

  useEffect(() => {
    generateChoices();
    setFeedback(null);
    setShowFeedbackOverlay(null);
    setClickedButtonIndex(null);
  }, [currentWordIndex]);

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleChoiceClick = (choice: string, index: number) => {
    setClickedButtonIndex(index);
    const correctAnswer = quizType === 'enToJa' ? currentWordData.word_1_ja : currentWordData.word_1_en;
    if (choice === correctAnswer) {
      setFeedback('正解です！');
      setShowFeedbackOverlay('correct');
      setCorrectAnswers(prev => [...prev, currentWordData]); // 正解リストに追加
    } else {
      setFeedback(correctAnswer);
      setShowFeedbackOverlay('incorrect');
      setIncorrectAnswers(prev => [...prev, currentWordData]); // 不正解リストに追加
    }
    setTimeout(() => {
      handleNextWord();
    }, 1000);
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
    setCorrectAnswers([]); // 正解リストをリセット
    setIncorrectAnswers([]); // 不正解リストをリセット
  };

  return (
    <div className={`relative flex flex-col md:flex-row justify-center items-center h-full space-y-4 md:space-y-0 md:space-x-6 mb-6 ${
    isQuizFinished ? 'w-full' : 'h-full'}`}>
      <button
        onClick={onBackToHome}
        className="absolute top-4 -left-5 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-all"
        aria-label="ホームに戻る"
      >
        &#x2715;
      </button>
      {!isQuizFinished && (
      <div className="flex-grow w-full md:w-8/12 bg-white shadow-lg rounded-lg p-8 pt-8 transition-all duration-300 ease-in-out hover:shadow-xl">
        <div className="flex justify-center mt-6">
          <DisplayImage imagePath={getImagePath(currentWordData.img_URL)} />
        </div>
      </div>
      )}

      <div className="flex flex-col items-center justify-center md:w-4/12">
        {!isQuizFinished && (
          <>
            <p className="text-4xl font-bold mb-4">第{currentWordIndex + 1}問</p>

            <p className="text-6xl font-bold mb-6">
              {quizType === 'enToJa' ? currentWordData.word_1_en : currentWordData.word_1_ja}
            </p>

            <AudioPlayer
              src={getAudioSource()}
              playbackRate={1}
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onStop={() => setIsPlaying(false)}
              onEnded={handleAudioEnded}
            />
            <div className="mt-6 justify-center">
              {choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoiceClick(choice, index)}
                  className={`block w-full text-xl p-4 text-left ${
                    clickedButtonIndex === index ? 'bg-red-500' : 'bg-blue-500'
                  } text-white rounded mb-6 hover:bg-blue-600 transition-all`}
                >
                  {index + 1}．{choice}
                </button>
              ))}
            </div>
          </>
        )}

        {isQuizFinished && (
          <div className="mt-6">
            <p className="text-2xl font-bold text-green-600">これでクイズは終了です！</p>

            {/* 正解・不正解リストの表示 */}
            <div className="w-full mt-6">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="w-1/2 text-xl font-bold p-4 border-b">正解した単語（{correctAnswers.length}個）</th>
                    <th className="w-1/2 text-xl font-bold p-4 border-b">不正解の単語（{incorrectAnswers.length}個）</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.max(correctAnswers.length, incorrectAnswers.length) }).map((_, index) => (
                    <tr key={index}>
                      <td className="text-lg p-4 border-b">
                        {correctAnswers[index] ? `${correctAnswers[index].word_1_en} - ${correctAnswers[index].word_1_ja}` : ''}
                      </td>
                      <td className="text-lg p-4 border-b">
                        {incorrectAnswers[index] ? `${incorrectAnswers[index].word_1_en} - ${incorrectAnswers[index].word_1_ja}` : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>



            <button
              onClick={() => restartQuiz()}
              className="block w-full text-xl p-4 bg-green-500 text-white rounded mb-6 hover:bg-green-600 transition-all"
            >
              もう一度挑戦する
            </button>

            <button
              onClick={() => navigate('/quiz_2')}
              className="block w-full text-xl p-4 bg-green-500 text-white rounded mb-6 hover:bg-green-600 transition-all"
            >
              クイズ2へ進む
            </button>
          </div>
        )}
      </div>

      {showFeedbackOverlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          {showFeedbackOverlay === 'correct' ? (
            <div className="text-red-600" style={{ fontSize: '40rem' }}>&#x25CB;</div>
          ) : (
            <div className="text-red-600" style={{ fontSize: '5rem' }}>&#x274C;</div>
          )}
          {feedback && <p className="mt-4 text-6xl text-white font-bold">{feedback}</p>}
        </div>
      )}
    </div>
  );
}
