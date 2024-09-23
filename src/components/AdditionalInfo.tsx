// src/components/AdditionalInfo.tsx
import React from 'react';

interface AdditionalInfoProps {
  word: any; // 適切なインターフェースに置き換えてください
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ word }) => {
  return (
    <div className="text-left space-y-2">
      {/* JSONデータから追加情報を表示 */}
      {word.example_sentence && (
        <p className="text-sm">例文: {word.example_sentence}</p>
      )}
      {/* 必要に応じてフィールドを追加 */}
    </div>
  );
};

export default AdditionalInfo;
