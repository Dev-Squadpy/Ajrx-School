import { useState, useCallback, useEffect } from 'react';
import { GameState, Position, Move, ChessPiece } from '../types/chess';
import {
  initialBoard,
  getPossibleMoves,
  isInCheck,
  wouldBeInCheck,
  isCheckmate,
  isStalemate,
  isSamePosition
} from '../utils/chessLogic';
import { ChessBot } from '../utils/chessBot';

export const useChessGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: initialBoard(),
    currentPlayer: 'white',
    selectedSquare: null,
    validMoves: [],
    gameStatus: 'playing',
    moveHistory: [],
    capturedPieces: { white: [], black: [] }
  });

  const [captureAnimation, setCaptureAnimation] = useState<Position | null>(null);
  const [bot] = useState(new ChessBot('medium'));
  const [isThinking, setIsThinking] = useState(false);

  const selectSquare = useCallback((position: Position) => {
    if (gameState.currentPlayer === 'black' || isThinking) {
      return; // Don't allow moves during bot's turn
    }

    setGameState(prevState => {
      const piece = prevState.board[position.row][position.col];

      // If no piece is selected
      if (!prevState.selectedSquare) {
        if (piece && piece.color === prevState.currentPlayer) {
          const possibleMoves = getPossibleMoves(piece, position, prevState.board);
          const validMoves = possibleMoves.filter(
            move => !wouldBeInCheck(prevState.board, position, move, prevState.currentPlayer)
          );

          return {
            ...prevState,
            selectedSquare: position,
            validMoves
          };
        }
        return prevState;
      }

      // If clicking the same square, deselect
      if (isSamePosition(prevState.selectedSquare, position)) {
        return {
          ...prevState,
          selectedSquare: null,
          validMoves: []
        };
      }

      // If selecting a different piece of the same color
      if (piece && piece.color === prevState.currentPlayer) {
        const possibleMoves = getPossibleMoves(piece, position, prevState.board);
        const validMoves = possibleMoves.filter(
          move => !wouldBeInCheck(prevState.board, position, move, prevState.currentPlayer)
        );

        return {
          ...prevState,
          selectedSquare: position,
          validMoves
        };
      }

      // Check if the move is valid
      const isValidMove = prevState.validMoves.some(move => 
        isSamePosition(move, position)
      );

      if (!isValidMove) {
        return {
          ...prevState,
          selectedSquare: null,
          validMoves: []
        };
      }

      // If there's a piece to capture, trigger explosion animation
      if (prevState.board[position.row][position.col]) {
        setCaptureAnimation(position);
        setTimeout(() => setCaptureAnimation(null), 1200);
      }

      // Make the move
      return makeMove(prevState, prevState.selectedSquare, position);
    });
  }, [gameState.currentPlayer, isThinking]);

  const makeMove = (
    state: GameState,
    from: Position,
    to: Position
  ): GameState => {
    const newBoard = state.board.map(row => [...row]);
    const movingPiece = newBoard[from.row][from.col]!;
    const capturedPiece = newBoard[to.row][to.col];

    // Move the piece
    newBoard[to.row][to.col] = { ...movingPiece, hasMoved: true };
    newBoard[from.row][from.col] = null;

    // Update captured pieces
    const newCapturedPieces = { ...state.capturedPieces };
    if (capturedPiece) {
      newCapturedPieces[capturedPiece.color].push(capturedPiece);
    }

    // Switch players
    const nextPlayer = state.currentPlayer === 'white' ? 'black' : 'white';

    // Check game status
    let gameStatus: GameState['gameStatus'] = 'playing';
    if (isInCheck(newBoard, nextPlayer)) {
      if (isCheckmate(newBoard, nextPlayer)) {
        gameStatus = 'checkmate';
      } else {
        gameStatus = 'check';
      }
    } else if (isStalemate(newBoard, nextPlayer)) {
      gameStatus = 'stalemate';
    }

    // Create move record
    const move: Move = {
      from,
      to,
      piece: movingPiece,
      capturedPiece,
      isCheck: gameStatus === 'check',
      isCheckmate: gameStatus === 'checkmate'
    };

    return {
      board: newBoard,
      currentPlayer: nextPlayer,
      selectedSquare: null,
      validMoves: [],
      gameStatus,
      moveHistory: [...state.moveHistory, move],
      capturedPieces: newCapturedPieces
    };
  };

  // Bot move logic
  useEffect(() => {
    if (gameState.currentPlayer === 'black' && gameState.gameStatus === 'playing') {
      setIsThinking(true);
      
      // Add delay to make bot thinking visible
      const thinkingTime = 1000 + Math.random() * 2000; // 1-3 seconds
      
      setTimeout(() => {
        const botMove = bot.getBestMove(gameState);
        
        if (botMove) {
          // Check if bot is capturing a piece
          if (gameState.board[botMove.to.row][botMove.to.col]) {
            setCaptureAnimation(botMove.to);
            setTimeout(() => setCaptureAnimation(null), 1200);
          }
          
          setGameState(prevState => makeMove(prevState, botMove.from, botMove.to));
        }
        
        setIsThinking(false);
      }, thinkingTime);
    }
  }, [gameState.currentPlayer, gameState.gameStatus, bot]);

  const resetGame = useCallback(() => {
    setGameState({
      board: initialBoard(),
      currentPlayer: 'white',
      selectedSquare: null,
      validMoves: [],
      gameStatus: 'playing',
      moveHistory: [],
      capturedPieces: { white: [], black: [] }
    });
    setCaptureAnimation(null);
    setIsThinking(false);
  }, []);

  return {
    gameState,
    selectSquare,
    resetGame,
    captureAnimation,
    isThinking
  };
};