import React, { useEffect, useState } from 'react'
import "../pages/GameView.css";

function GameView () {
    const [selectedCell_1, setSelectedCell_1] = useState(null);
    const [selectedCell_2, setSelectedCell_2] = useState(null);
    const [selectedCell_3, setSelectedCell_3] = useState(null);
    const [selectedCell_4, setSelectedCell_4] = useState(null);
    const [selectedCell_5, setSelectedCell_5] = useState(null);
    const [selectedCell_6, setSelectedCell_6] = useState(null);
    const [selectedCell_7, setSelectedCell_7] = useState(null);
    const [selectedCell_8, setSelectedCell_8] = useState(null);
    const [selectedCell_9, setSelectedCell_9] = useState(null);
    const [turnCount, setTurnCount] = useState(1);
    const [clickHistory, setClickHistory] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [reset, setReset] = useState(false);
    const [cellNames, setCellNames] = useState(Array(9).fill("cell"));

 // Check for win after any cell changes
    useEffect(() => {
        handleGameWin(); 
    }, [selectedCell_1, selectedCell_2, selectedCell_3, selectedCell_4, selectedCell_5, selectedCell_6, selectedCell_7, selectedCell_8, selectedCell_9]);

// Generate restart
    useEffect(() => {
        if (reset) 
            restart();
    }, [reset])

    const restart = () => {
        setReset(false);
        setGameOver(false);
        setClickHistory([]);
        setCellNames(prev => Array(9).fill("cell"));
        setSelectedCell_1("");
        setSelectedCell_2("");
        setSelectedCell_3("");
        setSelectedCell_4("");
        setSelectedCell_5("");
        setSelectedCell_6("");
        setSelectedCell_7("");
        setSelectedCell_8("");
        setSelectedCell_9("");
    }
    const handleGameWin = () => {
        //Column Wins
        if (selectedCell_1 === 'X' && selectedCell_2 === 'X' && selectedCell_3 === 'X'){ 
            setGameOver(true); 
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[0] = newCellNames[1] = newCellNames[2] = "cell-won";
                return newCellNames;
            })
            alert("Player X wins!");
            return;
        }
        if (selectedCell_1 === 'O' && selectedCell_2 === 'O' && selectedCell_3 === 'O'){
            setGameOver(true); 
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[0] = newCellNames[1] = newCellNames[2] = "cell-won";
                return newCellNames;
            })
            alert("Player O wins!");
            return;
        }
        if (selectedCell_4 === 'X' && selectedCell_5 === 'X' && selectedCell_6 === 'X'){
            setGameOver(true); 
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[3] = newCellNames[4] = newCellNames[5] = "cell-won";
                return newCellNames;
            })
            alert("Player X wins!");
        } 
        if (selectedCell_4 === 'O' && selectedCell_5 === 'O' && selectedCell_6 === 'O'){
            setGameOver(true); 
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[3] = newCellNames[4] = newCellNames[5] = "cell-won";
                return newCellNames;
            })
            alert("Player O wins!");
        }
        if (selectedCell_7 === 'X' && selectedCell_8 === 'X' && selectedCell_9 === 'X'){
            setGameOver(true);
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[6] = newCellNames[7] = newCellNames[8] = "cell-won";
                return newCellNames;
            })
            alert("Player X wins!");
        } 
        if (selectedCell_7 === 'O' && selectedCell_8 === 'O' && selectedCell_9 === 'O'){
            setGameOver(true); 
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[6] = newCellNames[7] = newCellNames[8] = "cell-won";
                return newCellNames;
            })
            alert("Player O wins!");
        }
        //Row Wins
        if (selectedCell_1 === 'X' && selectedCell_4 === 'X' && selectedCell_7 === 'X'){
            setGameOver(true); 
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[0] = newCellNames[3] = newCellNames[6] = "cell-won";
                return newCellNames;
            })
            alert("Player X wins!");
        } 
        if (selectedCell_1 === 'O' && selectedCell_4 === 'O' && selectedCell_7 === 'O'){
            setGameOver(true);  
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[0] = newCellNames[3] = newCellNames[6] = "cell-won";
                return newCellNames;
            })
            alert("Player O wins!");
        }
        if (selectedCell_2 === 'X' && selectedCell_5 === 'X' && selectedCell_8 === 'X'){
            setGameOver(true); 
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[1] = newCellNames[4] = newCellNames[7] = "cell-won";
                return newCellNames;
            })
            alert("Player X wins!");
        } 
        if (selectedCell_2 === 'O' && selectedCell_5 === 'O' && selectedCell_8 === 'O'){
            setGameOver(true); 
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[1] = newCellNames[4] = newCellNames[7] = "cell-won";
                return newCellNames;
            })
            alert("Player O wins!");
        }
        if (selectedCell_3 === 'X' && selectedCell_6 === 'X' && selectedCell_9 === 'X'){
            setGameOver(true); 
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[2] = newCellNames[5] = newCellNames[8] = "cell-won";
                return newCellNames;
            })
            alert("Player X wins!");
        } 
        if (selectedCell_3 === 'O' && selectedCell_6 === 'O' && selectedCell_9 === 'O'){
            setGameOver(true); 
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[2] = newCellNames[5] = newCellNames[8] = "cell-won";
                return newCellNames;
            });
            alert("Player O wins!");
        }
        //Diagonal Wins
        if (selectedCell_1 === 'X' && selectedCell_5 === 'X' && selectedCell_9 === 'X'){
            setGameOver(true); 
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[0] = newCellNames[4] = newCellNames[8] = "cell-won";
                return newCellNames;
            })
            alert("Player X wins!");
        } 
        if (selectedCell_1 === 'O' && selectedCell_5 === 'O' && selectedCell_9 === 'O'){
            setGameOver(true); 
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[0] = newCellNames[4] = newCellNames[8] = "cell-won";
                return newCellNames;
            })
            alert("Player O wins!");
        }
        if (selectedCell_3 === 'X' && selectedCell_5 === 'X' && selectedCell_7 === 'X'){
            setGameOver(true);   
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[2] = newCellNames[4] = newCellNames[6] = "cell-won";
                return newCellNames;
            })
            alert("Player X wins!");
        } 
        if (selectedCell_3 === 'O' && selectedCell_5 === 'O' && selectedCell_7 === 'O'){
            setGameOver(true);  
            setCellNames(prev => {
                const newCellNames = [...prev];
                newCellNames[2] = newCellNames[4] = newCellNames[6] = "cell-won";
                return newCellNames;
            })
            alert("Player O wins!");
        }
        //Cat's Game
        if ([selectedCell_1, selectedCell_2, selectedCell_3, selectedCell_4, selectedCell_5, selectedCell_6, selectedCell_7, selectedCell_8, selectedCell_9].every(cell => cell === "X" || cell === "O") ) {
            setGameOver(true); 
            alert("It's a cat's game!");
        }
    }

    const handleCellClick = (num) => {
        if (gameOver){
            alert("Games over, please restart");
            return;
        }
        setClickHistory(prev => [...prev, num]);  // Prevents misclicks from messing up the game
        setTurnCount(prevTurnCount => {
            if (clickHistory.includes(num)) // Prevents changing marks on board
                return turnCount;
            else {
                const newTurnCount = prevTurnCount + 1;
                const mark = newTurnCount % 2 === 0 ? "X" : "O";
                switch(num){
                    case 1: setSelectedCell_1(mark); return newTurnCount;
                    case 2: setSelectedCell_2(mark); return newTurnCount;
                    case 3: setSelectedCell_3(mark); return newTurnCount;
                    case 4: setSelectedCell_4(mark); return newTurnCount;
                    case 5: setSelectedCell_5(mark); return newTurnCount;
                    case 6: setSelectedCell_6(mark); return newTurnCount;
                    case 7: setSelectedCell_7(mark); return newTurnCount;
                    case 8: setSelectedCell_8(mark); return newTurnCount;
                    case 9: setSelectedCell_9(mark); return newTurnCount;
                }
            }
        })
    }

    return (
    <div className="game-container">
        <h1 className="game-name">tic tac toe</h1>
        <button className="restart-button" onClick={() => setReset(true)}>Restart</button>
            <div id="game" className="game-board">
                <div className="column1">
                    <div className={cellNames[0]}>
                        <button onClick={() => handleCellClick(1)} className="cell-button">
                            {selectedCell_1}
                        </button>
                    </div>
                    <div className={cellNames[1]}>
                        <button onClick={() => handleCellClick(2)} className="cell-button">
                            {selectedCell_2}
                        </button>
                    </div>
                    <div className={cellNames[2]}>
                        <button onClick={() => handleCellClick(3)} className="cell-button">
                            {selectedCell_3}
                        </button>
                    </div>
                </div>
                <div className="column2">
                    <div className={cellNames[3]}>
                        <button onClick={() => handleCellClick(4)} className="cell-button">
                            {selectedCell_4}
                        </button>
                    </div>
                    <div className={cellNames[4]}>
                        <button onClick={() => handleCellClick(5)} className="cell-button">
                            {selectedCell_5}
                        </button>
                    </div>
                    <div className={cellNames[5]}>
                        <button onClick={() => handleCellClick(6)} className="cell-button">
                            {selectedCell_6}
                        </button>
                    </div>
                </div>
                <div className="column3">
                    <div className={cellNames[6]}>
                        <button onClick={() => handleCellClick(7)} className="cell-button">
                            {selectedCell_7}
                        </button>
                    </div>
                    <div className={cellNames[7]}>
                        <button onClick={() => handleCellClick(8)} className="cell-button">
                            {selectedCell_8}
                        </button>
                    </div>
                    <div className={cellNames[8]}>
                        <button onClick={() => handleCellClick(9)} className="cell-button">
                            {selectedCell_9}
                        </button>
                    </div>
                    
                </div>
            </div>
    </div>
    )
}

export default GameView;