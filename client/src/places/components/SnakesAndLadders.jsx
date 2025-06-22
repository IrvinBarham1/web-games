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
    const [msg, setMsg] = useState("");

    let gamelogFlag = false;
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
            <div classname="game-buttons">
                <button className="button-settings" onClick={() => rollDice(playerNames[currentTurnNum], sixFlag, currentTurnNum)}> Roll Dice</button> 
                <div className="game-log-holder">
                    <h5> Game Log: </h5>
                        <p>It's {playerNames[currentTurnNum]}'s {symbols[currentTurnNum]} Turn</p>
                        {currentTurnNum === 0 ? <p>{playerNames[1]} {symbols[currentTurnNum]} Rolled a {diceValue}</p> : 
                        <p>{playerNames[0]} {symbols[currentTurnNum]} Rolled a {diceValue}</p>}
                        {Array.from({length:numPlayers}).map((count,index) => (
                        <div className="game-log-player-posiions-holder">
                            <u>{symbols[index]} {playerNames[index]} {symbols[index]}</u>
                            <br/>
                            <i>Position: {positions[index]}</i>
                            <br/>
                            <i>Moves Neeed to Win: {(100 - positions[index])} </i>
                            <br/>
                        </div>
                    ))}
                    <div className="game-log-alert"><br/>{msg}</div>
                </div>
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
                if(newPositions[currentTurnNum] > 100){
                    newPositions[currentTurnNum] = 100 - (newPositions[currentTurnNum] - 100);
                    alert(name + " went over 100. Rolled a " + diceValue + ". Moving back to " + newPositions[currentTurnNum]);
                }
                if(newPositions[currentTurnNum] === 100){
                    alert(name + " has reached the end of the board!");
                }
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

    const LadderSnakeMove = (cellNum, player) => {
        gamelogFlag = true;
            if (cellNum === 7) {
                const newPositions = [...positions];
                newPositions[player] = 36;
                setPositions(newPositions);
                setMsg(playerNames[player] + " moved up the ladder to 36");
            }
            if (cellNum === 21) {
                const newPositions = [...positions];
                newPositions[player] = 58;
                setPositions(newPositions);
                setMsg(playerNames[player] + " moved up the ladder to 58");
            }            
            if (cellNum === 31) {
                const newPositions = [...positions];
                newPositions[player] = 51;
                setPositions(newPositions);
                setMsg(playerNames[player] + " moved up the ladder to 51");
            }
            if (cellNum === 33) {
                const newPositions = [...positions];
                newPositions[player] = 5;
                setPositions(newPositions);
                setMsg(playerNames[player] + " eaten by a snake to 5");
            }           
            if (cellNum === 34) {
                const newPositions = [...positions];
                newPositions[player] = 84;
                setPositions(newPositions);
                setMsg(playerNames[player] + " moved up the ladder to 84");
            }
            if (cellNum === 43) {
                const newPositions = [...positions];
                newPositions[player] = 24;
                setPositions(newPositions);
                setMsg(playerNames[player] + " eaten by a snake to 24");
            }
            if (cellNum === 54) {
                const newPositions = [...positions];
                newPositions[player] = 89;
                setPositions(newPositions);
                setMsg(playerNames[player] + " moved up the ladder to 89");
            }
            if (cellNum === 56) {
                const newPositions = [...positions];
                newPositions[player] = 20;
                setPositions(newPositions);
                setMsg(playerNames[player] + " eaten by a snake to 20");
            }
            if (cellNum === 63) {
                const newPositions = [...positions];
                newPositions[player] = 82;
                setPositions(newPositions);
                setMsg(playerNames[player] + " moved up the ladder to 82");
            }
            if (cellNum === 66) {
                const newPositions = [...positions];
                newPositions[player] = 12;
                setPositions(newPositions);
                setMsg(playerNames[player] + " eaten by a snake to 12");
            }
            if (cellNum === 78) {
                const newPositions = [...positions];
                newPositions[player] = 59;
                setPositions(newPositions);
                setMsg(playerNames[player] + " eaten by a snake to 59");
            }
            if (cellNum === 96) {
                const newPositions = [...positions];
                newPositions[player] = 72;
                setPositions(newPositions);
                setMsg(playerNames[player] + " eaten by a snake to 72");
            }                  
    }

    return (
        <div className="game-container">
            <h1 className="game-name">Snakes and Ladders</h1>
            <div className="game-container-right">
                <button className="button-settings" onClick={() => validateGameSettings()}>Start Game</button>
                {toggleSettings && <GameSettings/>}
                {toggleDice && <Dice/>}
                {msg && gamelogFlag}
                
            </div>
            <img className="image-board" src="/snakesladdersboard.jpg" alt="Board Game"/>
            <div className="board-container">
                <div className="column1">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+1} className="cell-sal">
                            {playerNames.map((count, index) => (
                                <div>
                                    {positions[index] === 7 ? LadderSnakeMove(7,index) : rowIndex+1 === positions[index] && <span className="gamePiece-cell">{symbols[index]}</span>}
                                </div>
                            ))}
                           
                        </div>
                    ))}
                </div>
                <div className="column2">
                    {board.map((row, rowIndex) => (
                        <div key={20-rowIndex} className="cell-sal">
                            {playerNames.map((count, index) => (
                                <div>
                                    {20-rowIndex === positions[index] && <span className="gamePiece-cell">{symbols[index]}</span>}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="column3">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+21} className="cell-sal">
                            {playerNames.map((count, index) => (
                                <div>
                                    {positions[index] === 21 ? LadderSnakeMove(21,index) : rowIndex+21 === positions[index] && <span className="gamePiece-cell">{symbols[index]}</span>}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="column4">
                    {board.map((row, rowIndex) => (
                        <div key={40-rowIndex} className="cell-sal">
                             {playerNames.map((count, index) => (
                                <div>
                                    {positions[index] === 31 || positions[index] === 33 || positions[index] === 34 ? LadderSnakeMove(positions[index] ,index) : 
                                    40-rowIndex === positions[index] && <span className="gamePiece-cell">{symbols[index]}</span>}
                                </div>
                             ))}
                        </div>
                    ))}
                </div>
                <div className="column5">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+41} className="cell-sal">
                             {playerNames.map((count, index) => (
                                <div>
                                    {positions[index] === 43 ? LadderSnakeMove(43,index) : rowIndex+41 === positions[index] && <span className="gamePiece-cell">{symbols[index]}</span>}
                                </div>
                             ))}
                        </div>
                    ))}
                </div>
                <div className="column6">
                    {board.map((row, rowIndex) => (
                        <div key={60-rowIndex} className="cell-sal">
                          {playerNames.map((count, index) => (
                                <div>
                                    {positions[index] === 54 || positions[index] === 56 ? LadderSnakeMove(positions[index],index) : 60-rowIndex === positions[index] && <span className="gamePiece-cell">{symbols[index]}</span>}
                                </div>
                          ))}    
                        </div>
                    ))}
                </div>
                <div className="column7">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+61} className="cell-sal">
                           {playerNames.map((count, index) => (
                                <div>
                                    {positions[index] === 63 || positions[index] === 66 ? LadderSnakeMove(positions[index],index) : rowIndex+61 === positions[index] && <span className="gamePiece-cell">{symbols[index]}</span>}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="column8">
                    {board.map((row, rowIndex) => (
                        <div key={80-rowIndex} className="cell-sal">
                             {playerNames.map((count, index) => (
                                <div>
                                    {positions[index] === 78 ? LadderSnakeMove(78,index) : 80-rowIndex === positions[index] && <span className="gamePiece-cell">{symbols[index]}</span>}
                                </div>
                             ))}
                        </div>
                    ))}
                </div>
                <div className="column9">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex+81} className="cell-sal">
                         {playerNames.map((count, index) => (
                                <div>
                                    {rowIndex+81 === positions[index] && <span className="gamePiece-cell">{symbols[index]}</span>}
                                </div>
                         ))}
                        </div>
                    ))}
                </div>
                <div className="column10">
                    {board.map((row, rowIndex) => (
                        <div key={100-rowIndex} className="cell-sal">
                             {playerNames.map((count, index) => (
                                <div>
                                    {positions[index] === 96 ? LadderSnakeMove(96,index) : 100-rowIndex === positions[index] && <span className="gamePiece-cell">{symbols[index]}</span>}
                                </div>
                             ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default SnakesAndLadders;