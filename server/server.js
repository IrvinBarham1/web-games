const express = require('express')
const app = express()
const path = require('path');

app.get("/api", (req, res) => {
    res.json({ message: "Hello, World!" })
})

app.get("/leaderboard", (req, res) => {
    const leaderboard = ["Irvin | Wins: " + "Losses: "];
    res.json(leaderboard);
}
)
app.listen(5000)