import React, { useState, useEffect,useCallback } from 'react';
import vocabDataRaw from '../data/vocabData.json';
import DisplayImage from '../components-learn/DisplayImage';
import AudioPlayer from '../components-learn/AudioPlayer';
import { VocabWord } from '../components-tools/types';
import { useNavigate } from 'react-router-dom';
import { QuizDisplayProps } from '../components-tools/types';
import { QuizFinished, FeedbackOverlay, AnswerList } from './Quiz_component';

export default function WordQuiz({ onBackToHome, onQuizStart, Type, hintOption }: QuizDisplayProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [choices, setChoices] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [showFeedbackOverlay, setShowFeedbackOverlay] = useState<string | null>(null);
  const [clickedButtonIndex, setClickedButtonIndex] = useState<number | null>(null);
  const [isAnswer, setIsAnswer] = useState<boolean>(false);
  const [isHint, setIsHint] = useState<boolean>(hintOption ? hintOption : false); 
  // 正解・不正解の単語リストを管理するステートを追加
  const [correctAnswers, setCorrectAnswers] = useState<VocabWord[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<VocabWord[]>([]);

  const navigate = useNavigate();

  // const vocabData: VocabWord[] = vocabDataRaw.filter(word => word.remind_frag === true);
  const vocabData: VocabWord[] = vocabDataRaw;
  const currentWordData: VocabWord = vocabData[currentWordIndex];


  const generateChoices = useCallback(() => {
    const sameClassWords = vocabDataRaw.filter(word => word.word_class === currentWordData.word_class);
    let randomChoices: string[] = [];
    while (randomChoices.length < 3) {
      const randomIndex = Math.floor(Math.random() * sameClassWords.length);
      const randomWord = Type === 'quiz_enToJa' ? sameClassWords[randomIndex].word_1_ja : sameClassWords[randomIndex].word_1_en;
      if (randomWord !== (Type === 'quiz_enToJa' ? currentWordData.word_1_ja : currentWordData.word_1_en) && !randomChoices.includes(randomWord)) {
        randomChoices.push(randomWord);
      }
    }
    const correctAnswer = Type === 'quiz_enToJa' ? currentWordData.word_1_ja : currentWordData.word_1_en;
    const allChoices = [...randomChoices, correctAnswer].sort(() => Math.random() - 0.5);
    setChoices(allChoices);
  }, [Type, currentWordData]);

  useEffect(() => {
    generateChoices();
    setFeedback(null);
    setShowFeedbackOverlay(null);
    setClickedButtonIndex(null);
  }, [currentWordIndex, generateChoices]);



  const handleChoiceClick = (choice: string, index: number) => {
    setIsAnswer(true);
    setClickedButtonIndex(index);
    setIsPlaying(false);
  
    const correctAnswer = Type === 'quiz_enToJa' ? currentWordData.word_1_ja : currentWordData.word_1_en;
    
    // 答えが正解か不正解かを確認
    if (choice === correctAnswer) {
      setFeedback("正解！");
      setShowFeedbackOverlay('correct');
      setCorrectAnswers(prev => [...prev, currentWordData]); // 正解リストに追加
    } else {
      setFeedback(correctAnswer);
      setShowFeedbackOverlay('incorrect');
      setIncorrectAnswers(prev => [...prev, currentWordData]); // 不正解リストに追加
    }
  
    // 次の単語への移行処理
    setTimeout(() => {
      setIsHint(hintOption ? true : false);
      setIsPlaying(true);
      setIsAnswer(false);
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
          {Type === 'quiz_jaToEn' || isHint || isAnswer ?
          <DisplayImage imagePath={currentWordData.img_URL} />
         :
          <DisplayImage imagePath="public\BlackImage.webp" />
            }         
       </div>
      </div>
      )}

      <div className="flex flex-col items-center justify-center md:w-4/12">
        {!isQuizFinished && (
          <>
            <p className="text-4xl font-bold mb-4">第{currentWordIndex + 1}問</p>

            <p className="text-6xl font-bold mb-6">
              {Type === 'quiz_enToJa' ? currentWordData.word_1_en : currentWordData.word_1_ja}
            </p>

            <AudioPlayer
              type={Type}
              currentWordData={currentWordData}
              wordNumber={1}
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onStop={() => setIsPlaying(false)}
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


        {/* フィードバック表示 */}      
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




    </div>
  );
}
