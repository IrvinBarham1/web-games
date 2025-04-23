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
            <h1>Game Library</h1>
            <button class="game-names" onClick={() => setSelectedGame("TicTacToe")}>Tic-Tac-Toe</button>
            <button class="game-names" onClick={() => setSelectedGame("SnakesAndLadders")}>Snakes and Ladders</button>

            {selectedGame === "TicTacToe" && <TicTacToe />}
            {selectedGame === "SnakesAndLadders" && <SnakesAndLadders />}
        </div>
    )
}

export default GameLibrary;