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

  const getClassicPixelPiece = (piece: ChessPieceType): JSX.Element => {
    const isWhite = piece.color === 'white';
    const baseColor = isWhite ? '#F5F5DC' : '#8B4513';
    const shadowColor = isWhite ? '#D2B48C' : '#654321';
    const highlightColor = isWhite ? '#FFFACD' : '#A0522D';
    const darkColor = isWhite ? '#C0C0C0' : '#2F1B14';

    const pieceStyle = {
      width: '40px',
      height: '40px',
      position: 'relative' as const,
      imageRendering: 'pixelated' as const,
    };

    const pixelBorder = {
      border: '2px solid',
      borderColor: darkColor,
      borderRadius: '0px',
      imageRendering: 'pixelated' as const,
    };

    switch (piece.type) {
      case 'pawn':
        return (
          <div style={pieceStyle}>
            <svg width="40" height="40" viewBox="0 0 40 40" style={{ imageRendering: 'pixelated' }}>
              {/* Base */}
              <rect x="8" y="32" width="24" height="6" fill={shadowColor} {...pixelBorder} />
              <rect x="10" y="30" width="20" height="4" fill={baseColor} {...pixelBorder} />
              
              {/* Body */}
              <rect x="14" y="20" width="12" height="12" fill={baseColor} {...pixelBorder} />
              <rect x="16" y="18" width="8" height="4" fill={baseColor} {...pixelBorder} />
              
              {/* Head */}
              <rect x="16" y="12" width="8" height="8" fill={baseColor} {...pixelBorder} />
              <rect x="18" y="10" width="4" height="4" fill={highlightColor} {...pixelBorder} />
            </svg>
          </div>
        );

      case 'rook':
        return (
          <div style={pieceStyle}>
            <svg width="40" height="40" viewBox="0 0 40 40" style={{ imageRendering: 'pixelated' }}>
              {/* Base */}
              <rect x="6" y="32" width="28" height="6" fill={shadowColor} {...pixelBorder} />
              <rect x="8" y="30" width="24" height="4" fill={baseColor} {...pixelBorder} />
              
              {/* Tower body */}
              <rect x="12" y="16" width="16" height="16" fill={baseColor} {...pixelBorder} />
              
              {/* Battlements */}
              <rect x="10" y="8" width="20" height="10" fill={baseColor} {...pixelBorder} />
              <rect x="12" y="6" width="4" height="4" fill={baseColor} {...pixelBorder} />
              <rect x="18" y="6" width="4" height="4" fill={baseColor} {...pixelBorder} />
              <rect x="24" y="6" width="4" height="4" fill={baseColor} {...pixelBorder} />
              
              {/* Details */}
              <rect x="16" y="20" width="8" height="8" fill={highlightColor} {...pixelBorder} />
            </svg>
          </div>
        );

      case 'knight':
        return (
          <div style={pieceStyle}>
            <svg width="40" height="40" viewBox="0 0 40 40" style={{ imageRendering: 'pixelated' }}>
              {/* Base */}
              <rect x="6" y="32" width="28" height="6" fill={shadowColor} {...pixelBorder} />
              <rect x="8" y="30" width="24" height="4" fill={baseColor} {...pixelBorder} />
              
              {/* Horse head outline */}
              <rect x="12" y="24" width="16" height="8" fill={baseColor} {...pixelBorder} />
              <rect x="16" y="16" width="12" height="10" fill={baseColor} {...pixelBorder} />
              <rect x="20" y="12" width="8" height="6" fill={baseColor} {...pixelBorder} />
              <rect x="22" y="8" width="6" height="6" fill={baseColor} {...pixelBorder} />
              
              {/* Mane */}
              <rect x="14" y="14" width="4" height="8" fill={highlightColor} {...pixelBorder} />
              <rect x="18" y="10" width="4" height="6" fill={highlightColor} {...pixelBorder} />
              
              {/* Eye */}
              <rect x="24" y="14" width="2" height="2" fill={darkColor} />
              
              {/* Nose */}
              <rect x="26" y="16" width="2" height="2" fill={darkColor} />
            </svg>
          </div>
        );

      case 'bishop':
        return (
          <div style={pieceStyle}>
            <svg width="40" height="40" viewBox="0 0 40 40" style={{ imageRendering: 'pixelated' }}>
              {/* Base */}
              <rect x="6" y="32" width="28" height="6" fill={shadowColor} {...pixelBorder} />
              <rect x="8" y="30" width="24" height="4" fill={baseColor} {...pixelBorder} />
              
              {/* Body */}
              <rect x="12" y="20" width="16" height="12" fill={baseColor} {...pixelBorder} />
              <rect x="14" y="16" width="12" height="6" fill={baseColor} {...pixelBorder} />
              <rect x="16" y="12" width="8" height="6" fill={baseColor} {...pixelBorder} />
              
              {/* Mitre top */}
              <rect x="18" y="8" width="4" height="6" fill={baseColor} {...pixelBorder} />
              <rect x="19" y="6" width="2" height="4" fill={highlightColor} {...pixelBorder} />
              
              {/* Cross */}
              <rect x="19" y="4" width="2" height="4" fill={highlightColor} {...pixelBorder} />
              <rect x="18" y="5" width="4" height="2" fill={highlightColor} {...pixelBorder} />
              
              {/* Diagonal slit */}
              <rect x="18" y="18" width="4" height="2" fill={darkColor} />
            </svg>
          </div>
        );

      case 'queen':
        return (
          <div style={pieceStyle}>
            <svg width="40" height="40" viewBox="0 0 40 40" style={{ imageRendering: 'pixelated' }}>
              {/* Base */}
              <rect x="4" y="32" width="32" height="6" fill={shadowColor} {...pixelBorder} />
              <rect x="6" y="30" width="28" height="4" fill={baseColor} {...pixelBorder} />
              
              {/* Body */}
              <rect x="10" y="18" width="20" height="14" fill={baseColor} {...pixelBorder} />
              <rect x="12" y="14" width="16" height="6" fill={baseColor} {...pixelBorder} />
              
              {/* Crown base */}
              <rect x="8" y="10" width="24" height="6" fill={baseColor} {...pixelBorder} />
              
              {/* Crown points */}
              <rect x="10" y="4" width="4" height="8" fill={highlightColor} {...pixelBorder} />
              <rect x="16" y="2" width="4" height="10" fill={highlightColor} {...pixelBorder} />
              <rect x="20" y="2" width="4" height="10" fill={highlightColor} {...pixelBorder} />
              <rect x="26" y="4" width="4" height="8" fill={highlightColor} {...pixelBorder} />
              
              {/* Jewels */}
              <rect x="11" y="6" width="2" height="2" fill={darkColor} />
              <rect x="17" y="4" width="2" height="2" fill={darkColor} />
              <rect x="21" y="4" width="2" height="2" fill={darkColor} />
              <rect x="27" y="6" width="2" height="2" fill={darkColor} />
            </svg>
          </div>
        );

      case 'king':
        return (
          <div style={pieceStyle}>
            <svg width="40" height="40" viewBox="0 0 40 40" style={{ imageRendering: 'pixelated' }}>
              {/* Base */}
              <rect x="4" y="32" width="32" height="6" fill={shadowColor} {...pixelBorder} />
              <rect x="6" y="30" width="28" height="4" fill={baseColor} {...pixelBorder} />
              
              {/* Body */}
              <rect x="10" y="18" width="20" height="14" fill={baseColor} {...pixelBorder} />
              <rect x="12" y="14" width="16" height="6" fill={baseColor} {...pixelBorder} />
              
              {/* Crown base */}
              <rect x="8" y="10" width="24" height="6" fill={baseColor} {...pixelBorder} />
              
              {/* Crown points */}
              <rect x="12" y="6" width="4" height="6" fill={highlightColor} {...pixelBorder} />
              <rect x="18" y="4" width="4" height="8" fill={highlightColor} {...pixelBorder} />
              <rect x="24" y="6" width="4" height="6" fill={highlightColor} {...pixelBorder} />
              
              {/* Cross on top */}
              <rect x="19" y="2" width="2" height="6" fill={highlightColor} {...pixelBorder} />
              <rect x="17" y="3" width="6" height="2" fill={highlightColor} {...pixelBorder} />
              
              {/* Details */}
              <rect x="16" y="20" width="8" height="4" fill={highlightColor} {...pixelBorder} />
            </svg>
          </div>
        );

      default:
        return <div style={{width: '40px', height: '40px', backgroundColor: baseColor, ...pixelBorder}} />;
    }
  };

  const explodePiece = () => {
    setIsExploding(true);
    
    // Generate pixel fragments
    const colors = piece.color === 'white' 
      ? ['#F5F5DC', '#D2B48C', '#FFFACD', '#C0C0C0'] 
      : ['#8B4513', '#654321', '#A0522D', '#2F1B14'];
    
    const newFragments = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 250,
      y: (Math.random() - 0.5) * 250,
      rotation: Math.random() * 360,
      scale: 0.2 + Math.random() * 0.8,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setFragments(newFragments);

    setTimeout(() => {
      setIsExploding(false);
      setFragments([]);
    }, 1500);
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
            className="absolute w-2 h-2 transition-all duration-1500 ease-out"
            style={{
              backgroundColor: fragment.color,
              transform: `translate(${fragment.x}px, ${fragment.y}px) rotate(${fragment.rotation}deg) scale(${fragment.scale})`,
              opacity: 0,
              imageRendering: 'pixelated',
              border: '1px solid rgba(0,0,0,0.3)',
            }}
          />
        ))}
        
        {/* Enhanced explosion effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-yellow-300 animate-ping opacity-75" style={{ imageRendering: 'pixelated' }}></div>
          <div className="absolute w-12 h-12 bg-orange-400 animate-ping opacity-50" style={{ imageRendering: 'pixelated' }}></div>
          <div className="absolute w-8 h-8 bg-red-400 animate-ping opacity-25" style={{ imageRendering: 'pixelated' }}></div>
          <div className="absolute w-4 h-4 bg-white animate-ping opacity-75" style={{ imageRendering: 'pixelated' }}></div>
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
        ${isSelected ? 'drop-shadow-2xl' : 'drop-shadow-lg'}
      `}
      style={{ 
        imageRendering: 'pixelated',
        filter: isSelected ? 'brightness(1.3) contrast(1.2) saturate(1.1)' : 'brightness(1.1) contrast(1.05)'
      }}
    >
      {getClassicPixelPiece(piece)}
    </div>
  );
};

export default PixelPiece;