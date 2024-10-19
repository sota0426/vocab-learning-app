// src/hooks/useVocabUpdater.ts

import { useState, useEffect } from 'react';
import vocabDataRaw from '../data/vocabData.json';
import { VocabWord } from '../components-tools/types';

export const useVocabUpdater = () => {
  const [vocabData, setVocabData] = useState<VocabWord[]>(
    vocabDataRaw.filter((word) => word.remind_frag === false)
  );

  const [preLearnedWordCount, setPreLearnedWordCount] = useState<number>(
    vocabDataRaw.filter((word) => word.remind_frag === true).length
  );

  useEffect(() => {
    // vocabDataの変更をlocalStorageなどに保存したい場合の処理
    // 例: localStorage.setItem('vocabData', JSON.stringify(vocabData));
  }, [vocabData]);

  const markWordAsLearned = (id: string, updatedData:any , name?: any) => {
    const updatedVocabData = vocabData.map((word) => {
      if (word.id === id && `word.${name}` === name) {
        return { ...word, ...updatedData };
      }
      return word;
    });

    setVocabData(updatedVocabData.filter((word) => word.remind_frag === false));
    setPreLearnedWordCount((prevCount) => prevCount + 1);
  };

  return {
    vocabData,
    preLearnedWordCount,
    markWordAsLearned,
  };
};
