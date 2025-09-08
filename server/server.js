const express = require('express')
const app = express()
const path = require('path');

const {fetchAccounts, fetchLeaderboard, addAccounts} = require('./dynamo')
const{generateQuestions} = require('./Ai');
const { diff } = require('util');

app.get("/api", (req, res) => {
    res.json({ message: "Hello, World!" })
})

app.get("/authLogins", async (req, res) => {
    try {
        const data = await fetchAccounts();
        if(data.success){
            res.json(data.data)
        }
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' });
  }
})

app.get("/leaderboard", async (req, res) => {
    try {
        const data = await fetchLeaderboard();
        if(data.success){
            res.json(data.data)
            //const leaderboard = ["Irvin | Wins: " + "Losses: "];
            //res.json(leaderboard);
        }
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' });
  }
 })

app.get("/questionsAi", async (req, res) => {
    try {
        const text = await generateQuestions("Give me a trivia question of Category: science with Difficulty: easy");
        res.json({ text });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch Ai' });
    }
});

app.post('/questionsAi', async (req, res) => {
    try {
        console.log(">>> User Chat Logged");
        const response = await generateQuestions(req.body.category, req.body.difficulty);
        res.json({ response });
      } 
      catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error fetching AI response' });
      }
});

app.listen(5000)