const { Ollama } = require('ollama');
const ollama = new Ollama({ host: 'http://127.0.0.1:11434'})
const express = require('express')
const router = express.Router();

function messagetoJSON(response){
    
}
async function generateQuestions(category, difficulty) {
    const response = await ollama.chat({
    model: 'llama3.2:latest',
    messages: [{ role: 'user', content: "Generate a trivia question of " + 
        category + "with Difficulty: " + 
        difficulty + " Respond only in valid JSON follow this strucutre exactly {question: ... , choices: [..., ..., ..., ...] answer: ..., explanation: ...}"}],
    })

     return response.message.content;
}

router.post('/questionsAi', async (req, res) => {
    try {
        console.log(">>> POST LOGGED " + req.body);
        const response = await generateQuestions(req.body.category, req.body.difficulty);
        console.log(">>> Fetched " + response);
        res.json({ response });
      } 
      catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error fetching AI response' });
      }
});

module.exports =  router;