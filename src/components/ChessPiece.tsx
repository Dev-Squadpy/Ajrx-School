import React, { useState, useEffect } from 'react';
import { ChessPiece as ChessPieceType, Position } from '../types/chess';

interface ChessPieceProps {
  piece: ChessPieceType;
  isSelected?: boolean;
  position: Position;
  isBeingCaptured?: boolean;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ 
  piece, 
  isSelected = false, 
  position,
  isBeingCaptured = false 
}) => {
  const [isExploding, setIsExploding] = useState(false);
  const [fragments, setFragments] = useState<Array<{ id: number; x: number; y: number; rotation: number; scale: number }>>([]);

  const getPixelatedPiece = (piece: ChessPieceType): string => {
    const pixelPieces = {
      white: {
        king: '♔',
        queen: '♕',
        rook: '♖',
        bishop: '♗',
        knight: '♘',
        pawn: '♙'
      },
      black: {
        king: '♚',
        queen: '♛',
        rook: '♜',
        bishop: '♝',
        knight: '♞',
        pawn: '♟'
      }
    };

    return pixelPieces[piece.color][piece.type];
  };

  const explodePiece = () => {
    setIsExploding(true);
    
    // Generate random fragments
    const newFragments = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      rotation: Math.random() * 360,
      scale: 0.3 + Math.random() * 0.4
    }));
    
    setFragments(newFragments);

    // Clean up after animation
    setTimeout(() => {
      setIsExploding(false);
      setFragments([]);
    }, 1000);
  };

  useEffect(() => {
    if (isBeingCaptured) {
      explodePiece();
    }
  }, [isBeingCaptured]);

  const symbol = getPixelatedPiece(piece);
  
  if (isExploding) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {fragments.map((fragment) => (
          <div
            key={fragment.id}
            className={`absolute text-2xl font-bold transition-all duration-1000 ease-out ${
              piece.color === 'white' 
                ? 'text-gray-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]' 
                : 'text-gray-800 drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]'
            }`}
            style={{
              transform: `translate(${fragment.x}px, ${fragment.y}px) rotate(${fragment.rotation}deg) scale(${fragment.scale})`,
              opacity: 0,
              imageRendering: 'pixelated',
              fontFamily: 'monospace',
              textShadow: piece.color === 'white' 
                ? '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000' 
                : '2px 2px 0px #fff, -2px -2px 0px #fff, 2px -2px 0px #fff, -2px 2px 0px #fff'
            }}
          >
            {symbol}
          </div>
        ))}
        
        {/* Explosion effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute w-12 h-12 bg-orange-500 rounded-full animate-ping opacity-50"></div>
          <div className="absolute w-8 h-8 bg-red-500 rounded-full animate-ping opacity-25"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        text-4xl font-bold select-none transition-all duration-300 ease-in-out
        ${isSelected ? 'animate-bounce scale-125 z-10' : 'hover:scale-110'}
        ${piece.color === 'white' 
          ? 'text-gray-100 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]' 
          : 'text-gray-800 drop-shadow-[0_3px_6px_rgba(255,255,255,0.6)]'
        }
        cursor-pointer transform hover:rotate-3 active:scale-95
        filter contrast-125 saturate-110
      `}
      style={{
        imageRendering: 'pixelated',
        fontFamily: 'monospace',
        textShadow: piece.color === 'white' 
          ? '3px 3px 0px #000, -3px -3px 0px #000, 3px -3px 0px #000, -3px 3px 0px #000, 0px 3px 0px #000, 0px -3px 0px #000, 3px 0px 0px #000, -3px 0px 0px #000' 
          : '3px 3px 0px #fff, -3px -3px 0px #fff, 3px -3px 0px #fff, -3px 3px 0px #fff, 0px 3px 0px #fff, 0px -3px 0px #fff, 3px 0px 0px #fff, -3px 0px 0px #fff'
      }}
    >
      {symbol}
    </div>
  );
};

export default ChessPiece;