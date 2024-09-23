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
    <div className="text-left space-y-2 ">
      {/* JSONデータから追加情報を表示 */}
      
      {displayOptions.showWordClass && (
        <p className="text-sm">品詞: {word.word_class}   <br /> 
</p>
      )}

      {displayOptions.showWordStructure && (
        <>
          <p className="text-sm">単語の構造: {word.word_structure_1}　⇒　 {word.word_structure_2}</p>
        </>
      )}

      {displayOptions.showWordAlt && (
        <>
          <p className="text-sm">類似単語: {word.word_alt_en} : {word.word_alt_ja}</p>
        </>
      )}



    </div>
  );
};

export default AdditionalInfo;
