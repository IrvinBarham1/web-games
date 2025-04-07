import React, { useEffect, useState } from 'react'

import Navbar from "./components/Navbar";
import GameView from "./components/GameView";

function App () {
  const [backendData, setBackendData] = useState([{}])
  const [leaderboard, setLeaderboard] = useState([{}])

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

  useEffect(() => {
    fetch('/api')
    .then(response => response.json())
    .then(data => {setBackendData(data)})
    fetch('/leaderboard')
    .then(response => response.json())
    .then(data => {setLeaderboard(data)})
  }, [])



  return (
    <div>
      <Navbar />
      <GameView />
      {(typeof backendData === 'undefined')?(<p>loading</p>): (<p>{backendData.message}</p>)}
    </div>
    )
}

export default App