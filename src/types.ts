// src/types.ts

export interface VocabWord {
    id: string;
    word_1_en: string;
    word_2_en: string;
    word_3_en: string;
    word_1_ja: string;
    word_2_ja: string;
    word_3_ja: string;
    word_IPA: string;
    word_class: string;
    word_structure_A: string;
    word_structure_B: string;
    word_alt_en: string;
    word_alt_ja: string;
    word_description: string;
    img_URL: string;
    // 他の必要なフィールドも追加
    ENG_female_1: string;
    ENG_female_2: string;
    ENG_female_3: string;
    ENG_male_1: string;
    ENG_male_2: string;
    ENG_male_3: string;
    JPN_female_1: string;
    JPN_female_2: string;
    JPN_female_3: string;
    JPN_male_1: string;
    JPN_male_2: string;
    JPN_male_3: string;
  }
  
  export interface SelectedItem {
    id: string;
    label: string;
    wordType: '①単語' | '②フレーズ' | '③文章';
    speakLanguage: '英語' | '日本語';
    gender: '男性' | '女性';
    wordNumber: 1 | 2 | 3;
    showJapaneseSentence: boolean; // 日本語文章の表示状態
    showEnglishSentence: boolean;  // 英語文章の表示状態
  }
  