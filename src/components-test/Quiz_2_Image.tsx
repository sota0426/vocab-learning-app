import React, { useState, useEffect } from 'react';
import vocabDataRaw from '../data/vocabData.json';
import DisplayImage from '../components-learn/DisplayImage';
import { VocabWord } from '../components-tools/types';
import { useNavigate } from 'react-router-dom';
import { QuizDisplayProps } from '../components-tools/types';
import AudioPlayer from '../components-learn/AudioPlayer';
import { QuizFinished, FeedbackOverlay, AnswerList } from './Quiz_component';

export default function ImageQuiz({ onBackToHome, onQuizStart}: QuizDisplayProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [choices, setChoices] = useState<VocabWord[]>([]);
  const [showFeedbackOverlay, setShowFeedbackOverlay] = useState<string | null>(null);
  const [clickedImageIndex, setClickedImageIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [correctImageIndex, setCorrectImageIndex] = useState<number | null>(null); // 正解の画像インデックスを保持
  const [correctAnswers, setCorrectAnswers] = useState<VocabWord[]>([]); // 正解リスト
  const [incorrectAnswers, setIncorrectAnswers] = useState<VocabWord[]>([]); // 不正解リスト
  const [isAnswer, setIsAnswer] = useState<boolean>(false);

  const navigate = useNavigate();

  const vocabData: VocabWord[] = vocabDataRaw.filter(word => word.remind_frag === true);
  const currentWordData: VocabWord = vocabData[currentWordIndex];

  // クイズの選択肢として表示する画像の生成
  const generateImageChoices = () => {
    console.log(currentWordData);
    const randomChoices: VocabWord[] = [];
    while (randomChoices.length < 2) {
      const randomIndex = Math.floor(Math.random() * vocabDataRaw.length);
      const randomWord = vocabDataRaw[randomIndex];
      if (randomWord.img_URL !== currentWordData.img_URL && !randomChoices.includes(randomWord)) {
        randomChoices.push(randomWord);
      }
    }
    randomChoices.push(currentWordData); // 正解の画像を追加
    setChoices(randomChoices.sort(() => Math.random() - 0.5)); // シャッフルして表示
    setCorrectImageIndex(randomChoices.indexOf(currentWordData));
  };

  useEffect(() => {
    generateImageChoices();
    setFeedback(null);
    setShowFeedbackOverlay(null);
    setClickedImageIndex(null);
  }, [currentWordIndex]);

  const handleImageClick = (choice: VocabWord, index: number) => {
    setIsAnswer(true);
    setClickedImageIndex(index);
    setIsPlaying(false);
    const correctAnswer = currentWordData.word_1_ja;
  
    if (index === correctImageIndex) {

      setShowFeedbackOverlay('correct');
      setCorrectAnswers(prev => [...prev, currentWordData]); // 正解リストに追加
    } else {
 
      setShowFeedbackOverlay('incorrect');
      setIncorrectAnswers(prev => [...prev, currentWordData]); // 不正解リストに追加
    }
  
    setTimeout(() => {
      setIsAnswer(false);
      handleNextWord();
      setIsPlaying(true);
    }, 2000);
  };
  

  const handleNextWord = () => {
    if (currentWordIndex < vocabData.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setIsQuizFinished(true);
      setShowFeedbackOverlay(null);
    }
  };

  const restartQuiz = () => {
    setIsQuizFinished(false);
    setCurrentWordIndex(0);
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
  };

  return (
    <div className={`relative flex flex-col justify-center items-center h-full space-y-4 mb-6 ${isQuizFinished ? 'w-full' : 'h-full'}`}>
      <button
        onClick={onBackToHome}
        className="absolute top-4 -left-5 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-all"
        aria-label="ホームに戻る"
      >
        &#x2715;
      </button>

      {!isQuizFinished && (
        <div className="w-full md:w-8/12 bg-white shadow-lg rounded-lg p-8 transition-all duration-300 ease-in-out hover:shadow-xl">
          <p className="text-4xl font-bold mb-4">第{currentWordIndex + 1}問</p>

          {/* 英単語を表示 */}
          <p className="text-6xl font-bold mb-6">{currentWordData.word_3_en}</p>
          {isAnswer &&(
            <p className="text-6xl font-bold mb-6 text-red-500">{currentWordData.word_3_ja}</p>
          )}
          <AudioPlayer
              type="quiz_enToJa"
              currentWordData={currentWordData}
              wordNumber={3}
              playbackRate={1}
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onStop={() => setIsPlaying(false)
              }
            />
          {/* 画像選択肢を横に並べて表示                    

                     */}
          <div className="flex justify-center space-x-4 mt-6">
            {choices.map((choice, index) => (
              <div key={index} className="w-1/3">
              <DisplayImage
                imagePath={choice.img_URL}
                onClick={() => handleImageClick(choice, index)}
                className={`cursor-pointer transition-all duration-300 hover:border-4 hover:border-blue-500 ${
                    clickedImageIndex === index
                    ? 'border-4 border-black'
                    : isAnswer && index === correctImageIndex
                    ? 'border-8 border-red-500' // 正解の画像は赤い枠で囲む
                    : 'border-4 border-transparent'
                }`}
              />
              </div>
            ))}
          </div>
        </div>
      )}

            
          <FeedbackOverlay 
            showFeedbackOverlay={showFeedbackOverlay as 'correct' | 'incorrect' | null} 
            feedback={feedback} 
          />

      {isQuizFinished && (
          <div className="mt-6">
            <p className="text-2xl font-bold text-green-600">これでクイズは終了です！</p>

            {/* 正解・不正解リストの表示 */}
            <AnswerList 
              correctAnswers={correctAnswers} 
              incorrectAnswers={incorrectAnswers} 
            />

            {/* クイズ終了画面 */}
            <QuizFinished 
              isQuizFinished={isQuizFinished} 
              restartQuiz={restartQuiz} 
              navigate={() => navigate('/')}
            />

          </div>
            )}


    </div>
  );
}
