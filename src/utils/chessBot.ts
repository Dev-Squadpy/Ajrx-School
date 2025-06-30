import { ChessPiece, Position, GameState } from '../types/chess';
import { 
  getPossibleMoves, 
  wouldBeInCheck, 
  isInCheck,
  getAllValidMoves 
} from './chessLogic';

interface MoveEvaluation {
  from: Position;
  to: Position;
  score: number;
}

// Piece values for evaluation
const PIECE_VALUES = {
  pawn: 100,
  knight: 320,
  bishop: 330,
  rook: 500,
  queen: 900,
  king: 20000
};

// Position bonus tables (simplified)
const PAWN_TABLE = [
  [0,  0,  0,  0,  0,  0,  0,  0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5,  5, 10, 25, 25, 10,  5,  5],
  [0,  0,  0, 20, 20,  0,  0,  0],
  [5, -5,-10,  0,  0,-10, -5,  5],
  [5, 10, 10,-20,-20, 10, 10,  5],
  [0,  0,  0,  0,  0,  0,  0,  0]
];

const KNIGHT_TABLE = [
  [-50,-40,-30,-30,-30,-30,-40,-50],
  [-40,-20,  0,  0,  0,  0,-20,-40],
  [-30,  0, 10, 15, 15, 10,  0,-30],
  [-30,  5, 15, 20, 20, 15,  5,-30],
  [-30,  0, 15, 20, 20, 15,  0,-30],
  [-30,  5, 10, 15, 15, 10,  5,-30],
  [-40,-20,  0,  5,  5,  0,-20,-40],
  [-50,-40,-30,-30,-30,-30,-40,-50]
];

export class ChessBot {
  private difficulty: 'easy' | 'medium' | 'hard';

  constructor(difficulty: 'easy' | 'medium' | 'hard' = 'medium') {
    this.difficulty = difficulty;
  }

  public getBestMove(gameState: GameState): { from: Position; to: Position } | null {
    const validMoves = this.getAllPossibleMoves(gameState.board, 'black');
    
    if (validMoves.length === 0) {
      return null;
    }

    switch (this.difficulty) {
      case 'easy':
        return this.getRandomMove(validMoves);
      case 'medium':
        return this.getMediumMove(gameState, validMoves);
      case 'hard':
        return this.getHardMove(gameState, validMoves);
      default:
        return this.getMediumMove(gameState, validMoves);
    }
  }

  private getAllPossibleMoves(board: (ChessPiece | null)[][], color: 'white' | 'black'): MoveEvaluation[] {
    const moves: MoveEvaluation[] = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === color) {
          const from = { row, col };
          const possibleMoves = getPossibleMoves(piece, from, board);
          
          for (const to of possibleMoves) {
            if (!wouldBeInCheck(board, from, to, color)) {
              moves.push({
                from,
                to,
                score: this.evaluateMove(board, from, to)
              });
            }
          }
        }
      }
    }

    return moves;
  }

  private getRandomMove(moves: MoveEvaluation[]): { from: Position; to: Position } {
    const randomIndex = Math.floor(Math.random() * moves.length);
    const move = moves[randomIndex];
    return { from: move.from, to: move.to };
  }

  private getMediumMove(gameState: GameState, moves: MoveEvaluation[]): { from: Position; to: Position } {
    // Sort moves by score and add some randomness
    moves.sort((a, b) => b.score - a.score);
    
    // Take top 30% of moves and choose randomly from them
    const topMoves = moves.slice(0, Math.max(1, Math.floor(moves.length * 0.3)));
    const randomIndex = Math.floor(Math.random() * topMoves.length);
    const move = topMoves[randomIndex];
    
    return { from: move.from, to: move.to };
  }

  private getHardMove(gameState: GameState, moves: MoveEvaluation[]): { from: Position; to: Position } {
    // Use minimax with alpha-beta pruning (simplified version)
    let bestMove = moves[0];
    let bestScore = -Infinity;

    for (const move of moves) {
      const score = this.minimax(gameState.board, move.from, move.to, 2, false, -Infinity, Infinity);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return { from: bestMove.from, to: bestMove.to };
  }

  private minimax(
    board: (ChessPiece | null)[][],
    from: Position,
    to: Position,
    depth: number,
    isMaximizing: boolean,
    alpha: number,
    beta: number
  ): number {
    if (depth === 0) {
      return this.evaluatePosition(board);
    }

    // Make the move
    const newBoard = board.map(row => [...row]);
    const piece = newBoard[from.row][from.col];
    newBoard[to.row][to.col] = piece;
    newBoard[from.row][from.col] = null;

    if (isMaximizing) {
      let maxEval = -Infinity;
      const moves = this.getAllPossibleMoves(newBoard, 'black');
      
      for (const move of moves) {
        const eval = this.minimax(newBoard, move.from, move.to, depth - 1, false, alpha, beta);
        maxEval = Math.max(maxEval, eval);
        alpha = Math.max(alpha, eval);
        if (beta <= alpha) break;
      }
      
      return maxEval;
    } else {
      let minEval = Infinity;
      const moves = this.getAllPossibleMoves(newBoard, 'white');
      
      for (const move of moves) {
        const eval = this.minimax(newBoard, move.from, move.to, depth - 1, true, alpha, beta);
        minEval = Math.min(minEval, eval);
        beta = Math.min(beta, eval);
        if (beta <= alpha) break;
      }
      
      return minEval;
    }
  }

  private evaluateMove(board: (ChessPiece | null)[][], from: Position, to: Position): number {
    let score = 0;
    
    // Capture bonus
    const capturedPiece = board[to.row][to.col];
    if (capturedPiece) {
      score += PIECE_VALUES[capturedPiece.type];
    }

    // Position bonus
    const piece = board[from.row][from.col]!;
    score += this.getPositionBonus(piece, to);

    // Center control bonus
    if (to.row >= 3 && to.row <= 4 && to.col >= 3 && to.col <= 4) {
      score += 10;
    }

    return score;
  }

  private evaluatePosition(board: (ChessPiece | null)[][]): number {
    let score = 0;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece) {
          const pieceValue = PIECE_VALUES[piece.type];
          const positionBonus = this.getPositionBonus(piece, { row, col });
          
          if (piece.color === 'black') {
            score += pieceValue + positionBonus;
          } else {
            score -= pieceValue + positionBonus;
          }
        }
      }
    }

    return score;
  }

  private getPositionBonus(piece: ChessPiece, position: Position): number {
    const { row, col } = position;
    
    switch (piece.type) {
      case 'pawn':
        return piece.color === 'black' ? PAWN_TABLE[row][col] : PAWN_TABLE[7-row][col];
      case 'knight':
        return piece.color === 'black' ? KNIGHT_TABLE[row][col] : KNIGHT_TABLE[7-row][col];
      default:
        return 0;
    }
  }
}