// src/components/WordDisplay.tsx
import React from 'react';

interface WordDisplayProps {
  word: any; // 適切なインターフェースに置き換えてください
}

const Display_Words: React.FC<WordDisplayProps> = ({ word }) => {
  return (
     <div className="w-1/2 relative">
        <h1 className="text-3xl font-bold">{word.word_1_en}</h1>
        <h3 className="text-xl">{word.word_1_ja}</h3>
        <p className="text-sm">IPA: {word.word_IPA}</p>
      </div>
  );
};

export default Display_Words;
