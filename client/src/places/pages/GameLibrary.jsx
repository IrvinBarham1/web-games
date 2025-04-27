import Navbar from "../components/Navbar";
import TicTacToe from "../components/TicTacToe";
import SnakesAndLadders from "../components/SnakesAndLadders";
import "./GameLibrary.css";
import React, { useState } from "react";

const GameLibrary = () => {
    const [selectedGame, setSelectedGame] = useState(null);

    return(
        <div>
            <Navbar />
            <h1 className="page-name">Game Library</h1>
            <div className="games-list">
                <button className="game-names" onClick={() => setSelectedGame("TicTacToe")}>Tic-Tac-Toe</button>
                <button className="game-names" onClick={() => setSelectedGame("SnakesAndLadders")}>Snakes and Ladders</button>
                <button className="game-names">empty</button>
                <button className="game-names">empty</button>
                <button className="game-names">empty</button>
                <button className="game-names">empty</button>
            </div>
            {selectedGame === "TicTacToe" && <TicTacToe />}
            {selectedGame === "SnakesAndLadders" && <SnakesAndLadders />}
        </div>
    )
}

export default GameLibrary;