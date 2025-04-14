import Navbar from "../components/Navbar";
import GameView from "../components/GameView";

const GameLibrary = () => {

    return(
        <div>
            <Navbar />
            <h1>Game Library</h1>
            <p>tic tac toe</p>
            <p>guessing game</p>
            <GameView />
        </div>
    )
}

export default GameLibrary;