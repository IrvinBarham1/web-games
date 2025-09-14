const { Ollama } = require('ollama');
const ollama = new Ollama({ host: 'http://127.0.0.1:11434'})
const express = require('express')
const router = express.Router();

async function generateQuestions(category, difficulty) {
  const response = await ollama.chat({
  model: 'gpt-oss:latest',
  messages: [{ role: 'user', content: "Generate a trivia question of Category " + 
      category + "with Difficulty: " + 
      difficulty + " Respond only in valid JSON follow this strucutre exactly: {question: ... , choices: [..., ..., ..., ...] answer: ..., explanation: ...}"}],
  })

    return response.message.content;
}

router.post('/questionsAi', async (req, res) => {
  try {
      console.log(">>> AI POST LOGGED " + req.body);
      let response = await generateQuestions(req.body.category, req.body.difficulty);
      response = await response.substring(response.indexOf("{"), response.indexOf("}") + 1);
      console.log(">>> JSON Extraction " + response);
      res.json({ response });
    } 
    catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Error fetching AI response' });
    }
});

module.exports =  router;