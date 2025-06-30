import { ChessPiece, Position, GameState, PieceType, PieceColor } from '../types/chess';

export const initialBoard = (): (ChessPiece | null)[][] => {
  const board: (ChessPiece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Place pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: 'pawn', color: 'black' };
    board[6][col] = { type: 'pawn', color: 'white' };
  }
  
  // Place other pieces
  const pieceOrder: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  
  for (let col = 0; col < 8; col++) {
    board[0][col] = { type: pieceOrder[col], color: 'black' };
    board[7][col] = { type: pieceOrder[col], color: 'white' };
  }
  
  return board;
};

export const isValidPosition = (pos: Position): boolean => {
  return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8;
};

export const isSamePosition = (pos1: Position, pos2: Position): boolean => {
  return pos1.row === pos2.row && pos1.col === pos2.col;
};

export const getPossibleMoves = (
  piece: ChessPiece,
  position: Position,
  board: (ChessPiece | null)[][]
): Position[] => {
  const moves: Position[] = [];
  const { row, col } = position;

  switch (piece.type) {
    case 'pawn':
      return getPawnMoves(piece, position, board);
    case 'rook':
      return getRookMoves(position, board, piece.color);
    case 'knight':
      return getKnightMoves(position, board, piece.color);
    case 'bishop':
      return getBishopMoves(position, board, piece.color);
    case 'queen':
      return getQueenMoves(position, board, piece.color);
    case 'king':
      return getKingMoves(position, board, piece.color);
    default:
      return moves;
  }
};

const getPawnMoves = (
  piece: ChessPiece,
  position: Position,
  board: (ChessPiece | null)[][]
): Position[] => {
  const moves: Position[] = [];
  const { row, col } = position;
  const direction = piece.color === 'white' ? -1 : 1;
  const startRow = piece.color === 'white' ? 6 : 1;

  // Move forward one square
  const oneStep = { row: row + direction, col };
  if (isValidPosition(oneStep) && !board[oneStep.row][oneStep.col]) {
    moves.push(oneStep);

    // Move forward two squares from starting position
    if (row === startRow) {
      const twoStep = { row: row + direction * 2, col };
      if (isValidPosition(twoStep) && !board[twoStep.row][twoStep.col]) {
        moves.push(twoStep);
      }
    }
  }

  // Capture diagonally
  const captureLeft = { row: row + direction, col: col - 1 };
  const captureRight = { row: row + direction, col: col + 1 };

  [captureLeft, captureRight].forEach(capturePos => {
    if (isValidPosition(capturePos)) {
      const targetPiece = board[capturePos.row][capturePos.col];
      if (targetPiece && targetPiece.color !== piece.color) {
        moves.push(capturePos);
      }
    }
  });

  return moves;
};

const getRookMoves = (
  position: Position,
  board: (ChessPiece | null)[][],
  color: PieceColor
): Position[] => {
  const moves: Position[] = [];
  const directions = [
    { row: 0, col: 1 },   // right
    { row: 0, col: -1 },  // left
    { row: 1, col: 0 },   // down
    { row: -1, col: 0 }   // up
  ];

  directions.forEach(dir => {
    for (let i = 1; i < 8; i++) {
      const newPos = {
        row: position.row + dir.row * i,
        col: position.col + dir.col * i
      };

      if (!isValidPosition(newPos)) break;

      const targetPiece = board[newPos.row][newPos.col];
      if (!targetPiece) {
        moves.push(newPos);
      } else {
        if (targetPiece.color !== color) {
          moves.push(newPos);
        }
        break;
      }
    }
  });

  return moves;
};

const getKnightMoves = (
  position: Position,
  board: (ChessPiece | null)[][],
  color: PieceColor
): Position[] => {
  const moves: Position[] = [];
  const knightMoves = [
    { row: -2, col: -1 }, { row: -2, col: 1 },
    { row: -1, col: -2 }, { row: -1, col: 2 },
    { row: 1, col: -2 },  { row: 1, col: 2 },
    { row: 2, col: -1 },  { row: 2, col: 1 }
  ];

  knightMoves.forEach(move => {
    const newPos = {
      row: position.row + move.row,
      col: position.col + move.col
    };

    if (isValidPosition(newPos)) {
      const targetPiece = board[newPos.row][newPos.col];
      if (!targetPiece || targetPiece.color !== color) {
        moves.push(newPos);
      }
    }
  });

  return moves;
};

