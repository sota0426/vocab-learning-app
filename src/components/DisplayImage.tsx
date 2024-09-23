import React from 'react';

interface WordDisplayProps {
  imagePath: string;
}

const DisplayImage: React.FC<WordDisplayProps> = ({ imagePath}) => {
  return (
      <div className="w-1/2 relative">
        <img
          src={imagePath}
          alt=""
          className="w-full h-auto object-contain"

        />
      </div>
  );
};

export default DisplayImage;