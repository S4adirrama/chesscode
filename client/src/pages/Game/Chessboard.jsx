import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import axios from 'axios';

const ChessBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [status, setStatus] = useState('White to move');
  const [thinking, setThinking] = useState(false);
  const [engineDepth, setEngineDepth] = useState(10);
  const [evaluation, setEvaluation] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);

  // Function to make a move
  const makeMove = (move) => {
    try {
      const gameCopy = new Chess(game.fen());
      const result = gameCopy.move(move);
      
      if (result) {
        setGame(gameCopy);
        
        // Add move to history
        const newHistory = [...moveHistory];
        if (newHistory.length === 0 || newHistory[newHistory.length - 1].includes('...')) {
          newHistory.push(`${gameCopy.moveNumber()}. ${result.san}`);
        } else {
          newHistory[newHistory.length - 1] += ` ... ${result.san}`;
        }
        setMoveHistory(newHistory);
        
        // Auto-analyze position after each move
        getEngineEvaluation(gameCopy);
        
        return true;
      }
      return false;
    } catch (e) {
      console.error("Invalid move:", e);
      return false;
    }
  };

  // Handle user move
  const onDrop = (sourceSquare, targetSquare) => {
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Always promote to queen for simplicity
    });

    return move;
  };

  // Get engine evaluation for the current position
  const getEngineEvaluation = async (currentGame = game) => {
    if (currentGame.isGameOver() || thinking) return;
    
    setThinking(true);
    try {
      const payload = { 
        fen: currentGame.fen(),
        depth: engineDepth
      };
      console.log("Requesting engine evaluation with payload:", payload);
      const response = await axios(`${import.meta.env.VITE_REACT_APP_API_URL}/api/stockfish`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        data: payload
      });
      const data = response.data;

      if (data) {
        setEvaluation({
          score: data.evaluation || 0,
          mate: data.mate,
          bestMove: data.bestmove?.split(' ')[1], // Remove 'bestmove' prefix
          continuation: data.continuation
        });
      } else {
        console.error("Engine error:", data);
      }
    } catch (error) {
      console.error("Failed to get engine evaluation:", error);
    } finally {
      setThinking(false);
    }
  };

  // Update game status text
  const updateGameStatus = (currentGame) => {
    if (currentGame.isGameOver()) {
      if (currentGame.isCheckmate()) {
        setStatus(`Checkmate! ${currentGame.turn() === 'w' ? 'Black' : 'White'} wins`);
      } else if (currentGame.isDraw()) {
        setStatus("Draw!");
      } else if (currentGame.isStalemate()) {
        setStatus("Stalemate!");
      } else {
        setStatus("Game Over!");
      }
    } else {
      if (currentGame.inCheck()) {
        setStatus(`Check! ${currentGame.turn() === 'w' ? 'White' : 'Black'} to move`);
      } else {
        setStatus(`${currentGame.turn() === 'w' ? 'White' : 'Black'} to move`);
      }
    }
  };

  // Manually request engine analysis
  const analyzePosition = () => {
    getEngineEvaluation();
  };

  // Reset the game
  const resetGame = () => {
    setGame(new Chess());
    setStatus('White to move');
    setEvaluation(null);
    setMoveHistory([]);
  };

  // Get engine evaluation whenever the game state changes
  useEffect(() => {
    if (!game.isGameOver()) {
      updateGameStatus(game);
    }
  }, [game]);

  // Format evaluation for display
  const formatEvaluation = () => {
    if (!evaluation) return "Make a move or click 'Analyze Position'";
    
    if (evaluation.mate !== null) {
      return `Mate in ${Math.abs(evaluation.mate)} for ${evaluation.mate > 0 ? 'White' : 'Black'}`;
    }
    
    // Convert to pawns
    const score = parseFloat(evaluation.score);
    const formattedScore = score.toFixed(2);
    return `Evaluation: ${formattedScore} (${formattedScore > 0 ? 'White' : 'Black'} is ${Math.abs(formattedScore)} pawns ahead)`;
  };

  // Format the best move from engine evaluation
  const formatBestMove = () => {
    if (!evaluation || !evaluation.bestMove) return null;
    
    try {
      const tempGame = new Chess(game.fen());
      const from = evaluation.bestMove.substring(0, 2);
      const to = evaluation.bestMove.substring(2, 4);
      const promotion = evaluation.bestMove.length > 4 ? evaluation.bestMove[4] : 'q';
      
      const result = tempGame.move({
        from: from,
        to: to,
        promotion: promotion
      });
      
      if (result) {
        return `Best move: ${result.san}`;
      }
    } catch (e) {
      console.error("Could not parse best move:", e);
    }
    
    return null;
  };

  // Styles
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    gap: '20px',
    flexDirection: window.innerWidth < 768 ? 'column' : 'row',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  };

  const boardContainerStyle = {
    flex: 2,
    maxWidth: '600px',
  };

  const infoContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const evaluationContainerStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '15px',
    backgroundColor: '#fafafa',
  };

  const moveHistoryStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '15px',
    backgroundColor: '#fafafa',
    maxHeight: '300px',
    overflowY: 'auto',
  };

  const buttonStyle = {
    padding: '10px 16px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '10px 10px 0 0',
    fontWeight: 'bold',
  };

  const analyzeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4CAF50',
  };

  const statusStyle = {
    fontSize: '18px',
    marginBottom: '15px',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: game.inCheck() ? '#ffebee' : '#e8f5e9',
    borderRadius: '4px',
    color: game.inCheck() ? '#d32f2f' : '#2e7d32',
    fontWeight: 'bold',
  };

  const spinnerStyle = {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '3px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    borderTopColor: '#2196f3',
    animation: 'spin 1s ease-in-out infinite',
    marginLeft: '10px',
  };

  const bestMoveStyle = {
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#e8f5e9',
    border: '1px solid #c8e6c9',
    borderRadius: '4px',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div style={boardContainerStyle}>
        <div style={statusStyle}>
          {status}
          {thinking && <span style={spinnerStyle}></span>}
        </div>
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          }}
          customDarkSquareStyle={{ backgroundColor: '#779952' }}
          customLightSquareStyle={{ backgroundColor: '#edeed1' }}
        />
        <div>
          <button onClick={resetGame} style={buttonStyle}>
            New Game
          </button>
          <button onClick={analyzePosition} style={analyzeButtonStyle}>
            Analyze Position
          </button>
        </div>
      </div>

      <div style={infoContainerStyle}>
        <div style={evaluationContainerStyle}>
          <h2 style={{ marginBottom: '10px', fontSize: '18px' }}>Engine Evaluation</h2>
          <div style={{ padding: '10px', backgroundColor: '#fff', border: '1px solid #eee' }}>
            {thinking ? 'Thinking...' : formatEvaluation()}
          </div>
          
          {evaluation && evaluation.bestMove && (
            <div style={bestMoveStyle}>
              {formatBestMove()}
            </div>
          )}
          
          <div style={{ marginTop: '10px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
              Engine Depth: {engineDepth}
            </label>
            <input
              type="range"
              min="5"
              max="15"
              value={engineDepth}
              onChange={(e) => setEngineDepth(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>Faster</span>
              <span>Stronger</span>
            </div>
          </div>
        </div>

        <div style={moveHistoryStyle}>
          <h2 style={{ marginBottom: '10px', fontSize: '18px' }}>Move History</h2>
          {moveHistory.length === 0 ? (
            <div style={{ color: '#757575', fontStyle: 'italic' }}>No moves yet</div>
          ) : (
            <div style={{ lineHeight: '1.6' }}>
              {moveHistory.map((move, index) => (
                <div key={index} style={{ marginBottom: '5px' }}>{move}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;