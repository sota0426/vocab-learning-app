//src\components\DisplayImage.tsx
import React from 'react';

interface WordDisplayProps {
  imagePath: string;
  onClick?: () => void;
  className?: string;
}

const DisplayImage: React.FC<WordDisplayProps> = ({ imagePath, onClick, className}) => {
  
  // 画像パスをフォーマットする関数
  const getImagePath = (imagePath: string): string => {
    if (imagePath.startsWith('public\\')) {
      return '/' + imagePath.replace('public\\', '').replace('\\', '/');
    }
    return imagePath;
  };
console.log(imagePath);
  return (
      <div className="w-full relative">
        <img
          src={getImagePath(imagePath)}
          alt=""
          className={`w-full h-auto object-contain ${className}`}
          onClick={onClick}  // ここで onClick を使用
        />
      </div>
  );
};

export default DisplayImage;