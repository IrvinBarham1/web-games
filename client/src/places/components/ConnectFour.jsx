import React, { useState } from 'react';
import './assets/ConnectFour.css';

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
  const emptyBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('🔴');
  const [winner, setWinner] = useState(null);

 
  const checkWinner = (board) => {
    //check vertical wins
    let RedFour = false;
    let YellowFour = false;
    for (let col = 0; col < COLS; col++) {
        for(let row = ROWS - 1; row >= 3; row--) { 
            if(board[row][col] === '🔴' && board[row-1][col] === '🔴' &&
                board[row-2][col] === '🔴' && board[row-3][col] === '🔴'){

                RedFour = true;
            }
            if(board[row][col] === '🟡' && board[row-1][col] === '🟡' &&
                board[row-2][col] === '🟡' && board[row-3][col] === '🟡'){

                YellowFour = true;
            }
        }
    }
    //check horizontal wins
    for (let row = 0; row < ROWS; row++) {
        for(let col = 0; col <= 3; col++) { 
            if(board[row][col] === '🔴' && board[row][col+1] === '🔴' &&
                board[row][col+2] === '🔴' && board[row][col+3] === '🔴'){

                RedFour = true;
            }
            if(board[row][col] === '🟡' && board[row][col+1] === '🟡' &&
                board[row][col+2] === '🟡' && board[row][col+3] === '🟡'){

                YellowFour = true;
            }
        }
    }
    //check diagonal wins decline
    for (let col = 0; col <= 3; col++) {
        for (let row = 0; row <= 2; row++) {
            if(board[row][col] === '🔴' && board[row+1][col+1] === '🔴' &&
                board[row+2][col+2] === '🔴' && board[row+3][col+3] === '🔴'){

                RedFour = true;
            }
            if(board[row][col] === '🟡' && board[row+1][col+1] === '🟡' &&
                board[row+2][col+2] === '🟡' && board[row+3][col+3] === '🟡'){

                YellowFour = true;
            }     
        }
    }
    //check diagonal wins incline
    for (let col = 0; col <= 3; col++) {
        for (let row = ROWS -1; row >= 2; row--) {
            if(board[row][col] === '🔴' && board[row-1][col+1] === '🔴' &&
                board[row-2][col+2] === '🔴' && board[row-3][col+3] === '🔴'){

                RedFour = true;
            }
            if(board[row][col] === '🟡' && board[row-1][col+1] === '🟡' &&
                board[row-2][col+2] === '🟡' && board[row-3][col+3] === '🟡'){

                YellowFour = true;
            }    
        }
    }

    if (RedFour)
        setWinner('🔴');
    else if (YellowFour)
        setWinner('🟡');
    else
        return null;
  };
    
  const handleColumnClick = (col) => {
    if (winner) return;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === null) {
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);

        const maybeWinner = checkWinner(newBoard);
        if (maybeWinner) {
          setWinner(maybeWinner);
        } else {
          setCurrentPlayer(currentPlayer === '🔴' ? '🟡' : '🔴');
        }
        return;
      }
    }
  };

  return (
    <div className="connect-four-container">
        <h1 className="game-name">Connect Four</h1>
        <div className="game-holder">
            <div className="board">
                {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                    <div key={colIndex} className="cell-connectFour" onClick={() => handleColumnClick(colIndex)}>
                        <div className="disc">{cell}</div>  
                    </div>
                    ))}
                </div>
                ))}
            </div>
            <div className="game-info">
                <button className="button-settings" onClick={() => window.location.reload()}>Restart</button>
                {winner && <h2>🎉 {winner} wins!</h2>}
                <p>Current Player: {currentPlayer}</p>
                <p>Closest  to Winning: 0</p>
                <p>Empty Positions: </p>
            </div>  
        </div>
    </div>
  );
};

export default ConnectFour;