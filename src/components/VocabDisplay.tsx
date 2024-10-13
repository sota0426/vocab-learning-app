import React, { useState, useEffect } from 'react';
import vocabData from '../data/vocabData.json';
import DisplayWords from './DisplayWords';
import DisplayImage from './DisplayImage';
import AdditionalInfo from './DisplayAdditionalInfo';
import AudioPlayer from './AudioPlayer';
import NavigationControls from './AudioNavigationControls';
import SettingsModal from './DisplaySettingsModal';
import { Settings } from 'lucide-react';
import AudioSettingsModal from './AudioSettingsModal';

// VocabWordの型定義を明確にする
interface VocabWord {
  id: string;
  word_1_en: string;
  word_2_en: string;
  word_3_en: string;
  word_1_ja: string;
  word_2_ja: string;
  word_3_ja: string;
  word_class: string;
  word_structure_A: string;
  word_structure_B: string;
  word_alt_en: string;
  word_alt_ja: string;
  word_IPA: string;
  img_URL: string;
  word_description: string;
  ENG_female_1: string;
  ENG_female_2: string;
  ENG_female_3: string;
  ENG_male_1: string;
  ENG_male_2: string;
  ENG_male_3: string;
  JPN_female_1: string;
  JPN_female_2: string;
  JPN_female_3: string;
  JPN_male_1: string;
  JPN_male_2: string;
  JPN_male_3: string;
}

interface SelectedItem {
  id: string;
  label: string;
  language: '英語' | '日本語';
  gender: '男性' | '女性';
  wordNumber: 1 | 2 | 3;
}


export default function VocabDisplay() {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [nextWordDelay, setNextWordDelay] = useState<number>(1);
  const [audioSequence, setAudioSequence] = useState<string[]>([
    '英語（女性）',
    '英語（男性）',
    '日本語（女性）',
    '日本語（男性）',
  ]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState<boolean>(true);
  const [wordNumber , SetWordNumber] = useState(1);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState<boolean>(false);
  const currentWord = vocabData[currentWordIndex];
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  // オーディオ再生順序の取得
  const getAudioSequence = () => {
    return selectedItems.map((item) => item.id);
  };
  // 現在のオーディオソースを取得
  const getAudioSource = (): string => {
    if (currentAudioIndex >= selectedItems.length) {
      return '';
    }
    const item = selectedItems[currentAudioIndex];
    const audioKey = `${item.language === '英語' ? 'ENG' : 'JPN'}_${
      item.gender === '女性' ? 'female' : 'male'
    }_${item.wordNumber}`;
    return currentWord[audioKey as keyof VocabWord];
  };

  // 表示する単語を取得
  const getDisplayWord = (): string => {
    if (currentAudioIndex >= selectedItems.length) {
      return '';
    }
    const item = selectedItems[currentAudioIndex];
    const wordKey = `word_${item.wordNumber}_${item.language === '英語' ? 'en' : 'ja'}`;
    return currentWord[wordKey as keyof VocabWord];
  };
  
  


    // displayOptions を追加
    const [displayOptions, setDisplayOptions] = useState({
      showWordClass: true,
      showWordStructure: true,
      showWordAlt: true,
    });

    
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
        setCurrentAudioIndex(0);
        nextWord(); // 自動的に次の単語に進む
        setIsPlaying(true); // 次の単語を再生
      }
    }, nextWordDelay * 1000);
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
    if (isPlaying) {
      // 音声再生を開始
    }
  }, [currentWordIndex, currentAudioIndex, audioSequence, isPlaying]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-sans p-6">
      {/* メインコンテンツのコンテナ */}
      <div className="flex flex-col md:flex-row justify-center items-center h-full space-y-4 md:space-y-0 md:space-x-6 mb-6">
        
      {/* 単語の表示 */}
      <div className="flex-grow w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 pt-8 transition-all duration-300 ease-in-out hover:shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <DisplayWords word={currentWord} number={wordNumber}/>
          
          {/* 追加情報の表示 */}
          {showAdditionalInfo && (
          <div className="flex-grow w-full md:w-1/2 rounded-lg transition-all duration-300 ease-in-ou">
              <AdditionalInfo word={currentWord} displayOptions={displayOptions} />
            </div>
          )}
        </div>
      </div>

        {/* 画像の表示 */}
        <div className="flex-grow w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 transition-all duration-300 ease-in-out hover:shadow-xl flex items-center justify-center">
          <DisplayImage imagePath={getImagePath(currentWord.img_URL)} />
        </div>
      </div>



      <div className="flex flex-col items-center space-y-6">
      {/* ナビゲーションとオーディオプレーヤー */}
      {/* 音声プレーヤーの部分 */}

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

          <p className="text-sm text-gray-500">
            現在の再生順序: {audioSequence.join(' → ') || 'なし'}
          </p>

          {/* ボタンのグループ */}
          <div className="flex space-x-4">
            {/* 設定ボタン */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center space-x-1"
            >
              <Settings className="w-5 h-5" />
              <span>設定</span>
            </button>

            {/* 音声設定ボタン */}
            <button
              onClick={() => setIsAudioSettingsOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center space-x-1"
            >
              <Settings className="w-5 h-5" />
              <span>音声設定</span>
            </button>
          </div>


        {/* 設定モーダル */}
    {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">設定</h2>
            <SettingsModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              playbackRate={playbackRate}
              setPlaybackRate={setPlaybackRate}
              nextWordDelay={nextWordDelay}
              setNextWordDelay={setNextWordDelay}

              showAdditionalInfo={showAdditionalInfo}
              setShowAdditionalInfo={setShowAdditionalInfo}
              displayOptions={displayOptions}           // 追加
              setDisplayOptions={setDisplayOptions}     // 追加    
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out"
            >
              閉じる
            </button>
          </div>
        </div>
        )}

        {/* 音声設定モーダル */}
        {isAudioSettingsOpen && (
          <AudioSettingsModal
            isOpen={isAudioSettingsOpen}
            onClose={() => setIsAudioSettingsOpen(false)}
            // 必要なプロップスを渡す
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        )}

      </div>

    </div>
  );
}
