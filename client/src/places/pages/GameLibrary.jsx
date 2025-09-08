import Navbar from "../components/Navbar";
import TicTacToe from "../components/TicTacToe";
import SnakesAndLadders from "../components/SnakesAndLadders";
import ConnectFour from "../components/ConnectFour";
import AiTrivia from "../components/AiTrivia";
import "./GameLibrary.css";
import "../../shared/components/layout.css";
import React, { useState } from "react";

const GameLibrary = () => {
    const [selectedGame, setSelectedGame] = useState(null);
    const games = [
    { id: "TicTacToe", title: "Tic-Tac-Toe", component: <TicTacToe /> },
    { id: "SnakesAndLadders", title: "Snakes and Ladders", component: <SnakesAndLadders /> },
    { id: "ConnectFour", title: "Connect Four", component: <ConnectFour /> },
    { id: "AI_Trivia", title: "Trivia with AI", component: <AiTrivia /> },
    { id: "empty2", title: "Coming Soon", component: null },
    { id: "empty3", title: "Coming Soon", component: null },
  ];

    return(
    <div>
      <Navbar />
      <h1 className="page-name">Game Library</h1>

      <div className="library-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="sidebar-title">Available Games</h2>
          <ul className="game-list">
            {games.map((g) => (
              <li key={g.id}>
                <button
                  className={`game-btn ${selectedGame === g.id ? "active" : ""}`}
                  onClick={() => g.component && setSelectedGame(g.id)}
                  disabled={!g.component}
                >
                  {g.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="game-display">
          {!selectedGame && (
            <div className="placeholder">
              <h2>Select a game from the left 👈</h2>
              <p>Click on any available game to start playing.</p>
            </div>
          )}
          {games.map(
            (g) => selectedGame === g.id && <div key={g.id}>{g.component}</div>
          )}
        </main>
      </div>
    </div>
    )
}

export default GameLibrary;