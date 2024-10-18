import React from 'react';

type BackButtonProps = {
  onClick: () => void;
};

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      className="absolute top-4 left-4 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
      onClick={onClick}
    >
      &#x2715; {/* ×ボタン */}
    </button>
  );
};

export default BackButton;
