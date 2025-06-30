import { ChessPiece } from '../types/chess';

export const getPieceSymbol = (piece: ChessPiece): string => {
  const symbols = {
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

  return symbols[piece.color][piece.type];
};

export const getPieceName = (piece: ChessPiece): string => {
  const names = {
    king: 'Rey',
    queen: 'Reina',
    rook: 'Torre',
    bishop: 'Alfil',
    knight: 'Caballo',
    pawn: 'Peón'
  };

  return names[piece.type];
};