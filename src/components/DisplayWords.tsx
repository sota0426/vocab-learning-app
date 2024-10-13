// src/components/WordDisplay.tsx
import React from 'react';

interface WordDisplayProps {
  word: any; // 適切なインターフェースに置き換えてください
  number:number;
}

const DisplayWords: React.FC<WordDisplayProps> = ({ word ,number}) => {
  return (
    <div className="w-full relative text-center">
      <p style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
        {word[`word_${number}_en`]}
      </p>
      <p className="pt-2" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
        {word.word_IPA}
      </p>
      <h2 style={{ fontSize: 'clamp(1.2rem, 2vw, 3rem)' }}>
      {word[`word_${number}_ja`]}
      </h2>
      <br />
    </div>
  );
};

export default DisplayWords;
