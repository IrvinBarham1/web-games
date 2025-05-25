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
    const [currentTurnNum, setCurrentTurnNum] = useState(0);

    let sixFlag = false;

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
            //create positions for players after settings are validated
            setPositions(Array.from({length:numPlayers}).fill(0));
        }
    }
    
    const hideDice = () => {
        setToggleDice(!toggleDice);
    }

    const Dice = () => {
        return (
            <div>
                <label>{playerNames[currentTurnNum]}'s {symbols[currentTurnNum]} Turn to Roll</label>
                <button className="button-settings" onClick={() => rollDice(playerNames[currentTurnNum], sixFlag, currentTurnNum)}> Roll Dice :  {diceValue}</button> 
                <br/>
                {Array.from({length:numPlayers}).map((count,index) => (
                    <div>{playerNames[index]} Position {positions[index]}</div>
                 ))}

            </div>
        )
    }

    const rollDice = (name, sixFlag, currentTurnNum) => {
        if(sixFlag === false) {
            let roll = 0;
            roll = Math.floor(Math.random() * 6) + 1;
            if (roll === 6) {
                sixFlag = true;
                setDiceValue(roll);
                alert(name + " rolled a six, roll again!");
            }
            else {
                setDiceValue(roll);
                const newPositions = [...positions];
                newPositions[currentTurnNum] += roll;
                setPositions(newPositions);
                setCurrentTurnNum(prev => prev + 1 > numPlayers - 1 ? 0 : prev + 1);
            }
        }
        if(sixFlag === true){
            alert(name + " is rolling again!");
            let roll = diceValue;
            roll = Math.floor(Math.random() * 6) + 1;
            if (roll === 6) { 
                setDiceValue(roll);
                alert(name + " rolled a six, roll again!");
            }
            else {
                sixFlag = false;
                roll += diceValue;
                setDiceValue(roll);
                const newPositions = [...positions];
                newPositions[currentTurnNum] += roll;
                setPositions(newPositions);
                setCurrentTurnNum(prev => prev + 1 > numPlayers - 1 ? 0 : prev + 1);
            }
        }
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
                        <div key={rowIndex+1} className="cell-sal">
                            {rowIndex === positions[currentTurnNum] && <span className="gamePiece-cell">{symbols[currentTurnNum]}</span>}
                        </div>
                    ))}
                </div>
                <div className="column2">
                    {board.map((row, rowIndex) => (
                        <div key={20-rowIndex} className="cell-sal">
                            {20-rowIndex === positions[currentTurnNum] && <span className="gamePiece-cell">{symbols[currentTurnNum]}</span>}
                        </div>
                    ))}
                </div>
                <div className="column3">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+21} className="cell-sal">
                            {rowIndex+21 === positions[currentTurnNum] && <span className="gamePiece-cell"n>{symbols[currentTurnNum]}</span>}
                        </div>
                    ))}
                </div>
                <div className="column4">
                    {board.map((row, rowIndex) => (
                        <div key={40-rowIndex} className="cell-sal">
                            {40-rowIndex === positions[currentTurnNum] && <span className="gamePiece-cell">{symbols[currentTurnNum]}</span>}
                        </div>
                    ))}
                </div>
                <div className="column5">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+41} className="cell-sal">
                            {rowIndex+41 === positions[currentTurnNum] && <span className="gamePiece-cell">{symbols[currentTurnNum]}</span>}
                        </div>
                    ))}
                </div>
                <div className="column6">
                    {board.map((row, rowIndex) => (
                        <div key={60-rowIndex} className="cell-sal">
                            {60-rowIndex}
                        </div>
                    ))}
                </div>
                <div className="column7">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+61} className="cell-sal">
                            {rowIndex+61}
                        </div>
                    ))}
                </div>
                <div className="column8">
                    {board.map((row, rowIndex) => (
                        <div key={80-rowIndex} className="cell-sal">
                            {80-rowIndex}
                        </div>
                    ))}
                </div>
                <div className="column9">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+81} className="cell-sal">
                            {rowIndex+81}
                        </div>
                    ))}
                </div>
                <div className="column10">
                    {board.map((row, rowIndex) => (
                        <div key={100-rowIndex} className="cell-sal">
                            {100-rowIndex}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default SnakesAndLadders;