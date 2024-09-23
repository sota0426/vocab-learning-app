// components/PlaybackSettings.tsx
import React from 'react';

interface PlaybackSettingsProps {
  playbackRate: number;
  setPlaybackRate: (value: number) => void;
  nextWordDelay: number;
  setNextWordDelay: (value: number) => void;
}

const PlaybackSettings: React.FC<PlaybackSettingsProps> = ({
  playbackRate,
  setPlaybackRate,
  nextWordDelay,
  setNextWordDelay,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block">
          再生速度: {playbackRate.toFixed(1)}x
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={playbackRate}
            onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
            className="w-full"
          />
        </label>
      </div>
      <div>
        <label className="block">
          音声間の遅延: {nextWordDelay}秒
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={nextWordDelay}
            onChange={(e) => setNextWordDelay(parseFloat(e.target.value))}
            className="w-full"
          />
        </label>
      </div>
    </div>
  );
};

export default PlaybackSettings;
