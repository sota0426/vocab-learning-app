// src/components/VocabDisplay.tsx

import React, { useState, useEffect } from 'react';
import DisplayWords from './DisplayWords';
import DisplayImage from './DisplayImage';
import AudioPlayer from './AudioPlayer';
import NavigationControls from './AudioNavigationControls';
import SettingsModal from './DisplaySettingsModal';
import { Settings } from 'lucide-react';
import { VocabWord, SelectedItem } from '../components-tools/types';
import { useVocabUpdater } from '../components-tools/useVocabUpdater';
import { QuizDisplayProps } from '../components-tools/types';




export default function VocabDisplay({ onBackToHome, onQuizStart, Type }: QuizDisplayProps) {
  const { vocabData, markWordAsLearned } = useVocabUpdater();
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0); // 現在の単語のインデックス
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number>(0); // 現在の音声のインデックス
  const [isPlaying, setIsPlaying] = useState<boolean>(true); // 音声再生の状態
  const [playbackRate, setPlaybackRate] = useState<number>(1); // 再生速度
  const [nextWordDelay, setNextWordDelay] = useState<number>(1); // 次の単語までの遅延時間
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 設定モーダル

  // 選択された項目の初期状態
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(()=>{
    const savedItems = localStorage.getItem('ENG_learning_selectedItems');
    return savedItems ? JSON.parse(savedItems) : [
  {
    id: '1',
    label: '英語_女性_1',
    wordType: '①単語', // 型 '①単語' に合わせて修正
    speakLanguage: '英語',
    wordNumber: 1,
    showJapaneseSentence: false,
    showEnglishSentence: true,
  },
  {
    id: '2',
    label: '日本語_男性_1',
    wordType: '①単語', // 型 '①単語' に合わせて修正
    speakLanguage: '日本語',
    wordNumber: 1,
    showJapaneseSentence: true,
    showEnglishSentence: true,
  },
  {
    id: '3',
    label: '英語_女性_2',
    wordType: '②フレーズ', // 型 '②フレーズ' に合わせて修正
    speakLanguage: '英語',
    wordNumber: 2,
    showJapaneseSentence: false,
    showEnglishSentence: true,
  },
  {
    id: '4',
    label: '日本語_男性_2',
    wordType: '②フレーズ', // 型 '②フレーズ' に合わせて修正
    speakLanguage: '日本語',
    wordNumber: 2,
    showJapaneseSentence: true,
    showEnglishSentence: true,
  },
  {
    id: '5',
    label: '英語_女性_3',
    wordType: '③文章', // 型 '③文章' に合わせて修正
    speakLanguage: '英語',
    wordNumber: 3,
    showJapaneseSentence: false,
    showEnglishSentence: true,
  },
  {
    id: '6',
    label: '日本語_男性_3',
    wordType: '③文章', // 型 '③文章' に合わせて修正
    speakLanguage: '日本語',
    wordNumber: 3,
    showJapaneseSentence: true,
    showEnglishSentence: true,
  },
    ];
  });

  const [displayOptions, setDisplayOptions] = useState(()=>{
    const savedOptions = localStorage.getItem('ENG_learning_displayOptions');
    return savedOptions ? JSON.parse(savedOptions) : {
      showWordPronunciation: true,
      showWordDescription: true,
      showWordClass: true,
      showWordStructure: true,
      showWordAlt: true,
    };
  });
  

  const currentWordData: VocabWord = vocabData[currentWordIndex];

  useEffect(() => {
    localStorage.setItem('ENG_learning_selectedItems', JSON.stringify(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    localStorage.setItem('ENG_learning_displayOptions', JSON.stringify(displayOptions));
  }, [displayOptions]);




  // 次の単語に進む関数
  const nextWord = () => {
    setCurrentAudioIndex(0);
    setCurrentWordIndex((prevIndex) =>
      prevIndex < vocabData.length - 1 ? prevIndex + 1 : 0
    );

  };

  // 前の単語に戻る関数
  const prevWord = () => {
    setCurrentAudioIndex(0);
    setCurrentWordIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );

  };

  // オーディオ再生が終了したときのハンドラ

  const handleAudioEnded = () => {
    // 再生状態が true の場合のみ次の音声を再生する
    if (isPlaying) {
      setTimeout(() => {
        if (currentAudioIndex < selectedItems.length - 1) {
          setCurrentAudioIndex((prevIndex) => prevIndex + 1);
          setIsPlaying(true);
        } else {
          setCurrentAudioIndex(0);
          nextWord(); // 自動的に次の単語に進む
          setIsPlaying(true); // 次の単語を再生
        }
      }, nextWordDelay * 1000);
    }
  };




  // デバッグ用: selectedItems と currentAudioIndex をログ出力
  useEffect(() => {
    console.log('Selected Items:', selectedItems);
    console.log('Current Audio Index:', currentAudioIndex);
  }, [selectedItems, currentAudioIndex]);

  // 現在の単語番号
  const currentWordNumber = selectedItems[currentAudioIndex]?.wordNumber || 1;


  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-sans p-6">
      {/* ホームに戻るボタン */}
      <button
        onClick={onBackToHome}
        className="absolute top-4 left-4 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-all"
        aria-label="ホームに戻る"
      >
        &#x2715; {/* ×ボタンのマーク */}
      </button>

      {/* メインコンテンツのコンテナ */}
      <div className="flex flex-col md:flex-row justify-center items-center h-full space-y-4 md:space-y-0 md:space-x-6 mb-6">
        
        {/* 単語の表示 */}
        <div className="flex-grow w-full md:w-8/12 bg-white shadow-lg rounded-lg p-8 pt-8 transition-all duration-300 ease-in-out hover:shadow-xl">
          <div className="flex flex-col items-center justify-center">
            {/* DisplayWords コンポーネントに currentWord と wordNumber を渡す */}
            <DisplayWords 
              word={currentWordData} 
              number={currentWordNumber} 
              showEnglish={selectedItems[currentAudioIndex].showEnglishSentence}
              showJapanese={selectedItems[currentAudioIndex].showJapaneseSentence}
              displayOptions={displayOptions}
            />
          </div>
        <div className="flex items-center justify-center mt-4">
          1
          <input
            type="range"
            id="wordNumberScroll"
            min="0"
            max={vocabData.length-1}
            value={currentWordIndex}
            onChange={(e) => {
              setCurrentWordIndex(parseInt(e.target.value));
              setCurrentAudioIndex(0);
            }}
            className="w-10/12"
          />
          {vocabData.length}
        </div>
           {/* 覚えたボタンの追加
           <div className="flex items-center justify-center mt-4">
           <button
            onClick={handleMarkAsLearned}
            className="px-4 py-2 mr-6 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300"
          >
            覚えたリストに追加
          </button>
  
            <button
              onClick={onQuizStart}
              className="px-4 py-2 mr-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
            >
              クイズに挑戦
            </button>
          </div> */}
        </div>

        {/* 画像の表示 */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 transition-all duration-300 ease-in-out hover:shadow-xl flex items-center justify-center">
          <DisplayImage imagePath={currentWordData.img_URL} />
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6"> {/* flex-row で横並びにする */}
        <AudioPlayer
          key={currentAudioIndex} 
          type="learn"
          selectedItems={selectedItems}
          currentWordData={currentWordData}
          wordNumber={currentWordNumber}
          playbackRate={playbackRate}
          isPlaying={isPlaying}
          currentAudioIndex={currentAudioIndex}
          onPlay={() => setIsPlaying(true)}
          onStop={() => {
            setCurrentAudioIndex(0);
            setIsPlaying(false)}}
          onEnded={handleAudioEnded}
        />

        <NavigationControls
          onPrev={prevWord}
          onNext={nextWord}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying((prev) => !prev)}
        />

        {/* 設定ボタン */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center space-x-1"
        >
          <Settings className="w-5 h-5" />
          <span>設定</span>
        </button>
        </div>

        <p className="text-sm pt-2 text-gray-500">
          現在の再生順序: {selectedItems.map(item => item.label).join(' → ') || 'なし'}
        </p>
 

        {/* 設定モーダル */}

        {isModalOpen && (
          <SettingsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            playbackRate={playbackRate}
            setPlaybackRate={setPlaybackRate}
            nextWordDelay={nextWordDelay}
            setNextWordDelay={setNextWordDelay}
            displayOptions={displayOptions}
            setDisplayOptions={setDisplayOptions}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        )}

      </div>
  );
}
