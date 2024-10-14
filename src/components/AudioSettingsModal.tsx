// src/components/AudioSettingsModal.tsx

import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { SelectedItem } from '../types'; // パスはプロジェクト構成に応じて調整してください

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: SelectedItem[];
  setSelectedItems: (items: SelectedItem[]) => void;
}


const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  isOpen,
  onClose,
  selectedItems,
  setSelectedItems,
}) => {
  // 新しい項目を追加する関数
  const handleAddItem = (item: SelectedItem) => {
    const exists = selectedItems.some((i) => i.id === item.id);
    if (!exists) {
      setSelectedItems([...selectedItems, item]);
    }
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



  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50`}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl flex">
        {/* 左側: 選択された項目のリストと並び替え */}
        <div className="w-1/2 pr-4 border-r overflow-y-auto max-h-screen">
          <h1 className="text-lg font-semibold mb-4">選択編集</h1>
          <p className="text-sm  text-left mb-4">※ドラッグ＆ドロップで並び替えができますい。</p>

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
                              
                             {index + 1}．{item.wordNumber === 1 ? '①単語' : item.wordNumber === 2 ? '②チャンク' : '③文章'}： {item.language} 音声  ({item.gender})
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="px-2 py-1 bg-black text-white rounded"
                              >
                                削除
                              </button>
                            </div>
                          </div>

                          {/* 言語の表示状態を切り替えるボタン */}
                          <div className="flex space-x-2 mt-2">

                            {/* 英語の表示状態切替ボタン */}
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

                            <button
                                onClick={() => toggleGender(item.id)}
                                className={`px-2 py-1 rounded ${
                                  item.gender === '男性' ? 'bg-green-500' : 'bg-pink-500'
                                } text-white`}
                                aria-label={item.gender === '男性' ? '男性に変更' : '女性に変更'}
                                >
                                  音声（{item.gender}）
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
        <div className="w-1/2 pl-4 overflow-y-auto max-h-screen">
          <h1 className="text-lg font-semibold mb-4">ワード・音声選択</h1>
          {[1, 2, 3].map((wordNumber) => (
            <div key={wordNumber} className="mb-4">
              {wordNumber === 1 ? <h2 className="mb-2 text-left">①単語（例: create）</h2> : null}
              {wordNumber === 2 ? <h2 className="mb-2 text-left">②チャンク（例: create a masterpiece）</h2> : null}
              {wordNumber === 3 ? <h2 className="mb-2 text-left">③文章（例: He creates a breathtaking masterpiece.）</h2> : null}
              <div className="flex space-x-4">
                {/* 英語ボタン */}
                <button
                  className={`px-4 py-2 border text-sm bg-white text-black rounded ${
                    false ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => {
                    // 英語追加ロジック
                    const newId = `英語_${'男性'}_${wordNumber}`;
                    const itemExists = selectedItems.some((item) => item.id === newId);
                    if (!itemExists) {
                      const item: SelectedItem = {
                        wordNumber: wordNumber as 1 | 2 | 3,
                        language: '英語',
                        gender: '男性', // デフォルトで男性を設定
                        id: newId,
                        label: '',
                        japaneseSentence: '',
                        englishSentence: '',
                        showJapaneseSentence: false, 
                        showEnglishSentence: true,  
                      };
                      handleAddItem(item);
                    }
                  }}
                >
                  英語音声
                </button>

                {/* 日本語ボタン */}
                <button
                  className={`px-4 py-2 border text-sm bg-white text-black rounded ${
                    false ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => {
                    // 日本語追加ロジック
                    const newId = `日本語_${'男性'}_${wordNumber}`;
                    const itemExists = selectedItems.some((item) => item.id === newId);
                    if (!itemExists) {
                      const item: SelectedItem = {
                        wordNumber: wordNumber as 1 | 2 | 3,
                        language: '日本語',
                        gender: '男性', // デフォルトで男性を設定
                        id: newId,
                        label: '',
                        japaneseSentence: '',
                        englishSentence: '',
                        showJapaneseSentence: true, 
                        showEnglishSentence: true,  
                      };
                      handleAddItem(item);
                    }
                  }}
                >
                  日本語音声
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioSettingsModal;