const getBishopMoves = (
  position: Position,
  board: (ChessPiece | null)[][],
  color: PieceColor
): Position[] => {
  const moves: Position[] = [];
  const directions = [
    { row: 1, col: 1 },   // down-right
    { row: 1, col: -1 },  // down-left
    { row: -1, col: 1 },  // up-right
    { row: -1, col: -1 }  // up-left
  ];

  directions.forEach(dir => {
    for (let i = 1; i < 8; i++) {
      const newPos = {
        row: position.row + dir.row * i,
        col: position.col + dir.col * i
      };

      if (!isValidPosition(newPos)) break;

      const targetPiece = board[newPos.row][newPos.col];
      if (!targetPiece) {
        moves.push(newPos);
      } else {
        if (targetPiece.color !== color) {
          moves.push(newPos);
        }
        break;
      }
    }
  });

  return moves;
};

const getQueenMoves = (
  position: Position,
  board: (ChessPiece | null)[][],
  color: PieceColor
): Position[] => {
  return [
    ...getRookMoves(position, board, color),
    ...getBishopMoves(position, board, color)
  ];
};

const getKingMoves = (
  position: Position,
  board: (ChessPiece | null)[][],
  color: PieceColor
): Position[] => {
  const moves: Position[] = [];
  const directions = [
    { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
    { row: 0, col: -1 },                       { row: 0, col: 1 },
    { row: 1, col: -1 },  { row: 1, col: 0 },  { row: 1, col: 1 }
  ];

  directions.forEach(dir => {
    const newPos = {
      row: position.row + dir.row,
      col: position.col + dir.col
    };

    if (isValidPosition(newPos)) {
      const targetPiece = board[newPos.row][newPos.col];
      if (!targetPiece || targetPiece.color !== color) {
        moves.push(newPos);
      }
    }
  });

  return moves;
};

export const isInCheck = (
  board: (ChessPiece | null)[][],
  kingColor: PieceColor
): boolean => {
  // Find the king
  let kingPosition: Position | null = null;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === 'king' && piece.color === kingColor) {
        kingPosition = { row, col };
        break;
      }
    }
    if (kingPosition) break;
  }

  if (!kingPosition) return false;

  // Check if any opponent piece can attack the king
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color !== kingColor) {
        const possibleMoves = getPossibleMoves(piece, { row, col }, board);
        if (possibleMoves.some(move => isSamePosition(move, kingPosition!))) {
          return true;
        }
      }
    }
  }

  return false;
};

export const wouldBeInCheck = (
  board: (ChessPiece | null)[][],
  from: Position,
  to: Position,
  playerColor: PieceColor
): boolean => {
  // Create a copy of the board with the move applied
  const newBoard = board.map(row => [...row]);
  const piece = newBoard[from.row][from.col];
  
  newBoard[to.row][to.col] = piece;
  newBoard[from.row][from.col] = null;

  return isInCheck(newBoard, playerColor);
};

export const getAllValidMoves = (
  board: (ChessPiece | null)[][],
  playerColor: PieceColor
): { position: Position; moves: Position[] }[] => {
  const allMoves: { position: Position; moves: Position[] }[] = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === playerColor) {
        const position = { row, col };
        const possibleMoves = getPossibleMoves(piece, position, board);
        const validMoves = possibleMoves.filter(
          move => !wouldBeInCheck(board, position, move, playerColor)
        );
        
        if (validMoves.length > 0) {
          allMoves.push({ position, moves: validMoves });
        }
      }
    }
  }

  return allMoves;
};

export const isCheckmate = (
  board: (ChessPiece | null)[][],
  playerColor: PieceColor
): boolean => {
  if (!isInCheck(board, playerColor)) return false;
  
  const validMoves = getAllValidMoves(board, playerColor);
  return validMoves.length === 0;
};

export const isStalemate = (
  board: (ChessPiece | null)[][],
  playerColor: PieceColor
): boolean => {
  if (isInCheck(board, playerColor)) return false;
  
  const validMoves = getAllValidMoves(board, playerColor);
  return validMoves.length === 0;
};