import React, { useEffect, useState } from 'react'
import "./assets/SnakesAndLadders.css";

function SnakesAndLadders () {
    const [board, setBoard] = useState(Array.from({ length: 10 }, () => Array(10).fill(0)));

    useEffect(() => {
        // Initialize the game board or perform any setup here
    }, []);

    const rollDice = () => {
        return Math.floor(Math.random() * 6) + 1;
    }

   const handlePlayerMove = (currentPosition) => {
        const diceRoll = rollDice();
        const newPosition = currentPosition + diceRoll;
   }
    return (
        <div className="game-container">
            <h1 className="game-name">Snakes and Ladders</h1>
            <img className="image-board" src="/snakesladdersboard.jpg" alt="Board Game"/>
            <div className="board-container">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="board-row">
                        {row.map((cell, colIndex) => {
                            const cellNum = rowIndex * 10 + colIndex + 1;
                            return (
                            <div key={colIndex} className="board-col">
                                {cellNum}
                            </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SnakesAndLadders;