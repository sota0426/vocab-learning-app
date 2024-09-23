import React from 'react';

interface WordDisplayProps {
  word: {
    word_1_en: string;
    word_1_ja: string;
    word_IPA: string;
  };
}

const DisplayWords: React.FC<WordDisplayProps> = ({ word }) => {
  return (
    <div className="w-full relative text-center">
      <h1 className="font-bold" style={{ fontSize: 'clamp(10rem, 5vw, 8rem)' }}>
        {word.word_1_en}
      </h1>
      <p className="pt-2" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
        {word.word_IPA}
      </p>
      <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 3rem)' }}>
        {word.word_1_ja}
      </h2>
    </div>
  );
};

export default DisplayWords;