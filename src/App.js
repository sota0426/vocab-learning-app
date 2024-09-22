import React from 'react';
import VocabDisplay from './components/VocabDisplay.jsx'; // 単語表示コンポーネントをインポート

const App = () => {
  return (
    <div className="App">
      <h1>英単語学習アプリ</h1>
      <VocabDisplay /> {/* 単語表示コンポーネントを表示 */}
    </div>
  );
};

export default App;
