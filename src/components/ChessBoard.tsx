import React from 'react';
import { GameState, Position } from '../types/chess';
import { isSamePosition } from '../utils/chessLogic';
import PixelPiece from './PixelPiece';

interface ChessBoardProps {
  gameState: GameState;
  onSquareClick: (position: Position) => void;
  captureAnimation?: Position | null;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ gameState, onSquareClick, captureAnimation }) => {
  const { board, selectedSquare, validMoves } = gameState;

  const isSquareSelected = (row: number, col: number): boolean => {
    return selectedSquare ? isSamePosition(selectedSquare, { row, col }) : false;
  };

  const isValidMove = (row: number, col: number): boolean => {
    return validMoves.some(move => isSamePosition(move, { row, col }));
  };

  const isBeingCaptured = (row: number, col: number): boolean => {
    return captureAnimation ? isSamePosition(captureAnimation, { row, col }) : false;
  };

  const getSquareClasses = (row: number, col: number): string => {
    const baseClasses = 'w-12 h-12 flex items-center justify-center relative cursor-pointer transition-all duration-200 ease-in-out';
    const colorClass = (row + col) % 2 === 0 
      ? 'bg-amber-100' 
      : 'bg-purple-300';
    
    let additionalClasses = '';
    
    if (isSquareSelected(row, col)) {
      additionalClasses += ' ring-2 ring-red-500 ring-opacity-80';
    }
    
    if (isValidMove(row, col)) {
      const hasPiece = board[row][col] !== null;
      if (hasPiece) {
        additionalClasses += ' ring-2 ring-red-400 ring-opacity-80';
      } else {
        additionalClasses += ' after:absolute after:w-2 after:h-2 after:bg-green-500 after:animate-pulse';
      }
    }

    return `${baseClasses} ${colorClass} ${additionalClasses}`;
  };

  return (
    <div className="inline-block border-4 border-gray-800 bg-gray-900 p-2" style={{ imageRendering: 'pixelated' }}>
      <div className="grid grid-cols-8 gap-0">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getSquareClasses(rowIndex, colIndex)}
              onClick={() => onSquareClick({ row: rowIndex, col: colIndex })}
              style={{ imageRendering: 'pixelated' }}
            >
              {piece && (
                <PixelPiece
                  piece={piece}
                  isSelected={isSquareSelected(rowIndex, colIndex)}
                  position={{ row: rowIndex, col: colIndex }}
                  isBeingCaptured={isBeingCaptured(rowIndex, colIndex)}
                />
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Board coordinates */}
      <div className="flex justify-between px-1 py-1 text-xs font-bold text-green-400" style={{ fontFamily: 'monospace' }}>
        {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(letter => (
          <span key={letter}>{letter}</span>
        ))}
      </div>
      
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2 px-1">
        {[8, 7, 6, 5, 4, 3, 2, 1].map(number => (
          <span key={number} className="text-xs font-bold text-green-400 leading-none" style={{ fontFamily: 'monospace' }}>
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ChessBoard;