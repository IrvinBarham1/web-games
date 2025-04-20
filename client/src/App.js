import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from "./user/pages/login";
import Home from "./places/pages/Home";
import GameLibrary from "./places/pages/GameLibrary";
import Leaderboard from "./places/pages/Leaderboard";
import ContactUs from "./places/pages/ContactUs";
import Admin from "./places/pages/Admin";


function App () {
  const [backendData, setBackendData] = useState([{}])
  const [leaderboard, setLeaderboard] = useState([{}])

  useEffect(() => {
    fetch('/api')
    .then(response => response.json())
    .then(data => {setBackendData(data)})
    fetch('/leaderboard')
    .then(response => response.json())
    .then(data => {setLeaderboard(data)})
  }, [])

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/library" element={<GameLibrary />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/admin" element = {<Admin />} />
      </Routes>
    </BrowserRouter>
    )
}

export default App;