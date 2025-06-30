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
    const baseColor = isWhite ? '#F5F5DC' : '#8B4513';
    const shadowColor = isWhite ? '#D2B48C' : '#654321';
    const highlightColor = isWhite ? '#FFFACD' : '#A0522D';

    const pixelStyle = {
      width: '2px',
      height: '2px',
      display: 'inline-block',
      imageRendering: 'pixelated' as const,
    };

    switch (piece.type) {
      case 'pawn':
        return (
          <div className="grid grid-cols-8 gap-0" style={{ width: '16px', height: '16px' }}>
            {/* Row 1 */ Array(8).fill(0).map((_, i) => <div key={i} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {/* Row 2 */ Array(2).fill(0).map((_, i) => <div key={i+8} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(4).fill(0).map((_, i) => <div key={i+10} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(2).fill(0).map((_, i) => <div key={i+14} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {/* Row 3 */ Array(2).fill(0).map((_, i) => <div key={i+16} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(4).fill(0).map((_, i) => <div key={i+18} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(2).fill(0).map((_, i) => <div key={i+22} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {/* Row 4 */ Array(1).fill(0).map((_, i) => <div key={i+24} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(6).fill(0).map((_, i) => <div key={i+25} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(1).fill(0).map((_, i) => <div key={i+31} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {/* Row 5 */ Array(8).fill(0).map((_, i) => <div key={i+32} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {/* Row 6 */ Array(8).fill(0).map((_, i) => <div key={i+40} style={{...pixelStyle, backgroundColor: shadowColor}} />)}
          </div>
        );
      
      case 'rook':
        return (
          <div className="grid grid-cols-8 gap-0" style={{ width: '16px', height: '16px' }}>
            {/* Castle battlements pattern */}
            {Array(8).fill(0).map((_, i) => <div key={i} style={{...pixelStyle, backgroundColor: i % 2 === 0 ? baseColor : 'transparent'}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+8} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(2).fill(0).map((_, i) => <div key={i+16} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(4).fill(0).map((_, i) => <div key={i+18} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(2).fill(0).map((_, i) => <div key={i+22} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(2).fill(0).map((_, i) => <div key={i+24} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(4).fill(0).map((_, i) => <div key={i+26} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(2).fill(0).map((_, i) => <div key={i+30} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+32} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+40} style={{...pixelStyle, backgroundColor: shadowColor}} />)}
          </div>
        );

      case 'knight':
        return (
          <div className="grid grid-cols-8 gap-0" style={{ width: '16px', height: '16px' }}>
            {/* Horse head pattern */}
            {Array(3).fill(0).map((_, i) => <div key={i} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(3).fill(0).map((_, i) => <div key={i+3} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(2).fill(0).map((_, i) => <div key={i+6} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(2).fill(0).map((_, i) => <div key={i+8} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(4).fill(0).map((_, i) => <div key={i+10} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(2).fill(0).map((_, i) => <div key={i+14} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(1).fill(0).map((_, i) => <div key={i+16} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(6).fill(0).map((_, i) => <div key={i+17} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(1).fill(0).map((_, i) => <div key={i+23} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+24} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+32} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+40} style={{...pixelStyle, backgroundColor: shadowColor}} />)}
          </div>
        );

      case 'bishop':
        return (
          <div className="grid grid-cols-8 gap-0" style={{ width: '16px', height: '16px' }}>
            {/* Bishop mitre pattern */}
            {Array(3).fill(0).map((_, i) => <div key={i} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(2).fill(0).map((_, i) => <div key={i+3} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(3).fill(0).map((_, i) => <div key={i+5} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(2).fill(0).map((_, i) => <div key={i+8} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(4).fill(0).map((_, i) => <div key={i+10} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(2).fill(0).map((_, i) => <div key={i+14} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(1).fill(0).map((_, i) => <div key={i+16} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(6).fill(0).map((_, i) => <div key={i+17} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(1).fill(0).map((_, i) => <div key={i+23} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+24} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+32} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+40} style={{...pixelStyle, backgroundColor: shadowColor}} />)}
          </div>
        );

      case 'queen':
        return (
          <div className="grid grid-cols-8 gap-0" style={{ width: '16px', height: '16px' }}>
            {/* Crown pattern */}
            {Array(8).fill(0).map((_, i) => <div key={i} style={{...pixelStyle, backgroundColor: i % 2 === 1 ? baseColor : 'transparent'}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+8} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(1).fill(0).map((_, i) => <div key={i+16} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(6).fill(0).map((_, i) => <div key={i+17} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(1).fill(0).map((_, i) => <div key={i+23} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+24} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+32} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+40} style={{...pixelStyle, backgroundColor: shadowColor}} />)}
          </div>
        );

      case 'king':
        return (
          <div className="grid grid-cols-8 gap-0" style={{ width: '16px', height: '16px' }}>
            {/* Cross crown pattern */}
            {Array(3).fill(0).map((_, i) => <div key={i} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(2).fill(0).map((_, i) => <div key={i+3} style={{...pixelStyle, backgroundColor: highlightColor}} />)}
            {Array(3).fill(0).map((_, i) => <div key={i+5} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+8} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(1).fill(0).map((_, i) => <div key={i+16} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(6).fill(0).map((_, i) => <div key={i+17} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(1).fill(0).map((_, i) => <div key={i+23} style={{...pixelStyle, backgroundColor: 'transparent'}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+24} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+32} style={{...pixelStyle, backgroundColor: baseColor}} />)}
            {Array(8).fill(0).map((_, i) => <div key={i+40} style={{...pixelStyle, backgroundColor: shadowColor}} />)}
          </div>
        );

      default:
        return <div style={{width: '16px', height: '16px', backgroundColor: baseColor}} />;
    }
  };

  const explodePiece = () => {
    setIsExploding(true);
    
    // Generate pixel fragments
    const colors = piece.color === 'white' 
      ? ['#F5F5DC', '#D2B48C', '#FFFACD'] 
      : ['#8B4513', '#654321', '#A0522D'];
    
    const newFragments = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 150,
      y: (Math.random() - 0.5) * 150,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
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
            className="absolute w-1 h-1 transition-all duration-1000 ease-out"
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
          <div className="w-8 h-8 bg-yellow-300 animate-ping opacity-75" style={{ imageRendering: 'pixelated' }}></div>
          <div className="absolute w-6 h-6 bg-orange-400 animate-ping opacity-50" style={{ imageRendering: 'pixelated' }}></div>
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
      `}
      style={{ imageRendering: 'pixelated' }}
    >
      {getPixelArt(piece)}
    </div>
  );
};

export default PixelPiece;