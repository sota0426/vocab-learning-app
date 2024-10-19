import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // ルーティング用のインポート
import VocabDisplay from './components-learn/VocabDisplay'; 
import Quiz_1 from './components-test/quiz_1'; 

const App = () => {
  return (
    <Router> {/* BrowserRouterで全体をラップ */}
      <div className="App flex justify-center items-center h-screen bg-gray-100">
        <Routes>
          {/* メニュー画面 */}
          <Route
            path="/"
            element={
              <div className="menu text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">メニュー</h1>
                <ul className="menu-list list-none p-0">
                  <li className="mb-4">
                    <button
                      onClick={() => window.location.href = '/learn'}
                      className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
                    >
                      単語覚える
                    </button>
                  </li>
                  <li className="mb-4">
                    <button
                      onClick={() => window.location.href = '/quiz_1'}
                      className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
                    >
                      単語をテストする (Quiz 1)
                    </button>
                  </li>
                  <li className="mb-4">
                      <button
                      onClick={() => window.location.href = '/quiz_2'}
                      className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
                    >
                      単語をテストする (Quiz 2)
                    </button>
                  </li>
                  <li className="mb-4">
                    <button
                      onClick={() => window.location.href = '/register'}
                      className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
                    >
                      単語を登録する
                    </button>
                  </li>
                </ul>
              </div>
            }
          />

          {/* 単語学習ページ */}
          <Route
            path="/learn"
            element={
              <VocabDisplay
                onBackToHome={() => window.location.href = '/'}
                onQuizStart={() => window.location.href = '/quiz_1'}
              />
            }
          />

          {/* Quiz 1のページ */}
          <Route
            path="/quiz_1"
            element={
              <Quiz_1
                onBackToHome={() => window.location.href = '/'}
                onQuizStart={() => window.location.href = '/quiz_1'}
                quizType="enToJa"
              />
            }
          />
          {/* Quiz 2のページ */}
          <Route
            path="/quiz_2"
            element={
              <Quiz_1
                onBackToHome={() => window.location.href = '/'}
                onQuizStart={() => window.location.href = '/quiz_1'}
                quizType="jaToEn"
              />
            }
          />

          {/* 単語登録ページ - コンテンツは後ほど追加 */}
          <Route
            path="/register"
            element={
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-6">単語を登録する画面</h2>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => window.location.href = '/'}
                >
                  戻る
                </button>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
