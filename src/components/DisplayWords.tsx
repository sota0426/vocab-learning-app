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
    <div className="w-full flex flex-col items-center justify-center space-y-4 p-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center break-words">
        {word.word_1_en}
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-600 text-center" aria-label="IPA Pronunciation">
        {word.word_IPA}
      </p>
      <br />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-center">
        {word.word_1_ja}
      </h2>
    </div>
  );
};

export default DisplayWords;