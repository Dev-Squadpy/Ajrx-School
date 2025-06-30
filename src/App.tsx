import React from 'react';
import ChessBoard from './components/ChessBoard';
import GameStatus from './components/GameStatus';
import { useChessGame } from './hooks/useChessGame';

function App() {
  const { gameState, selectSquare, resetGame, captureAnimation, isThinking } = useChessGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4" style={{ imageRendering: 'pixelated' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-green-400 mb-2 animate-pulse" style={{ 
            fontFamily: 'monospace',
            imageRendering: 'pixelated',
            textShadow: '4px 4px 0px #000, -4px -4px 0px #000, 4px -4px 0px #000, -4px 4px 0px #000'
          }}>
            ♔ PIXEL CHESS ♛
          </h1>
          <p className="text-purple-300 text-lg border-2 border-purple-600 bg-purple-900 px-4 py-2 inline-block" style={{ fontFamily: 'monospace' }}>
            AJEDREZ RETRO VS BOT INTELIGENTE
          </p>
        </div>

        {/* Game Area */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
          {/* Chess Board */}
          <div className="relative">
            <ChessBoard 
              gameState={gameState} 
              onSquareClick={selectSquare}
              captureAnimation={captureAnimation}
            />
          </div>

          {/* Game Status Panel */}
          <div className="w-full lg:w-96">
            <GameStatus 
              gameState={gameState} 
              onReset={resetGame}
              isThinking={isThinking}
            />
          </div>
        </div>

        {/* Game Instructions */}
        <div className="mt-12 max-w-4xl mx-auto bg-gray-900 border-4 border-purple-700 p-6">
          <h2 className="text-3xl font-bold text-green-400 mb-4 text-center" style={{ fontFamily: 'monospace' }}>
            INSTRUCCIONES DE BATALLA
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div className="bg-gray-800 border-2 border-purple-600 p-4">
              <h3 className="font-bold text-green-400 mb-3" style={{ fontFamily: 'monospace' }}>
                CONTROLES:
              </h3>
              <ul className="space-y-2 text-sm" style={{ fontFamily: 'monospace' }}>
                <li>• CLICK EN PIEZA PARA SELECCIONAR</li>
                <li>• PUNTOS VERDES = MOVIMIENTOS VÁLIDOS</li>
                <li>• BORDES ROJOS = ENEMIGOS A DESTRUIR</li>
                <li>• LAS PIEZAS EXPLOTAN AL SER CAPTURADAS</li>
                <li>• JUEGAS CON LAS PIEZAS BLANCAS</li>
              </ul>
            </div>
            <div className="bg-gray-800 border-2 border-purple-600 p-4">
              <h3 className="font-bold text-green-400 mb-3" style={{ fontFamily: 'monospace' }}>
                CARACTERÍSTICAS:
              </h3>
              <ul className="space-y-2 text-sm" style={{ fontFamily: 'monospace' }}>
                <li>• BOT INTELIGENTE CON IA</li>
                <li>• GRÁFICOS PIXEL ART RETRO</li>
                <li>• EFECTOS DE DESTRUCCIÓN ÉPICOS</li>
                <li>• VALIDACIÓN COMPLETA DE MOVIMIENTOS</li>
                <li>• DETECCIÓN DE JAQUE Y JAQUE MATE</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="inline-block bg-purple-900 border-2 border-green-400 px-6 py-3 animate-pulse">
              <span className="text-green-400 font-bold text-lg" style={{ fontFamily: 'monospace' }}>
                ¡DERROTA AL BOT EN BATALLA PIXELEADA!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;