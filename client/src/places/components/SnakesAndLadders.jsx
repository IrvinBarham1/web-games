import React, { useEffect, useState } from 'react'
import "./assets/SnakesAndLadders.css";

function SnakesAndLadders () {
    const [board, setBoard] = useState(Array.from({ length: 10 }, () => Array(10).fill(0)));

    useEffect(() => {

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
            <div className="game-container-right">
                <h3>Game Settings</h3>
                <p>Players</p>
                <p>Pick Color</p>
            </div>
            <img className="image-board" src="/snakesladdersboard.jpg" alt="Board Game"/>
            <div className="board-container">
                <div className="column1">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} className="cell-sal">
                            {rowIndex}
                        </div>
                    ))}
                </div>
                <div className="column2">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+10} className="cell-sal">
                            {rowIndex+10}
                        </div>
                    ))}
                </div>
                <div className="column3">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+20} className="cell-sal">
                            {rowIndex+20}
                        </div>
                    ))}
                </div>
                <div className="column4">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+30} className="cell-sal">
                            {rowIndex+30}
                        </div>
                    ))}
                </div>
                <div className="column5">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+40} className="cell-sal">
                            {rowIndex+40}
                        </div>
                    ))}
                </div>
                <div className="column6">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+50} className="cell-sal">
                            {rowIndex+50}
                        </div>
                    ))}
                </div>
                <div className="column7">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+60} className="cell-sal">
                            {rowIndex+60}
                        </div>
                    ))}
                </div>
                <div className="column8">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+70} className="cell-sal">
                            {rowIndex+70}
                        </div>
                    ))}
                </div>
                <div className="column9">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+80} className="cell-sal">
                            {rowIndex+80}
                        </div>
                    ))}
                </div>
                <div className="column10">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+90} className="cell-sal">
                            {rowIndex+90}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default SnakesAndLadders;