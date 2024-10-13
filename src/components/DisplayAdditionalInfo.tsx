// src/components/AdditionalInfo.tsx
import React from 'react';

interface AdditionalInfoProps {
  word: any; // 適切なインターフェースに置き換えてください
  displayOptions: {
    showWordClass: boolean;
    showWordStructure: boolean;
    showWordAlt: boolean;
  };
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ word, displayOptions }) => {
  return (
    <div className="text-center space-y-2 ">
      {/* JSONデータから追加情報を表示 */}
      
      {displayOptions.showWordClass && (
        <p style={{ fontSize: 'clamp(1rem, 0.5vw, 2rem)' }}>（品詞： {word.word_class} ）  <br /> 
</p>
      )}

      {displayOptions.showWordStructure && (
        <>
          <p style={{ fontSize: 'clamp(1rem, 0.5vw, 2rem)' }}>単語の構造： {word.word_structure_A}
             <br />
         {word.word_structure_B}</p>
        </>
      )}

      {displayOptions.showWordAlt && (
        <>
        <br/>
          <p style={{ fontSize: 'clamp(1rem, 0.5vw, 2rem)' }}>　類似単語： {word.word_alt_en} （ {word.word_alt_ja}）</p>
        </>
      )}



    </div>
  );
};

export default AdditionalInfo;
