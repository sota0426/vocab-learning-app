import React, { useState, useEffect } from 'react';
import vocabDataRaw from '../data/vocabData.json';
import DisplayImage from '../components-learn/DisplayImage';
import { VocabWord } from '../components-tools/types';
import { QuizDisplayProps } from '../components-tools/types';
import AudioPlayer from '../components-learn/AudioPlayer';
import { QuizFinished } from './Quiz_component';
import { useNavigate } from 'react-router-dom';

export default function QuizTyping({ onBackToHome, onQuizStart }: QuizDisplayProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [typedAnswer, setTypedAnswer] = useState<string>(''); // ユーザーが入力した文字列
  const [feedback, setFeedback] = useState<string | null>(null); // フィードバック表示
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null); // 正解・不正解の判定
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false); // クイズ終了判定
  const [hintLevel, setHintLevel] = useState<number>(2); // ヒントレベル
  const [isIPAHint, setIsIPAHint] = useState<boolean>(true); // IPAヒント表示判定
  const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false); // 答えを表示するかどうかの状態
  const [isPlaying, setIsPlaying] = useState<boolean>(true); // 音声再生判定

  const vocabData: VocabWord[] = vocabDataRaw.filter(word => word.remind_frag === true);
  const currentWordData: VocabWord = vocabData[currentWordIndex];

  const navigate = useNavigate();

  // 正解判定用の関数
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTypedAnswer(input);

    // タイピングが正しいかチェック（大文字小文字を無視）
    if (input.toLowerCase() === currentWordData.word_1_en.toLowerCase()) {
      setIsPlaying(false);
      setIsAnswerCorrect(true);
      setFeedback('Correct!');
      setTimeout(() => {
        handleNextWord();
      }, 1000); // 1秒待機して次の単語へ進む
    } else if (!currentWordData.word_1_en.toLowerCase().startsWith(input.toLowerCase())) {
      setIsAnswerCorrect(false);
      setFeedback('Incorrect!');
    } else {
        setIsAnswerCorrect(null); 
      setIsAnswerCorrect(null); // 入力途中
      setFeedback(null);
    }
  };

  // 次の単語に進む処理
  const handleNextWord = () => {
    if (currentWordIndex < vocabData.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setTypedAnswer('');
      setIsAnswerCorrect(null);
      setFeedback(null);
      setIsPlaying(true)
      setIsAnswerVisible(false); // 答えを非表示にリセット
      ;
    } else {
        setIsAnswerCorrect(false);
      setIsQuizFinished(true);
    }
  };

  // クイズのリスタート
  const restartQuiz = () => {
    setCurrentWordIndex(0);
    setTypedAnswer('');
    setIsQuizFinished(false);
    setFeedback(null);
    setIsAnswerCorrect(null);
    setIsPlaying(true);
  };

// ヒントとして表示する文字列を生成
const generateHint = (word: string, hintLevel: number) => {
    const visiblePart = word.slice(0, hintLevel); // ヒントレベルまでの文字を表示
    const hiddenPart = '*'.repeat(word.length - hintLevel); // 残りの部分は * で隠す
    return visiblePart + hiddenPart;
};



// ヒントボタンを押した時の処理
const handleHint = () => {
    if (hintLevel < 3) {
      setHintLevel(prev => prev + 1); // ヒントレベルを1文字増やす
    }else if(hintLevel < currentWordData.word_1_en.length){
        setHintLevel(currentWordData.word_1_en.length);
    }else{
        setHintLevel(0);
    }

  };

  return (
    <div className="relative flex flex-col justify-center items-center h-full space-y-4 mb-6">
      <button
        onClick={onBackToHome}
        className="absolute top-4 -left-5 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-all"
        aria-label="ホームに戻る"
      >
        &#x2715;
      </button>

      {/* メインコンテンツのコンテナ */}
      <div className="flex flex-col md:flex-row justify-center items-center h-full space-y-4 md:space-y-0 md:space-x-6 mb-6">

      {!isQuizFinished && (
      <>
        {/* 左側：画像の表示 */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 pt-8 transition-all duration-300 ease-in-out hover:shadow-xl">
          <div className="flex flex-col items-center justify-center">
            <DisplayImage imagePath={currentWordData.img_URL} className="mb-6" />
          </div>
        </div>

       {/* 右側：単語とタイピング */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 pt-8 transition-all duration-300 ease-in-out hover:shadow-xl">
        <p className="text-4xl font-bold mb-4">第{currentWordIndex + 1}問</p>
          <div className="flex flex-col items-center justify-center">
            {/* 英単語とタイピングボックス */}

            <p className="text-6xl font-bold m-6 ">{currentWordData.word_1_ja}</p>
            {!isAnswerVisible ?
            (
            <p className="text-6xl font-bold m-6 ">{generateHint(currentWordData.word_1_en, hintLevel)}</p>
            ):(
            <p className="text-6xl font-bold m-6 ">{currentWordData.word_1_en}</p>               
            )}

            {isIPAHint && ( 
                <p className="text-4xl  mb-6">{currentWordData.word_IPA}</p>
            )}

    {/* タイピング入力 */}
    <input
              type="text"
              value={typedAnswer}
              onChange={handleTyping}
              className={`w-full text-4xl p-4 text-center border-4 ${
                isAnswerCorrect === true
                  ? 'border-green-500 text-green-500 border-8'
                  : isAnswerCorrect === false
                  ? 'border-red-500 text-red-500 border-8'
                  : 'border-gray-300'
              }`}
              placeholder={generateHint(currentWordData.word_1_en, 0)} // ヒントを表示
            />

<div className="flex flex-row space-x-4">
<button 
  className="text-xl mt-4 bg-blue-300 rounded-md p-2 hover:bg-blue-400 transition-all" 
  onClick={() => setIsIPAHint(!isIPAHint)}
>
  {isIPAHint ? '発音を隠す' : '発音を見る'}
</button>

<button 
  className="text-xl mt-4 bg-blue-300 rounded-md p-2 hover:bg-blue-400 transition-all" 
  onClick={handleHint}
>
  {hintLevel === currentWordData.word_1_en.length ? 'ヒントを隠す' : 'ヒントを増やす'}
</button>
<button 
  className="text-xl mt-4 bg-red-300 rounded-md p-2 hover:bg-red-400 transition-all" 
  onClick={()=>setIsAnswerVisible(!isAnswerVisible)}
>
  {isAnswerVisible ? "答えを隠す":"答えを見る"}
</button>
</div>

 
            <AudioPlayer
              type="quiz_enToJa"
              currentWordData={currentWordData}
              wordNumber={1}
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onStop={() => setIsPlaying(false)}
            />
          </div>
        </div>
      </>
      )}
      
    {/* フィードバック表示 */}
    {isAnswerCorrect && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 bg-black">
            <div className="text-green-600" style={{ fontSize: '30rem' }}>&#x25CB;</div>
        </div>
      )}
        
        {/* クイズ終了メッセージ */}
        <div className="mt-6">
        {isQuizFinished && (
        <p className="text-2xl font-bold text-green-600">これでクイズは終了です！</p>
        )}

        {/* クイズ終了画面 */}
        <QuizFinished 
          isQuizFinished={isQuizFinished} 
          restartQuiz={restartQuiz} 
          navigate={() => navigate('/')}

        />
        </div>

      </div>
    </div>
  );
}
