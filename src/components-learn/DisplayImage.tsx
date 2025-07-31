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
    // Windowsパスをウェブパスに変換
    let webPath = imagePath;
    
    // public\ または public/ で始まる場合は削除
    if (webPath.startsWith('public\\') || webPath.startsWith('public/')) {
      webPath = webPath.replace(/^public[\\\/]/, '');
    }
    
    // すべてのバックスラッシュをスラッシュに変換
    webPath = webPath.replace(/\\/g, '/');
    
    // GitHub Pages対応: process.env.PUBLIC_URLを使用
    const baseUrl = process.env.PUBLIC_URL || '';
    
    // 先頭にスラッシュを追加（まだない場合）
    if (!webPath.startsWith('/')) {
      webPath = '/' + webPath;
    }
    
    // ベースURLと組み合わせ
    const fullPath = baseUrl + webPath;
    
    return fullPath;
  };

  const processedPath = getImagePath(imagePath);
  console.log('Original path:', imagePath);
  console.log('Processed path:', processedPath);
  console.log('BASE_URL:', process.env.PUBLIC_URL);

  return (
    <div className="w-full relative">
      <img
        src={processedPath}
        alt=""
        className={`w-full h-auto object-contain ${className}`}
        onClick={onClick}
        onError={(e) => {
          console.error('Image failed to load:', processedPath);
          console.error('Error event:', e);
          console.error('Current location:', window.location.href);
        }}
      />
    </div>
  );
};

export default DisplayImage;