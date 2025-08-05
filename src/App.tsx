import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import VocabDisplay from './components-learn/VocabDisplay'; 
import WordQuiz from './components-test/Quiz_1_Word'; 
import ImageQuiz from './components-test/Quiz_2_Image';
import QuizTyping from './components-test/Quiz_3_Typing';

// メニューコンポーネントを分離（useNavigateを使用するため）
const MenuPage = () => {
  const navigate = useNavigate();

  return (
    <div className="menu text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">メニュー</h1>
      <ul className="menu-list list-none p-0">
        <li className="mb-4">
          <button
            onClick={() => navigate('/learn')}
            className="w-full px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
          >
            単語覚える
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => navigate('/quiz_1')}
            className="w-full px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
          >
            単語テスト（レベル１）英⇒日 画像あり
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => navigate('/quiz_2')}
            className="w-full px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
          >
            単語テスト（レベル２）日⇒英 画像あり
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => navigate('/quiz_3')}
            className="w-full px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
          >
            単語テスト（レベル３）英⇒日 画像なし
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => navigate('/quiz_4')}
            className="w-full px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
          >
            単語テスト（レベル４）英文章⇒画像選択
          </button>
        </li>                  
        <li className="mb-4">
          <button
            onClick={() => navigate('/quiz_5')}
            className="w-full px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
          >
            単語テスト（レベル５）タイピング
          </button>
        </li>                  
        <li className="mb-4">
          <button
            onClick={() => navigate('/register')}
            className="w-full px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
          >
            単語を登録する
          </button>
        </li>
      </ul>
    </div>
  );
};

// 単語登録ページコンポーネント
const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-6">単語を登録する画面</h2>
      <button
        className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={() => navigate('/')}
      >
        戻る
      </button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App flex justify-center items-center h-screen bg-gray-100">
        <Routes>
          {/* メニュー画面 */}
          <Route path="/" element={<MenuPage />} />

          {/* 単語学習ページ */}
          <Route
            path="/learn"
            element={
              <VocabDisplay
                onBackToHome={() => window.location.href = '/'}
                onQuizStart={() => window.location.href = '/quiz_1'}
                Type="learn"
              />
            }
          />

          {/* Quiz 1のページ */}
          <Route
            path="/quiz_1"
            element={
              <WordQuiz
                onBackToHome={() => window.location.href = '/'}
                onQuizStart={() => window.location.href = '/WordQuiz'}
                Type="quiz_enToJa"
                hintOption={true}
              />
            }
          />

          {/* Quiz 2のページ */}
          <Route
            path="/quiz_2"
            element={
              <WordQuiz
                onBackToHome={() => window.location.href = '/'}
                onQuizStart={() => window.location.href = '/WordQuiz'}
                Type="quiz_jaToEn"
                hintOption={true}
              />
            }
          />

          {/* Quiz 3のページ */}
          <Route
            path="/quiz_3"
            element={
              <WordQuiz
                onBackToHome={() => window.location.href = '/'}
                onQuizStart={() => window.location.href = '/WordQuiz'}
                Type="quiz_enToJa"
                hintOption={false}
              />
            }
          />

          {/* Quiz 4のページ */}
          <Route
            path="/quiz_4"
            element={
              <ImageQuiz
                onBackToHome={() => window.location.href = '/'}
                onQuizStart={() => window.location.href = '/ImageQuiz'}
                Type="quiz_enToJa"
              />
            }
          />

          {/* Quiz 5のページ */}
          <Route
            path="/quiz_5"
            element={
              <QuizTyping
                onBackToHome={() => window.location.href = '/'}
                onQuizStart={() => window.location.href = '/QuizTyping'}
                Type="quiz_enToJa"
              />
            }
          />

          {/* 単語登録ページ */}
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;