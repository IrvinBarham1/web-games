import Navbar from "../components/Navbar";
import GameView from "../components/GameView";

const GameLibrary = () => {
    /*
    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [playerScore, setPlayerScore] = useState(0)
    const [computerScore, setComputerScore] = useState(0)
    const [playerChoice, setPlayerChoice] = useState("")
    const [computerChoice, setComputerChoice] = useState("")
    const [result, setResult] = useState("")
    const [playerChoiceHistory, setPlayerChoiceHistory] = useState([])
    const [computerChoiceHistory, setComputerChoiceHistory] = useState([])
    const [playerScoreHistory, setPlayerScoreHistory] = useState([])
    const [computerScoreHistory, setComputerScoreHistory] = useState([])
    */

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