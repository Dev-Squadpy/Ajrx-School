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

  const getUltraClassicPiece = (piece: ChessPieceType): JSX.Element => {
    const isWhite = piece.color === 'white';
    // Colores más contrastantes - las blancas ahora son gris medio para diferenciarse del tablero
    const baseColor = isWhite ? '#8B8B8B' : '#2F1B14';
    const shadowColor = isWhite ? '#5A5A5A' : '#1A0F0A';
    const highlightColor = isWhite ? '#B8B8B8' : '#4A3426';
    const darkColor = isWhite ? '#404040' : '#0D0806';
    const lightColor = isWhite ? '#D3D3D3' : '#6B4E37';

    const pieceStyle = {
      width: '44px',
      height: '44px',
      position: 'relative' as const,
      imageRendering: 'pixelated' as const,
    };

    switch (piece.type) {
      case 'pawn':
        return (
          <div style={pieceStyle}>
            <svg width="44" height="44" viewBox="0 0 44 44" style={{ imageRendering: 'pixelated' }}>
              {/* Base clásica más ancha */}
              <rect x="6" y="36" width="32" height="6" fill={shadowColor} stroke={darkColor} strokeWidth="1" />
              <rect x="8" y="34" width="28" height="4" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Cuerpo del peón */}
              <rect x="16" y="22" width="12" height="14" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              <rect x="18" y="20" width="8" height="4" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Cabeza redonda clásica */}
              <rect x="18" y="14" width="8" height="8" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              <rect x="20" y="12" width="4" height="4" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="19" y="13" width="6" height="6" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Detalles de sombreado */}
              <rect x="17" y="23" width="2" height="12" fill={shadowColor} />
              <rect x="19" y="15" width="2" height="6" fill={shadowColor} />
            </svg>
          </div>
        );

      case 'rook':
        return (
          <div style={pieceStyle}>
            <svg width="44" height="44" viewBox="0 0 44 44" style={{ imageRendering: 'pixelated' }}>
              {/* Base sólida */}
              <rect x="4" y="36" width="36" height="6" fill={shadowColor} stroke={darkColor} strokeWidth="1" />
              <rect x="6" y="34" width="32" height="4" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Cuerpo de la torre */}
              <rect x="12" y="18" width="20" height="18" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Almenas clásicas */}
              <rect x="10" y="8" width="24" height="12" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Merlones (almenas individuales) */}
              <rect x="12" y="6" width="4" height="6" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              <rect x="20" y="6" width="4" height="6" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              <rect x="28" y="6" width="4" height="6" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Ventanas de la torre */}
              <rect x="18" y="22" width="8" height="10" fill={shadowColor} stroke={darkColor} strokeWidth="1" />
              <rect x="20" y="24" width="4" height="6" fill={darkColor} />
              
              {/* Detalles de sombreado */}
              <rect x="11" y="19" width="2" height="16" fill={shadowColor} />
              <rect x="31" y="19" width="2" height="16" fill={highlightColor} />
            </svg>
          </div>
        );

      case 'knight':
        return (
          <div style={pieceStyle}>
            <svg width="44" height="44" viewBox="0 0 44 44" style={{ imageRendering: 'pixelated' }}>
              {/* Base */}
              <rect x="4" y="36" width="36" height="6" fill={shadowColor} stroke={darkColor} strokeWidth="1" />
              <rect x="6" y="34" width="32" height="4" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Cuello del caballo */}
              <rect x="12" y="26" width="20" height="10" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Cabeza del caballo - perfil clásico */}
              <rect x="16" y="18" width="16" height="10" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              <rect x="20" y="14" width="12" height="6" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              <rect x="24" y="10" width="8" height="6" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Hocico */}
              <rect x="28" y="16" width="6" height="4" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              <rect x="32" y="18" width="2" height="2" fill={darkColor} />
              
              {/* Crin clásica */}
              <rect x="14" y="16" width="4" height="8" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="18" y="12" width="4" height="8" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="22" y="8" width="4" height="8" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Ojo */}
              <rect x="26" y="16" width="2" height="2" fill={darkColor} />
              <rect x="27" y="17" width="1" height="1" fill={lightColor} />
              
              {/* Oreja */}
              <rect x="24" y="12" width="2" height="4" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Sombreado */}
              <rect x="13" y="27" width="2" height="8" fill={shadowColor} />
              <rect x="17" y="19" width="2" height="8" fill={shadowColor} />
            </svg>
          </div>
        );

      case 'bishop':
        return (
          <div style={pieceStyle}>
            <svg width="44" height="44" viewBox="0 0 44 44" style={{ imageRendering: 'pixelated' }}>
              {/* Base */}
              <rect x="4" y="36" width="36" height="6" fill={shadowColor} stroke={darkColor} strokeWidth="1" />
              <rect x="6" y="34" width="32" height="4" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Cuerpo del alfil */}
              <rect x="12" y="22" width="20" height="14" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              <rect x="14" y="18" width="16" height="6" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              <rect x="16" y="14" width="12" height="6" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Mitra episcopal clásica */}
              <rect x="18" y="10" width="8" height="6" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              <rect x="20" y="8" width="4" height="4" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Cruz episcopal en la parte superior */}
              <rect x="21" y="4" width="2" height="6" fill={lightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="19" y="5" width="6" height="2" fill={lightColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Ranura diagonal clásica */}
              <rect x="20" y="20" width="4" height="2" fill={darkColor} />
              <rect x="18" y="22" width="2" height="2" fill={darkColor} />
              <rect x="24" y="22" width="2" height="2" fill={darkColor} />
              
              {/* Detalles ornamentales */}
              <rect x="19" y="16" width="6" height="2" fill={highlightColor} />
              
              {/* Sombreado */}
              <rect x="13" y="23" width="2" height="12" fill={shadowColor} />
              <rect x="29" y="23" width="2" height="12" fill={highlightColor} />
            </svg>
          </div>
        );

      case 'queen':
        return (
          <div style={pieceStyle}>
            <svg width="44" height="44" viewBox="0 0 44 44" style={{ imageRendering: 'pixelated' }}>
              {/* Base real */}
              <rect x="2" y="36" width="40" height="6" fill={shadowColor} stroke={darkColor} strokeWidth="1" />
              <rect x="4" y="34" width="36" height="4" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Cuerpo de la reina */}
              <rect x="8" y="20" width="28" height="16" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              <rect x="10" y="16" width="24" height="6" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Base de la corona */}
              <rect x="6" y="12" width="32" height="6" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Corona con múltiples puntas - muy clásica */}
              <rect x="8" y="6" width="4" height="8" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="14" y="4" width="4" height="10" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="20" y="2" width="4" height="12" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="26" y="4" width="4" height="10" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="32" y="6" width="4" height="8" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Joyas en la corona */}
              <rect x="9" y="8" width="2" height="2" fill={lightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="15" y="6" width="2" height="2" fill={lightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="21" y="4" width="2" height="2" fill={lightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="27" y="6" width="2" height="2" fill={lightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="33" y="8" width="2" height="2" fill={lightColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Detalles ornamentales */}
              <rect x="16" y="22" width="12" height="4" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="18" y="26" width="8" height="2" fill={lightColor} />
              
              {/* Sombreado */}
              <rect x="7" y="21" width="2" height="14" fill={shadowColor} />
              <rect x="35" y="21" width="2" height="14" fill={highlightColor} />
            </svg>
          </div>
        );

      case 'king':
        return (
          <div style={pieceStyle}>
            <svg width="44" height="44" viewBox="0 0 44 44" style={{ imageRendering: 'pixelated' }}>
              {/* Base real */}
              <rect x="2" y="36" width="40" height="6" fill={shadowColor} stroke={darkColor} strokeWidth="1" />
              <rect x="4" y="34" width="36" height="4" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Cuerpo del rey */}
              <rect x="8" y="20" width="28" height="16" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              <rect x="10" y="16" width="24" height="6" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Base de la corona */}
              <rect x="6" y="12" width="32" height="6" fill={baseColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Corona real clásica */}
              <rect x="10" y="8" width="6" height="6" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="19" y="6" width="6" height="8" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="28" y="8" width="6" height="6" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Cruz real en la parte superior */}
              <rect x="21" y="2" width="2" height="8" fill={lightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="18" y="3" width="8" height="2" fill={lightColor} stroke={darkColor} strokeWidth="1" />
              
              {/* Detalles reales */}
              <rect x="12" y="10" width="2" height="2" fill={lightColor} />
              <rect x="21" y="8" width="2" height="2" fill={lightColor} />
              <rect x="30" y="10" width="2" height="2" fill={lightColor} />
              
              {/* Banda real */}
              <rect x="14" y="22" width="16" height="4" fill={highlightColor} stroke={darkColor} strokeWidth="1" />
              <rect x="16" y="26" width="12" height="2" fill={lightColor} />
              
              {/* Sombreado */}
              <rect x="7" y="21" width="2" height="14" fill={shadowColor} />
              <rect x="35" y="21" width="2" height="14" fill={highlightColor} />
            </svg>
          </div>
        );

      default:
        return <div style={{width: '44px', height: '44px', backgroundColor: baseColor, border: `2px solid ${darkColor}`}} />;
    }
  };

  const explodePiece = () => {
    setIsExploding(true);
    
    // Generate pixel fragments with new colors
    const colors = piece.color === 'white' 
      ? ['#8B8B8B', '#5A5A5A', '#B8B8B8', '#404040', '#D3D3D3'] 
      : ['#2F1B14', '#1A0F0A', '#4A3426', '#0D0806', '#6B4E37'];
    
    const newFragments = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
      rotation: Math.random() * 360,
      scale: 0.3 + Math.random() * 0.7,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setFragments(newFragments);

    setTimeout(() => {
      setIsExploding(false);
      setFragments([]);
    }, 1800);
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
            className="absolute w-2 h-2 transition-all duration-1800 ease-out"
            style={{
              backgroundColor: fragment.color,
              transform: `translate(${fragment.x}px, ${fragment.y}px) rotate(${fragment.rotation}deg) scale(${fragment.scale})`,
              opacity: 0,
              imageRendering: 'pixelated',
              border: '1px solid rgba(0,0,0,0.4)',
            }}
          />
        ))}
        
        {/* Epic explosion effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-yellow-300 animate-ping opacity-75" style={{ imageRendering: 'pixelated' }}></div>
          <div className="absolute w-16 h-16 bg-orange-400 animate-ping opacity-60" style={{ imageRendering: 'pixelated' }}></div>
          <div className="absolute w-12 h-12 bg-red-400 animate-ping opacity-45" style={{ imageRendering: 'pixelated' }}></div>
          <div className="absolute w-8 h-8 bg-white animate-ping opacity-80" style={{ imageRendering: 'pixelated' }}></div>
          <div className="absolute w-4 h-4 bg-blue-300 animate-ping opacity-60" style={{ imageRendering: 'pixelated' }}></div>
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
        filter: isSelected 
          ? 'brightness(1.4) contrast(1.3) saturate(1.2) drop-shadow(0 0 8px rgba(255,255,0,0.8))' 
          : 'brightness(1.1) contrast(1.1) saturate(1.05)'
      }}
    >
      {getUltraClassicPiece(piece)}
    </div>
  );
};

export default PixelPiece;