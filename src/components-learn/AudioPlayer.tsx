import React, { useRef, useEffect } from 'react';
import { VocabWord, SelectedItem } from '../components-tools/types'; // VocabWord の型をインポート

interface AudioPlayerProps {
  isPlaying: boolean;
  wordNumber: number;
  onPlay: () => void;
  onStop: () => void;
  onEnded?: () => void;
  type: 'learn' | 'quiz_enToJa' | 'quiz_jaToEn'; // 学習用かテスト用かを判定
  currentWordData: VocabWord; // 現在の単語データ
  playbackRate?: number;
  selectedItems?: SelectedItem[]; // 学習時に選択されたアイテム（optional）
  currentAudioIndex?: number; // 学習時の現在のオーディオインデックス（optional）
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  playbackRate,  isPlaying, wordNumber,
  onPlay,
  onStop,onEnded,type,
  currentWordData,
  selectedItems = [],
  currentAudioIndex = 0,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  // オーディオソースを取得する関数
  const getAudioSource = (): string => {
    if (type === 'learn') {
      if (currentAudioIndex >= selectedItems.length) {
        return '';
      }
      const item = selectedItems[currentAudioIndex];
      const audioKey = `${item.speakLanguage === '英語' ? 'ENG' : 'JPN'}_${wordNumber}`;
      let audioPath = currentWordData[audioKey as keyof VocabWord] as string;
      if (!audioPath) {
        console.warn(`Audio file not found for key: ${audioKey}`);
        return '';
      }
      return formatAudioPath(audioPath);
    } 
    
      if (type === 'quiz_enToJa' || type === 'quiz_jaToEn') {
      const audioKey = type === 'quiz_enToJa' ? `ENG_${wordNumber}` : `JPN_${wordNumber}`;
      let audioPath = currentWordData[audioKey as keyof VocabWord] as string;
      if (!audioPath) {
        console.warn(`Audio file not found for key: ${audioKey}`);
        return '';
      }
      return formatAudioPath(audioPath);
    }

    return '';
  };


  // パスのフォーマット処理
  const formatAudioPath = (audioPath: string): string => {
    audioPath = audioPath.replace(/\\/g, '/');
    if (audioPath.startsWith('public/')) {
      audioPath = audioPath.replace('public/', '/');
    }
    console.log('Adjusted Audio Path:', audioPath);
    return audioPath;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate ? playbackRate : 1;

      if (isPlaying) {
        audioRef.current.play()
          .then(() => onPlay())
          .catch((error) => console.error('Audio playback failed:', error));
      } else {
        audioRef.current.pause();
        onStop();
      }
    }
  }, [isPlaying, playbackRate]);

  const src = getAudioSource();

  return (
    <div className="flex space-x-2 items-center">
      <audio
        ref={audioRef}
        src={src} // 取得したオーディオソースを使用
        onEnded={onEnded}
        className="hidden"
      />
    </div>
  );
};

export default AudioPlayer;
