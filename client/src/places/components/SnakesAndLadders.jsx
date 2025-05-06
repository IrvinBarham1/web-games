import React, { useEffect, useState } from 'react';
import "./assets/SnakesAndLadders.css";

function SnakesAndLadders () {
    const [board, setBoard] = useState(Array.from({ length: 10 }, () => Array(10).fill(0)));
    const [numPlayers, setNumPlayers] = useState(2);
    const [symbols, setSymbols] = useState([null]);
    const [playerNames, setPlayerNames] = useState([null]);
    const [toggleSettings, setToggleSettings] = useState(true);
    const [toggleDice, setToggleDice] = useState(false);
    const [diceValue, setDiceValue] = useState(0);
    const [positions, setPositions] = useState([null]);

    const players = {
        num: numPlayers,
        name: playerNames,
        symbol: symbols,
        position: positions
    }

    const hideGameSettings = () => {
        setToggleSettings(!toggleSettings);

    }

    const GameSettings = () => (
        <div>
            <p>Game Settings</p>
            <label>Players</label>
            <input 
             type="number"
             name="players"
             max="6" 
             min="2" 
             value={numPlayers} 
             onChange={players => setNumPlayers(players.target.value)} 
             required />
             <br/>
            <label>Edit Players</label>

            {Array.from({length:numPlayers}).map((count,index) => (
                <ul>
                    <li key={index}> Name: <b>{playerNames[index]}</b> Symbol: {symbols[index]}
                        <input
                         maxLength="10" 
                         placeholder="Set a Name"
                         onBlur={name => {
                            const newNames = [...playerNames];
                            newNames[index] = name.target.value;
                            setPlayerNames(newNames);
                            
                            }}
                        />
                        <select onBlur={symbol => {
                            const newSymbols = [...symbols];
                            newSymbols[index] = symbol.target.value;
                            setSymbols(newSymbols);
                        }}>
                            <option value="✦">✦</option>
                            <option value="♣">♣</option>
                            <option value="♥">♥</option>
                            <option value="♚">♚</option>
                            <option value="♞">♞</option>
                            <option value="♛">♛</option>
                        </select>
                    </li>
                </ul>
            ))}
            <p>Players: {numPlayers} and Names: {playerNames} and {symbols}</p>
        </div>
    )

    const validateGameSettings = () => {
        if(playerNames.includes(null) || symbols.includes(null))
            alert("Please Fill Out The Game Settings")
        else{
            hideGameSettings()
            hideDice();
        }
    }
    
    const hideDice = () => {
        setToggleDice(!toggleDice);
    }

    const Dice = () => {
        return (
            <div>
                <label>It's {playerNames} Turn to Roll</label>
                <button className="button-settings" onClick={() => rollDice()}> You Rolled a {diceValue}</button>
            </div>
        )
    }

    const rollDice = () => {
        //if 6 need to roll again
        setDiceValue((Math.floor(Math.random() * 6) + 1))
    }

   const handlePlayerMove = (currentPosition) => {
        const diceRoll = rollDice();
        const newPosition = currentPosition + diceRoll;
   }
    return (
        <div className="game-container">
            <h1 className="game-name">Snakes and Ladders</h1>
            <div className="game-container-right">
                <button className="button-settings" onClick={() => validateGameSettings()}>Start Game</button>
                {toggleSettings && <GameSettings/>}
                {toggleDice && <Dice/>}
                
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