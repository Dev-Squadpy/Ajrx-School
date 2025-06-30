import React from 'react';
import { GameState } from '../types/chess';
import { getPieceSymbol } from '../utils/pieceSymbols';
import { RotateCcw, Crown, AlertTriangle, Users, Zap, Bot, User } from 'lucide-react';

interface GameStatusProps {
  gameState: GameState;
  onReset: () => void;
  isThinking?: boolean;
}

const GameStatus: React.FC<GameStatusProps> = ({ gameState, onReset, isThinking = false }) => {
  const { currentPlayer, gameStatus, moveHistory, capturedPieces } = gameState;

  const getStatusMessage = () => {
    if (isThinking) {
      return (
        <div className="flex items-center gap-2 text-blue-400 animate-pulse">
          <Bot className="w-6 h-6 animate-spin" />
          <span className="font-bold text-lg">BOT PENSANDO...</span>
          <Zap className="w-5 h-5 animate-bounce" />
        </div>
      );
    }

    switch (gameStatus) {
      case 'check':
        return (
          <div className="flex items-center gap-2 text-yellow-400 animate-pulse">
            <AlertTriangle className="w-6 h-6" />
            <span className="font-bold text-lg">¡JAQUE!</span>
            <Zap className="w-5 h-5 animate-bounce" />
          </div>
        );
      case 'checkmate':
        const winner = currentPlayer === 'white' ? 'BOT (NEGRAS)' : 'JUGADOR (BLANCAS)';
        return (
          <div className="flex items-center gap-2 text-green-400 animate-bounce">
            <Crown className="w-6 h-6" />
            <span className="font-bold text-lg">¡JAQUE MATE! GANA {winner}</span>
            <Crown className="w-6 h-6" />
          </div>
        );
      case 'stalemate':
        return (
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="w-6 h-6" />
            <span className="font-bold text-lg">TABLAS POR AHOGADO</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-3">
            {currentPlayer === 'white' ? (
              <User className="w-6 h-6 text-blue-400" />
            ) : (
              <Bot className="w-6 h-6 text-red-400" />
            )}
            <div className={`w-6 h-6 border-4 ${currentPlayer === 'white' ? 'bg-gray-100 border-gray-400' : 'bg-gray-800 border-gray-600'} animate-pulse`} style={{ imageRendering: 'pixelated' }}></div>
            <span className="font-bold text-lg text-green-400" style={{ fontFamily: 'monospace' }}>
              TURNO: {currentPlayer === 'white' ? 'JUGADOR' : 'BOT'}
            </span>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-900 border-4 border-gray-700 shadow-2xl p-6 space-y-6" style={{ imageRendering: 'pixelated' }}>
      {/* Game Status */}
      <div className="text-center bg-gray-800 border-2 border-gray-600 p-4">
        <h2 className="text-2xl font-bold text-green-400 mb-4" style={{ fontFamily: 'monospace' }}>
          PIXEL CHESS VS BOT
        </h2>
        {getStatusMessage()}
      </div>

      {/* Player Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 border-2 border-blue-500 p-3 text-center">
          <User className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-blue-400 font-bold" style={{ fontFamily: 'monospace' }}>
            JUGADOR
          </div>
          <div className="text-xs text-gray-400" style={{ fontFamily: 'monospace' }}>
            BLANCAS
          </div>
        </div>
        <div className="bg-gray-800 border-2 border-red-500 p-3 text-center">
          <Bot className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <div className="text-red-400 font-bold" style={{ fontFamily: 'monospace' }}>
            BOT
          </div>
          <div className="text-xs text-gray-400" style={{ fontFamily: 'monospace' }}>
            NEGRAS
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 border-4 border-red-800 hover:border-red-600 text-white font-bold py-4 px-4 transition-all duration-200 transform hover:scale-105 active:scale-95"
        style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
      >
        <RotateCcw className="w-6 h-6" />
        NUEVA PARTIDA
      </button>

      {/* Captured Pieces */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-green-400 border-b-2 border-green-400 pb-2" style={{ fontFamily: 'monospace' }}>
          PIEZAS DESTRUIDAS
        </h3>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold text-blue-400 mb-2" style={{ fontFamily: 'monospace' }}>
              JUGADOR ELIMINÓ:
            </h4>
            <div className="flex flex-wrap gap-2 min-h-[3rem] p-3 bg-gray-800 border-2 border-gray-600">
              {capturedPieces.black.map((piece, index) => (
                <span 
                  key={index} 
                  className="text-2xl opacity-60 hover:opacity-100 transition-opacity animate-pulse"
                  style={{ 
                    fontFamily: 'monospace',
                    imageRendering: 'pixelated',
                    textShadow: '2px 2px 0px #000, -2px -2px 0px #000'
                  }}
                >
                  {getPieceSymbol(piece)}
                </span>
              ))}
              {capturedPieces.black.length === 0 && (
                <span className="text-gray-500 text-sm" style={{ fontFamily: 'monospace' }}>
                  NINGUNA
                </span>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-red-400 mb-2" style={{ fontFamily: 'monospace' }}>
              BOT ELIMINÓ:
            </h4>
            <div className="flex flex-wrap gap-2 min-h-[3rem] p-3 bg-gray-800 border-2 border-gray-600">
              {capturedPieces.white.map((piece, index) => (
                <span 
                  key={index} 
                  className="text-2xl opacity-60 hover:opacity-100 transition-opacity animate-pulse"
                  style={{ 
                    fontFamily: 'monospace',
                    imageRendering: 'pixelated',
                    textShadow: '2px 2px 0px #fff, -2px -2px 0px #fff'
                  }}
                >
                  {getPieceSymbol(piece)}
                </span>
              ))}
              {capturedPieces.white.length === 0 && (
                <span className="text-gray-500 text-sm" style={{ fontFamily: 'monospace' }}>
                  NINGUNA
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Move History */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-green-400 border-b-2 border-green-400 pb-2" style={{ fontFamily: 'monospace' }}>
          HISTORIAL DE BATALLA
        </h3>
        <div className="max-h-40 overflow-y-auto bg-gray-800 border-2 border-gray-600 p-3 space-y-1">
          {moveHistory.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4" style={{ fontFamily: 'monospace' }}>
              LA BATALLA NO HA COMENZADO
            </p>
          ) : (
            moveHistory.slice(-10).map((move, index) => (
              <div key={index} className="text-sm flex items-center gap-2 py-1 hover:bg-gray-700 px-2 transition-colors">
                <span className="font-bold text-green-400 min-w-[2rem]" style={{ fontFamily: 'monospace' }}>
                  {moveHistory.length - 10 + index + 1}.
                </span>
                <span className="text-xl" style={{ imageRendering: 'pixelated' }}>
                  {getPieceSymbol(move.piece)}
                </span>
                <span className="text-gray-300" style={{ fontFamily: 'monospace' }}>
                  {String.fromCharCode(97 + move.from.col)}{8 - move.from.row} → {String.fromCharCode(97 + move.to.col)}{8 - move.to.row}
                </span>
                {move.capturedPiece && (
                  <>
                    <span className="text-red-400 font-bold" style={{ fontFamily: 'monospace' }}>
                      DESTRUYE
                    </span>
                    <span className="text-xl opacity-60" style={{ imageRendering: 'pixelated' }}>
                      {getPieceSymbol(move.capturedPiece)}
                    </span>
                  </>
                )}
                {move.isCheck && (
                  <span className="text-yellow-400 font-bold animate-pulse" style={{ fontFamily: 'monospace' }}>
                    JAQUE!
                  </span>
                )}
                {move.isCheckmate && (
                  <span className="text-red-400 font-bold animate-bounce" style={{ fontFamily: 'monospace' }}>
                    MATE!
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GameStatus;