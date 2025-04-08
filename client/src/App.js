import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from "./places/components/Navbar";
import GameView from "./places/components/GameView";

import Home from "./places/pages/Home";
import GameLibrary from "./places/pages/GameLibrary";
import Leaderboard from "./places/pages/Leaderboard";
import ContactUs from "./places/pages/ContactUs";
import Admin from "./places/pages/Admin";


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
/*
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GameLibrary />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/admin" element = {<Admin />} />
        </Routes>
      </BrowserRouter>
      */
  return (
  
      <Home />
    
    )
}

export default App