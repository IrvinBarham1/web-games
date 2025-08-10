const express = require('express')
const app = express()
const path = require('path');
const {fetchAccounts, addAccounts} = require('./dynamo')

app.get("/api", (req, res) => {
    res.json({ message: "Hello, World!" })
})

app.get("/authLogins", async (req, res) => {
    try {
        const data = await fetchAccounts();
        if(data.success){
            res.json( data.data)
        }

    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
})


app.get("/leaderboard", (req, res) => {
    const leaderboard = ["Irvin | Wins: " + "Losses: "];
    res.json(leaderboard);
}
)
app.listen(5000)