import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: SelectedItem[];
  setSelectedItems: (items: SelectedItem[]) => void;
}

interface SelectedItem {
  id: string;
  label: string;
  language: '英語' | '日本語';
  gender: '男性' | '女性';
  wordNumber: 1 | 2 | 3;
}
const words = [
  'create',
  'create a masterpiece.',
  'He creates a breathtaking masterpiece.',
];

const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  isOpen,
  onClose,
  selectedItems,
  setSelectedItems,
}) => {
  const [newItem, setNewItem] = useState<SelectedItem>({
    id: '',
    label: '',
    language: '英語',
    gender: '男性',
    wordNumber: 1,
  });

  // newItemが変更されたときにアイテムを追加する
  useEffect(() => {
    if (newItem.id) {
      handleAddItem(newItem);
    }
  }, [newItem]);

  const handleAddItem = (item: SelectedItem) => {
    const id = `${item.language}_${item.gender}_${item.wordNumber}`;
    setSelectedItems([...selectedItems, { ...item, id }]);
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(selectedItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSelectedItems(items);
  };

  const toggleGender = (id: string) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.id === id
          ? { ...item, gender: item.gender === '男性' ? '女性' : '男性' }
          : item
      )
    );
  };

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50`}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl flex">
        {/* 左側: 選択された項目のリストと並び替え */}
        <div className="w-1/2 pr-4 border-r">
          <h1 className="text-lg font-semibold mb-4">選択編集</h1>
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
                          className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span>
                            {item.language} ({item.gender}) - ワード{item.wordNumber}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleGender(item.id)}
                              className="px-2 py-1 bg-green-500 text-white rounded"
                            >
                              男女
                            </button>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="px-2 py-1 bg-red-500 text-white rounded"
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
        <div className="w-1/2 pl-4">
          <h1 className="text-lg font-semibold mb-4">ワード・音声選択</h1>
          {[1, 2, 3].map((wordNumber) => (
            <div key={wordNumber} className="mb-4">
              <h2 className="mb-2">ワード{wordNumber}: {words[wordNumber - 1]}</h2>
              <div className="flex space-x-4">
                {/* 英語ボタン */}
                <button
                  className={`px-4 py-2 border text-sm ${
                    newItem.wordNumber === wordNumber &&
                    newItem.language === '英語'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-black'
                  } rounded`}
                  onClick={() => {
                    setNewItem({
                      wordNumber: wordNumber as 1 | 2 | 3,
                      language: '英語',
                      gender: '男性', // デフォルトで男性を設定
                      id: `${'英語'}_${'男性'}_${wordNumber}`,
                      label: '',
                    });
                  }}
                >
                  英語
                </button>

                {/* 日本語ボタン */}
                <button
                  className={`px-4 py-2 border text-sm ${
                    newItem.wordNumber === wordNumber &&
                    newItem.language === '日本語'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-black'
                  } rounded`}
                  onClick={() => {
                    setNewItem({
                      wordNumber: wordNumber as 1 | 2 | 3,
                      language: '日本語',
                      gender: '男性', // デフォルトで男性を設定
                      id: `${'日本語'}_${'男性'}_${wordNumber}`,
                      label: '',
                    });
                  }}
                >
                  日本語
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
