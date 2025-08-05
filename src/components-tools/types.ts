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
    ENG_1: string;
    ENG_2: string;
    ENG_3: string;
    JPN_1: string;
    JPN_2: string;
    JPN_3: string;
    // remind_frag?: boolean;
    // quiz_level?: number;
  }
  
  export interface SelectedItem {
    id: string;
    label: string;
    wordType: '①単語' | '②フレーズ' | '③文章';
    speakLanguage: '英語' | '日本語';
    wordNumber: 1 | 2 | 3;
    showJapaneseSentence: boolean; // 日本語文章の表示状態
    showEnglishSentence: boolean;  // 英語文章の表示状態
  }

  export interface QuizDisplayProps {
    onBackToHome: () => void;
    onQuizStart: () => void;
    Type: 'learn' | 'quiz_enToJa' | 'quiz_jaToEn';  // クイズのタイプを指定する引数を追加
    hintOption?: boolean | null;
  }
  