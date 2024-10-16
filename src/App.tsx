import React, { useState } from 'react';
import VocabDisplay from './components-learn/VocabDisplay'; // ".tsx"は省略可

const App = () => {
  const [activePage, setActivePage] = useState<string>('menu'); // メニュー画面を初期画面に設定

  return (
    <div className="App flex justify-center items-center h-screen bg-gray-100">
      {activePage === 'menu' && (
        <div className="menu text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">メニュー</h1>
          <ul className="menu-list list-none p-0">
            <li className="mb-4">
              <button
                onClick={() => setActivePage('learn')}
                className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
              >
                単語覚える
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActivePage('quiz')}
                className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
              >
                単語をテストする
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActivePage('register')}
                className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition-colors"
              >
                単語を登録する
              </button>
            </li>
          </ul>
        </div>
      )}

      {activePage === 'learn' && (
        <div className="relative w-full h-full">
          <VocabDisplay onBackToHome={() => setActivePage('menu')} />
          <button
            className="absolute top-4 left-4 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
            onClick={() => setActivePage('menu')}
          >
            &#x2715; {/* ×ボタン */}
          </button>
        </div>
      )}

      {activePage === 'register' && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">単語を登録する画面</h2>
          {/* 単語登録画面のコンポーネントをここに追加 */}
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={() => setActivePage('menu')}
          >
            戻る
          </button>
        </div>
      )}

      {activePage === 'quiz' && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">単語をテストする画面</h2>
          {/* 単語テスト画面のコンポーネントをここに追加 */}
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={() => setActivePage('menu')}
          >
            戻る
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
