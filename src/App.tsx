import React from 'react';
import './index.css';
import VocabDisplay from '../src/components/VocabDisplay'; // ".tsx"は省略可

const App = () => {
  return (
    <div className="App">
      <h1>英単語学習アプリ</h1>
      <VocabDisplay />
    </div>
  );
};

export default App;
