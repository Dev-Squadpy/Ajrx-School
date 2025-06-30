import React, { useState, useEffect } from 'react';
import { ChessPiece as ChessPieceType, Position } from '../types/chess';

interface PixelPieceProps {
  piece: ChessPieceType;
  isSelected?: boolean;
  position: Position;
  isBeingCaptured?: boolean;
}

const PixelPiece: React.FC<PixelPieceProps> = ({ 
  piece, 
  isSelected = false, 
  position,
  isBeingCaptured = false 
}) => {
  const [isExploding, setIsExploding] = useState(false);
  const [fragments, setFragments] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    rotation: number; 
    scale: number;
    color: string;
  }>>([]);

  const getPixelArt = (piece: ChessPieceType): JSX.Element => {
    const isWhite = piece.color === 'white';
    const primaryColor = isWhite ? '#F8F8FF' : '#2F2F2F';
    const secondaryColor = isWhite ? '#E0E0E0' : '#1A1A1A';
    const accentColor = isWhite ? '#FFD700' : '#8B4513';
    const shadowColor = isWhite ? '#C0C0C0' : '#000000';

    const pixelSize = '3px';
    const gridSize = 12;

    const createPixel = (color: string, key: number) => (
      <div 
        key={key} 
        style={{
          width: pixelSize,
          height: pixelSize,
          backgroundColor: color,
          imageRendering: 'pixelated',
        }} 
      />
    );

    const createRow = (pattern: string[], rowIndex: number) => (
      pattern.map((color, colIndex) => {
        const key = rowIndex * gridSize + colIndex;
        switch (color) {
          case 'P': return createPixel(primaryColor, key);
          case 'S': return createPixel(secondaryColor, key);
          case 'A': return createPixel(accentColor, key);
          case 'D': return createPixel(shadowColor, key);
          case 'T': return createPixel('transparent', key);
          default: return createPixel('transparent', key);
        }
      })
    );

    const containerStyle = {
      display: 'grid',
      gridTemplateColumns: `repeat(${gridSize}, ${pixelSize})`,
      gap: '0px',
      width: `${parseInt(pixelSize) * gridSize}px`,
      height: `${parseInt(pixelSize) * gridSize}px`,
      imageRendering: 'pixelated' as const,
    };

    switch (piece.type) {
      case 'pawn':
        const pawnPattern = [
          ['T','T','T','T','T','T','T','T','T','T','T','T'],
          ['T','T','T','T','T','T','T','T','T','T','T','T'],
          ['T','T','T','T','P','P','P','P','T','T','T','T'],
          ['T','T','T','P','P','P','P','P','P','T','T','T'],
          ['T','T','T','P','A','P','P','A','P','T','T','T'],
          ['T','T','T','P','P','P','P','P','P','T','T','T'],
          ['T','T','T','T','P','S','S','P','T','T','T','T'],
          ['T','T','T','P','P','P','P','P','P','T','T','T'],
          ['T','T','P','P','P','P','P','P','P','P','T','T'],
          ['T','P','P','P','P','P','P','P','P','P','P','T'],
          ['T','S','S','S','S','S','S','S','S','S','S','T'],
          ['T','T','T','T','T','T','T','T','T','T','T','T'],
        ];
        return (
          <div style={containerStyle}>
            {pawnPattern.map((row, index) => createRow(row, index))}
          </div>
        );

      case 'rook':
        const rookPattern = [
          ['T','T','T','T','T','T','T','T','T','T','T','T'],
          ['T','P','P','T','P','P','T','P','P','T','P','P'],
          ['T','P','P','P','P','P','P','P','P','P','P','T'],
          ['T','P','A','P','P','P','P','P','P','A','P','T'],
          ['T','T','P','P','P','P','P','P','P','P','T','T'],
          ['T','T','P','P','P','P','P','P','P','P','T','T'],
          ['T','T','P','P','P','S','S','P','P','P','T','T'],
          ['T','T','P','P','P','P','P','P','P','P','T','T'],
          ['T','P','P','P','P','P','P','P','P','P','P','T'],
          ['T','P','P','P','P','P','P','P','P','P','P','T'],
          ['T','S','S','S','S','S','S','S','S','S','S','T'],
          ['T','T','T','T','T','T','T','T','T','T','T','T'],
        ];
        return (
          <div style={containerStyle}>
            {rookPattern.map((row, index) => createRow(row, index))}
          </div>
        );

      case 'knight':
        const knightPattern = [
          ['T','T','T','T','T','T','T','T','T','T','T','T'],
          ['T','T','T','P','P','P','P','T','T','T','T','T'],
          ['T','T','P','P','A','P','P','P','T','T','T','T'],
          ['T','T','P','A','P','P','P','P','P','T','T','T'],
          ['T','T','P','P','P','P','P','P','P','P','T','T'],
          ['T','T','P','P','S','P','P','S','P','P','T','T'],
          ['T','T','P','P','P','P','P','P','P','P','T','T'],
          ['T','T','T','P','P','P','P','P','P','T','T','T'],
          ['T','T','P','P','P','P','P','P','P','P','T','T'],
          ['T','P','P','P','P','P','P','P','P','P','P','T'],
          ['T','S','S','S','S','S','S','S','S','S','S','T'],
          ['T','T','T','T','T','T','T','T','T','T','T','T'],
        ];
        return (
          <div style={containerStyle}>
            {knightPattern.map((row, index) => createRow(row, index))}
          </div>
        );

      case 'bishop':
        const bishopPattern = [
          ['T','T','T','T','T','T','T','T','T','T','T','T'],
          ['T','T','T','T','T','A','A','T','T','T','T','T'],
          ['T','T','T','T','P','A','A','P','T','T','T','T'],
          ['T','T','T','P','P','P','P','P','P','T','T','T'],
          ['T','T','P','P','P','A','A','P','P','P','T','T'],
          ['T','T','P','P','P','P','P','P','P','P','T','T'],
          ['T','T','T','P','P','S','S','P','P','T','T','T'],
          ['T','T','P','P','P','P','P','P','P','P','T','T'],
          ['T','P','P','P','P','P','P','P','P','P','P','T'],
          ['T','P','P','P','P','P','P','P','P','P','P','T'],
          ['T','S','S','S','S','S','S','S','S','S','S','T'],
          ['T','T','T','T','T','T','T','T','T','T','T','T'],
        ];
        return (
          <div style={containerStyle}>
            {bishopPattern.map((row, index) => createRow(row, index))}
          </div>
        );

      case 'queen':
        const queenPattern = [
          ['T','T','T','T','T','T','T','T','T','T','T','T'],
          ['T','A','T','A','T','A','A','T','A','T','A','T'],
          ['T','A','A','A','A','A','A','A','A','A','A','T'],
          ['T','T','P','P','P','A','A','P','P','P','T','T'],
          ['T','T','P','P','P','P','P','P','P','P','T','T'],
          ['T','T','P','A','P','P','P','P','A','P','T','T'],
          ['T','T','P','P','P','S','S','P','P','P','T','T'],
          ['T','T','P','P','P','P','P','P','P','P','T','T'],
          ['T','P','P','P','P','P','P','P','P','P','P','T'],
          ['T','P','P','P','P','P','P','P','P','P','P','T'],
          ['T','S','S','S','S','S','S','S','S','S','S','T'],
          ['T','T','T','T','T','T','T','T','T','T','T','T'],
        ];
        return (
          <div style={containerStyle}>
            {queenPattern.map((row, index) => createRow(row, index))}
          </div>
        );

      case 'king':
        const kingPattern = [
          ['T','T','T','T','T','T','T','T','T','T','T','T'],
          ['T','T','T','T','T','A','A','T','T','T','T','T'],
          ['T','T','T','A','A','A','A','A','A','T','T','T'],
          ['T','A','A','A','A','A','A','A','A','A','A','T'],
          ['T','T','P','P','P','A','A','P','P','P','T','T'],
          ['T','T','P','P','P','P','P','P','P','P','T','T'],
          ['T','T','P','A','P','S','S','P','A','P','T','T'],
          ['T','T','P','P','P','P','P','P','P','P','T','T'],
          ['T','P','P','P','P','P','P','P','P','P','P','T'],
          ['T','P','P','P','P','P','P','P','P','P','P','T'],
          ['T','S','S','S','S','S','S','S','S','S','S','T'],
          ['T','T','T','T','T','T','T','T','T','T','T','T'],
        ];
        return (
          <div style={containerStyle}>
            {kingPattern.map((row, index) => createRow(row, index))}
          </div>
        );

      default:
        return <div style={{width: '36px', height: '36px', backgroundColor: primaryColor}} />;
    }
  };

  const explodePiece = () => {
    setIsExploding(true);
    
    // Generate pixel fragments
    const colors = piece.color === 'white' 
      ? ['#F8F8FF', '#E0E0E0', '#FFD700', '#C0C0C0'] 
      : ['#2F2F2F', '#1A1A1A', '#8B4513', '#000000'];
    
    const newFragments = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      rotation: Math.random() * 360,
      scale: 0.3 + Math.random() * 0.7,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setFragments(newFragments);

    setTimeout(() => {
      setIsExploding(false);
      setFragments([]);
    }, 1200);
  };

  useEffect(() => {
    if (isBeingCaptured) {
      explodePiece();
    }
  }, [isBeingCaptured]);

  if (isExploding) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {fragments.map((fragment) => (
          <div
            key={fragment.id}
            className="absolute w-2 h-2 transition-all duration-1000 ease-out"
            style={{
              backgroundColor: fragment.color,
              transform: `translate(${fragment.x}px, ${fragment.y}px) rotate(${fragment.rotation}deg) scale(${fragment.scale})`,
              opacity: 0,
              imageRendering: 'pixelated',
            }}
          />
        ))}
        
        {/* Pixel explosion effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-yellow-300 animate-ping opacity-75" style={{ imageRendering: 'pixelated' }}></div>
          <div className="absolute w-8 h-8 bg-orange-400 animate-ping opacity-50" style={{ imageRendering: 'pixelated' }}></div>
          <div className="absolute w-4 h-4 bg-red-400 animate-ping opacity-25" style={{ imageRendering: 'pixelated' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        transition-all duration-200 ease-in-out transform
        ${isSelected ? 'scale-125 animate-bounce' : 'hover:scale-110'}
        cursor-pointer active:scale-95
        ${isSelected ? 'drop-shadow-lg' : ''}
      `}
      style={{ 
        imageRendering: 'pixelated',
        filter: isSelected ? 'brightness(1.2) contrast(1.1)' : 'none'
      }}
    >
      {getPixelArt(piece)}
    </div>
  );
};

export default PixelPiece;