import React, { useEffect, useState } from 'react'
import "../pages/GameView.css";

function GameView () {
    const [selectedCell, setSelectedCell] = useState(null);
    const [turnCount, setTurnCount] = useState(1);

    const handleCellClick = () => {
        setTurnCount(prevTurnCount => {
            const newTurnCount = prevTurnCount + 1;
            setSelectedCell(newTurnCount % 2 === 0 ? "X" : "O");
            return newTurnCount;

        })
    }

    return (
    <div className="game-container">
        <h1 className="game-name">tic tac toe</h1>
            <div className="game-board">
                <div className="column1">
                    <div className="cell">
                        <button onClick={handleCellClick} className="cell-button">
                            {selectedCell}
                        </button>
                    </div>

                    <div className="cell">2</div>
                    <div className="cell">3</div>
                </div>
                <div className="column2">
                    <div className="cell">4</div>
                    <div className="cell">5</div>
                    <div className="cell">6</div>
                </div>
                <div className="column3">
                    <div className="cell">7</div>
                    <div className="cell">8</div>
                    <div className="cell">9</div>
                </div>
            </div>
    </div>
    )
}

export default GameView;