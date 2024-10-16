// src/components/DisplayWords.tsx

import React from 'react';
import { VocabWord } from '../types';

interface WordDisplayProps {
  word: VocabWord;
  number: 1 | 2 | 3;
  showEnglish: boolean;
  showJapanese: boolean;
  displayOptions: {
    showWordDescription: boolean;
    showWordClass: boolean;
    showWordStructure: boolean;
    showWordAlt: boolean;
    showWordPronunciation: boolean;
  };
}

const DisplayWords: React.FC<WordDisplayProps> = ({
  word,
  number,
  showEnglish,
  showJapanese,
  displayOptions,
}) => {
  // Helper function to render content or placeholder
  const renderOrPlaceholder = (
    condition: boolean,
    content: React.ReactNode,
    className: string = ''
  ) => {
    return condition ? (
      content
    ) : (
      <div className={className} aria-hidden="true"></div>
    );
  };

  // Calculate font scale based on the 'number' prop
  const fontScale = number === 1 ? 1 : number === 2 ? 0.9 : 0.8;

  // Calculate the dynamic font size using the scale
  const dynamicFontSize = `clamp(${2 * fontScale}rem, ${5 * fontScale}vw, ${4 * fontScale}rem)`;

  return (
    <div className="w-full p-4 border rounded-md shadow-sm bg-white">
      <div className="w-full relative text-left text-gray-500 mb-2">
        No.{word.id}
      </div>
      <div className="w-full relative text-center">
        {renderOrPlaceholder(
          showEnglish,
          <p style={{ fontSize: dynamicFontSize }}>
            {word[`word_${number}_en`]}
          </p>,
          'h-12 mb-2'
        )}

        {renderOrPlaceholder(
          displayOptions.showWordPronunciation && showEnglish && number === 1,
          <p className="mb-2" style={{ fontSize: `clamp(1rem, 2.5vw, 1.2rem)` }}>
            {word.word_IPA}
          </p>,
          'h-6 mb-2'
        )}

        {renderOrPlaceholder(
          showJapanese,
          <h2 style={{ fontSize: `clamp(${2 * fontScale}rem, ${2 * fontScale}vw, ${4 * fontScale}rem)` }}>
            {word[`word_${number}_ja`]}
          </h2>,
          'h-12 mb-2'
        )}
        <br />

        <div className="text-left">
          {renderOrPlaceholder(
            displayOptions.showWordClass,
            <p className="pb-2 text-gray-700">
              【単語の分類】 {word.word_class}
            </p>,
          )}

          {renderOrPlaceholder(
            displayOptions.showWordDescription,
            <p className="pb-2 text-gray-700">
              【単語の説明】 {word.word_description}
            </p>,
          )}

          {renderOrPlaceholder(
            displayOptions.showWordStructure,
            <p className="pb-2 text-gray-700">
              【単語の成り立ち】 {word.word_structure_A}, {word.word_structure_B}
            </p>,
          )}

          {renderOrPlaceholder(
            displayOptions.showWordAlt,
            <p className="text-gray-700">
              【類似単語】 {word.word_alt_en} / {word.word_alt_ja}
            </p>,
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayWords;
