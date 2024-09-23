// src/components/AudioPlayer.tsx
import React, { useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
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

  const handleEnded=()=>{
    onEnded();
  }

  return (
    <div className="flex space-x-2 items-center">
      <audio ref={audioRef} src={src} onEnded={handleEnded} className="hidden" />
    </div>
  );
};

export default AudioPlayer;
