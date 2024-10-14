import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { SelectedItem } from '../types'; // パスはプロジェクト構成に応じて調整してください

interface AudioSettingsProps {
  selectedItems: SelectedItem[];
  setSelectedItems: (items: SelectedItem[]) => void;
}

// 単語タイプのオプション
const wordTypes = ['①単語', '②フレーズ', '③英文'];

const AudioSettings: React.FC<AudioSettingsProps> = ({
  selectedItems,
  setSelectedItems,
}) => {
  // 新しい項目を追加する関数
  const handleAddItem = (item: SelectedItem) => {
    setSelectedItems([...selectedItems, item]);
  };

  // 項目を削除する関数
  const handleRemoveItem = (id: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  // ドラッグ＆ドロップの終了ハンドラ
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(selectedItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSelectedItems(items);
  };

  // 性別を切り替える関数
  const toggleGender = (id: string) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.id === id
          ? { ...item, gender: item.gender === '男性' ? '女性' : '男性' }
          : item
      )
    );
  };

  // 言語の表示状態を切り替える関数（各単語ごと）
  const toggleLanguageEnabled = (id: string, language: '日本語' | '英語') => {
    setSelectedItems(
      selectedItems.map((item) => {
        if (item.id === id) {
          if (language === '日本語') {
            return {
              ...item,
              showJapaneseSentence: !item.showJapaneseSentence,
            };
          } else {
            return {
              ...item,
              showEnglishSentence: !item.showEnglishSentence,
            };
          }
        }
        return item;
      })
    );
  };

  // 単語タイプを切り替える関数
  const toggleWordType = (id: string) => {
    setSelectedItems(
      selectedItems.map((item) => {
        if (item.id === id) {
          const currentIndex = wordTypes.indexOf(item.wordType);
          const nextIndex = (currentIndex + 1) % wordTypes.length;
          return {
            ...item,
            wordType: wordTypes[nextIndex] as '①単語' | '②フレーズ' | '③文章',
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* 左側: 選択された項目のリストと並び替え */}
      <div className="flex flex-col space-y-2">
        <p className="text-sm text-left mb-4">※ドラッグ＆ドロップで並び替えができます。</p>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="selectedItems">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mb-4"
              >
                {selectedItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <li
                        className="flex flex-col justify-between items-start mb-2 p-2 bg-gray-100 rounded"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="w-full flex justify-between items-center">
                          <span>
                            {index + 1}．{item.wordType}： {item.language} 音声  ({item.gender})
                          </span>
                          <div className="flex items-center space-x-2">

                          </div>
                        </div>

                        {/* 言語の表示状態を切り替えるボタン */}
                        <div className="flex space-x-4 mt-2">
                          {/* 英語の表示状態切替ボタン */}
                              {/* 単語タイプ切り替えボタン */}
                              <button
                            onClick={() => toggleWordType(item.id)}
                            className="px-2 py-1 border rounded bg-gray-300 text-black"
                          >
                            {item.wordType}
                          </button>
                          
                          <button
                            onClick={() => toggleLanguageEnabled(item.id, '英語')}
                            className={`px-3 py-1 border rounded ${
                              item.showEnglishSentence
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 text-black'
                            }`}
                          >
                            英 {item.showEnglishSentence ? 'あり' : 'なし'}
                          </button>

                          {/* 日本語の表示状態切替ボタン */}
                          <button
                            onClick={() => toggleLanguageEnabled(item.id, '日本語')}
                            className={`px-3 py-1 border rounded ${
                              item.showJapaneseSentence
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 text-black'
                            }`}
                          >
                            日{item.showJapaneseSentence ? 'あり' : 'なし'}
                          </button>

                          {/* 性別切り替えボタン */}
                          <button
                            onClick={() => toggleGender(item.id)}
                            className={`px-2 py-1 rounded ${
                              item.gender === '男性' ? 'bg-green-500' : 'bg-pink-500'
                            } text-white`}
                            aria-label={item.gender === '男性' ? '男性に変更' : '女性に変更'}
                          >
                            {item.gender}音声
                          </button>
                          <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="px-2 py-1 rounded-full bg-black text-white"
                            >
                              削除
                            </button>
                          </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* 右側: ワードと音声選択のボタン形式 */}
      <div className="flex flex-row space-x-2">
        <h1 className="text-lg font-semibold mb-4">音声追加</h1>
        {[1,2,3].map((wordNumber) => (
          <div key={wordNumber} className="mb-4 flex flex-">
              <button
                className="px-4 py-2 border text-sm bg-white text-black rounded"
                onClick={() => {
                  const newId = `英語_男性_${wordNumber}`;
                    const item: SelectedItem = {
                      wordNumber: wordNumber as 1 | 2 | 3,
                      language: '英語',
                      gender: '男性',
                      id: newId,
                      label: '',
                      japaneseSentence: '',
                      englishSentence: '',
                      showJapaneseSentence: false,
                      showEnglishSentence: true,
                      wordType: wordTypes[wordNumber - 1] as '①単語' | '②フレーズ' | '③文章', // デフォルトの単語タイプ
                    };
                    setSelectedItems([...selectedItems, item]);
                  }
                }
              >
                {wordTypes[wordNumber - 1]} 
              </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioSettings;
