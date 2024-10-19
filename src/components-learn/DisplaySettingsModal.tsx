import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { SelectedItem } from '../components-tools/types'; // プロジェクトに応じてパスを修正

interface DisplayOptions {
  showWordPronunciation: boolean;
  showWordClass: boolean;
  showWordStructure: boolean;
  showWordAlt: boolean;
  showWordDescription: boolean;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  playbackRate: number;
  setPlaybackRate: (rate: number) => void;
  nextWordDelay: number;
  setNextWordDelay: (delay: number) => void;
  displayOptions: DisplayOptions;
  setDisplayOptions: (options: DisplayOptions) => void;
  selectedItems: SelectedItem[];
  setSelectedItems: (items: SelectedItem[]) => void;
}

// 単語タイプのオプション
const wordTypes = ['①単語', '②フレーズ', '③英文'];

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  playbackRate,
  setPlaybackRate,
  nextWordDelay,
  setNextWordDelay,
  displayOptions,
  setDisplayOptions,
  selectedItems,
  setSelectedItems,
}) => {
  const [activeTab, setActiveTab] = useState<'playback' | 'audio'>('audio'); // アクティブなタブの初期値
  const [localItems, setLocalItems] = useState<SelectedItem[]>(selectedItems); // ローカル状態でselectedItemsを保持

  // localStorageからdisplayOptionsを取得し、初期化
  useEffect(() => {
    const savedOptions = localStorage.getItem('ENG_learning_displayOptions');
    if (savedOptions) {
      setDisplayOptions(JSON.parse(savedOptions));
    }
  }, [setDisplayOptions]);

  // localStorageからselectedItemsを取得し、初期化
  useEffect(() => {
    const savedItems = localStorage.getItem('ENG_learning_selectedItems');
    if (savedItems) {
      setSelectedItems(JSON.parse(savedItems));
    }
  }, [setSelectedItems]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayOptions({
      ...displayOptions,
      [e.target.name]: e.target.checked,
    });
  };

 // カスタムデータ1
const customData1: SelectedItem[] = [
  {
    id: '1',
    label: '英語_女性_1',
    wordType: '①単語', // 型 '①単語' に合わせて修正
    speakLanguage: '英語',
    wordNumber: 1,
    showJapaneseSentence: false,
    showEnglishSentence: true,
  },
  {
    id: '2',
    label: '日本語_男性_1',
    wordType: '①単語', // 型 '①単語' に合わせて修正
    speakLanguage: '日本語',
    wordNumber: 1,
    showJapaneseSentence: true,
    showEnglishSentence: true,
  },
   {
    id: '3',
    label: '英語_女性_1',
    wordType: '①単語', // 型 '①単語' に合わせて修正
    speakLanguage: '英語',
    wordNumber: 1,
    showJapaneseSentence: true,
    showEnglishSentence: true,
  },

];
const customData2: SelectedItem[] = [
  {
    id: '1',
    label: '日本語_男性_1',
    wordType: '①単語', // 型 '①単語' に合わせて修正
    speakLanguage: '日本語',
    wordNumber: 1,
    showJapaneseSentence: true,
    showEnglishSentence: false,
  },
   {
    id: '2',
    label: '英語_女性_1',
    wordType: '①単語', // 型 '①単語' に合わせて修正
    speakLanguage: '英語',
    wordNumber: 1,
    showJapaneseSentence: true,
    showEnglishSentence: true,
  },
   {
    id: '3',
    label: '英語_女性_1',
    wordType: '①単語', // 型 '①単語' に合わせて修正
    speakLanguage: '英語',
    wordNumber: 1,
    showJapaneseSentence: true,
    showEnglishSentence: true,
  },

];
// カスタムデータ2
const customData3: SelectedItem[] = [
  {
    id: '1',
    label: '英語_女性_1',
    wordType: '①単語', // 型 '①単語' に合わせて修正
    speakLanguage: '英語',
    wordNumber: 1,
    showJapaneseSentence: false,
    showEnglishSentence: true,
  },
  {
    id: '2',
    label: '日本語_男性_1',
    wordType: '①単語', // 型 '①単語' に合わせて修正
    speakLanguage: '日本語',
    wordNumber: 1,
    showJapaneseSentence: true,
    showEnglishSentence: true,
  },
  {
    id: '3',
    label: '英語_女性_2',
    wordType: '②フレーズ', // 型 '②フレーズ' に合わせて修正
    speakLanguage: '英語',
    wordNumber: 2,
    showJapaneseSentence: false,
    showEnglishSentence: true,
  },
  {
    id: '4',
    label: '日本語_男性_2',
    wordType: '②フレーズ', // 型 '②フレーズ' に合わせて修正
    speakLanguage: '日本語',
    wordNumber: 2,
    showJapaneseSentence: true,
    showEnglishSentence: true,
  },
  {
    id: '5',
    label: '英語_女性_3',
    wordType: '③文章', // 型 '③文章' に合わせて修正
    speakLanguage: '英語',
    wordNumber: 3,
    showJapaneseSentence: false,
    showEnglishSentence: true,
  },
  {
    id: '6',
    label: '日本語_男性_3',
    wordType: '③文章', // 型 '③文章' に合わせて修正
    speakLanguage: '日本語',
    wordNumber: 3,
    showJapaneseSentence: true,
    showEnglishSentence: true,
  },
];

const customData4: SelectedItem[] = [
  {
    id: '1',
    label: '英語_女性_3',
    wordType: '③文章', // 型 '③文章' に合わせて修正
    speakLanguage: '英語',
    wordNumber: 3,
    showJapaneseSentence: false,
    showEnglishSentence: false,
  },
  {
    id: '2',
    label: '英語_女性_3',
    wordType: '③文章', // 型 '③文章' に合わせて修正
    speakLanguage: '英語',
    wordNumber: 3,
    showJapaneseSentence: false,
    showEnglishSentence: true,
  },
  {
    id: '3',
    label: '日本語_男性_3',
    wordType: '③文章', // 型 '③文章' に合わせて修正
    speakLanguage: '日本語',
    wordNumber: 3,
    showJapaneseSentence: true,
    showEnglishSentence: true,
  },
  {
    id: '4',
    label: '英語_男性_3',
    wordType: '③文章', // 型 '③文章' に合わせて修正
    speakLanguage: '英語',
    wordNumber: 3,
    showJapaneseSentence: true,
    showEnglishSentence: true,
  },
];

  // カスタムボタンが押されたときに初期データを置き換える処理
  const applyCustomData = (customData: SelectedItem[]) => {
    setLocalItems(customData);
  };

  // 保存ボタンが押されたときの処理
  const handleSave = () => {
    if (localItems.length === 0) return;
    localStorage.setItem('ENG_learning_displayOptions', JSON.stringify(displayOptions));
    localStorage.setItem('ENG_learning_selectedItems', JSON.stringify(localItems));
    setSelectedItems(localItems);
    onClose(); // モーダルを閉じる
  };

  // 項目を削除する関数
  const handleRemoveItem = (id: string) => {
    setLocalItems(localItems.filter((item) => item.id !== id));
  };

  // ドラッグ＆ドロップの終了ハンドラ
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(localItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setLocalItems(items);
  };


  // 言語の表示状態を切り替える関数（1つのボタンで4つの状態を切り替え）
  const toggleLanguageEnabled = (id: string) => {
    setLocalItems(
      localItems.map((item) => {
        if (item.id === id) {
          let nextState = {
            showJapaneseSentence: false,
            showEnglishSentence: false,
          };

          if (item.showJapaneseSentence && item.showEnglishSentence) {
            // 両方表示中 -> 英語のみ
            nextState = {
              showJapaneseSentence: false,
              showEnglishSentence: true,
            };
          } else if (item.showEnglishSentence) {
            // 英語のみ -> 日本語のみ
            nextState = {
              showJapaneseSentence: true,
              showEnglishSentence: false,
            };
          } else if (item.showJapaneseSentence) {
            // 日本語のみ -> 両方表示なし
            nextState = {
              showJapaneseSentence: false,
              showEnglishSentence: false,
            };
          } else {
            // 両方非表示 -> 両方表示
            nextState = {
              showJapaneseSentence: true,
              showEnglishSentence: true,
            };
          }

          return {
            ...item,
            ...nextState,
          };
        }
        return item;
      })
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 max-h-[90vh] overflow-y-auto">
        <h1 className="text-lg font-semibold mb-4">設定</h1>

        {/* タブ */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab('playback')}
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === 'playback' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            再生設定
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === 'audio' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            音声設定
          </button>
        </div>



        {/* アクティブなタブの内容を表示 */}
        {activeTab === 'playback' && (
          <div>
{activeTab === 'playback' && (
  <div>
    
    {/* 再生速度の設定 */}
    <div className="mb-4">
      <label className="block mb-2">再生速度（{playbackRate.toFixed(1)}x）</label>
      <input
        type="range"
        min="0.7"
        max="1.3"
        step="0.1"
        value={playbackRate}
        onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>

    {/* 次の単語までの遅延時間 */}
    <div className="mb-4">
      <label className="block mb-2">次の単語までの遅延（{nextWordDelay.toFixed(1)}秒）</label>
      <input
        type="range"
        min="0.1"
        max="2.0"
        step="0.1"
        value={nextWordDelay}
        onChange={(e) => setNextWordDelay(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>

    {/* 再生設定 */}
    <div className="mb-4 text-left">
      <label className="block mb-2">
        <input
          type="checkbox"
          name="showWordPronunciation"
          checked={displayOptions.showWordPronunciation}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        発音
      </label>
      <label className="block mb-2">
        <input
          type="checkbox"
          name="showWordDescription"
          checked={displayOptions.showWordDescription}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        単語の説明
      </label>
      <label className="block mb-2">
        <input
          type="checkbox"
          name="showWordClass"
          checked={displayOptions.showWordClass}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        単語のクラス（品詞）
      </label>
      <label className="block mb-2">
        <input
          type="checkbox"
          name="showWordStructure"
          checked={displayOptions.showWordStructure}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        単語の構造
      </label>
      <label className="block mb-2">
        <input
          type="checkbox"
          name="showWordAlt"
          checked={displayOptions.showWordAlt}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        別の単語（英語・日本語）
      </label>
    </div>

  </div>
)}

          </div>
        )}

        {activeTab === 'audio' && (
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
                      {localItems.map((item, index) => (
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
                                  {index + 1}．{item.wordType}（{item.speakLanguage}）
                                </span>
                              </div>

                              {/* 言語の表示状態を切り替えるボタン */}
                              <div className="flex space-x-4 mt-2">
                                {/* 英語・日本語表示切替ボタン */}
                                <button
                                  onClick={() => toggleLanguageEnabled(item.id)}
                                  className={`px-3 py-1 border rounded ${
                                    item.showJapaneseSentence && item.showEnglishSentence
                                      ? 'bg-blue-400 text-white'
                                      : item.showEnglishSentence
                                      ? 'bg-blue-600 text-white'
                                      : item.showJapaneseSentence
                                      ? 'bg-blue-900 text-white'
                                      : 'bg-gray-300 text-black'
                                  }`}
                                >
                                  {item.showJapaneseSentence && item.showEnglishSentence
                                    ? '日英あり'
                                    : item.showEnglishSentence
                                    ? ' 英のみ '
                                    : item.showJapaneseSentence
                                    ? ' 日のみ '
                                    : '  なし  '}
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
            <h2 className="text-lg font-semibold">自由追加</h2>
            <div className="flex space-x-4 mt-2">
              {[1, 2, 3].map((wordNumber) => (
                <div key={wordNumber} className="mb-4 flex flex-col">
                  <button
                    className="px-4 py-2 border text-sm bg-white hover:bg-gray-100 text-black rounded"
                    onClick={() => {
                      const newId = new Date().getTime();
                      const labelEng = `英語_${wordNumber}`;
                      const itemEng: SelectedItem = {
                        wordNumber: wordNumber as 1 | 2 | 3,
                        speakLanguage: '英語',
                        id: newId.toString(),
                        label: labelEng,
                        showJapaneseSentence: false,
                        showEnglishSentence: true,
                        wordType: wordTypes[wordNumber - 1] as '①単語' | '②フレーズ' | '③文章',
                      };
                      setLocalItems([...localItems, itemEng]);
                    }}
                  >
                    {wordTypes[wordNumber - 1]}（英語）
                  </button>
                  <button
                    className="px-4 py-2 border text-sm bg-white hover:bg-gray-100 text-black rounded mt-2"
                    onClick={() => {
                      const newId = new Date().getTime();
                      const labelJpn = `日本語_${wordNumber}`;
                      const itemJpn: SelectedItem = {
                        wordNumber: wordNumber as 1 | 2 | 3,
                        speakLanguage: '日本語',
                        id: newId.toString(),
                        label: labelJpn,
                        showJapaneseSentence: true,
                        showEnglishSentence: true,
                        wordType: wordTypes[wordNumber - 1] as '①単語' | '②フレーズ' | '③文章',
                      };
                      setLocalItems([...localItems, itemJpn]);
                    }}
                  >
                    {wordTypes[wordNumber - 1]}（日本語）
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
  {/* おすすめカスタム */}
           <div className="mb-6">
              <br />
              <h2 className="text-lg font-semibold">おすすめカスタム</h2>
              <div className="flex space-x-4 mt-2 ">
                <button
                  onClick={() => applyCustomData(customData1)}
                    className="px-4 py-2 border text-sm bg-white hover:bg-gray-100 text-black rounded mt-2"
                >
                  単語（英⇒日）
                </button>
                <button
                  onClick={() => applyCustomData(customData2)}
                    className="px-4 py-2 border text-sm bg-white hover:bg-gray-100 text-black rounded mt-2"
                >
                  単語（日⇒英）
                </button>                
                <button
                  onClick={() => applyCustomData(customData3)}
                    className="px-4 py-2 border text-sm bg-white hover:bg-gray-100 text-black rounded mt-2"
                >
                  単語⇒フレーズ⇒英文
                </button>
                <button
                  onClick={() => applyCustomData(customData4)}
                    className="px-4 py-2 border text-sm bg-white hover:bg-gray-100 text-black rounded mt-2"
                >
                  英文マスター（英⇒日）
                </button>                
              </div>
            </div>
        {/* キャンセルボタンと保存ボタン */}
        <button
          onClick={onClose}
          className={`mt-4 mr-6 px-4 py-2 text-white rounded transition-colors bg-red-500 hover:bg-red-600'}`}
          >
          キャンセル
        </button>
        <button
          onClick={handleSave}
          className={`mt-4 mr-4 px-4 py-2 text-white rounded transition-colors ${localItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
          保存
        </button>

      </div>
    </div>
  );
};

export default SettingsModal;
