// src/components/AudioPlayer.tsx
import React, { useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string; // 音声ファイルのURLを表す
  playbackRate: number;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  onEnded: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  playbackRate,
  isPlaying,
  onPlay,
  onStop,
  onEnded,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current
        .play()
        .catch((error) => console.error('Audio playback failed:', error));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, playbackRate, src]);

  return (
    <div className="flex space-x-2 items-center">
      <audio
        ref={audioRef}
        src={src} // ここで直接 src を使って再生
        onEnded={onEnded}
        className="hidden"
      />
    </div>
  );
};

export default AudioPlayer;
