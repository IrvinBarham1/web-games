const { Ollama } = require('ollama');
const ollama = new Ollama({ host: 'http://127.0.0.1:11434'})
const express = require('express')
const router = express.Router();

async function generateQuestions(category, difficulty, count) {
  let badResponse = true;
  while(badResponse) {
    const response = await ollama.chat({
    model: 'llama3.2:latest',
    messages: [{ role: 'user', content: "Generate " + 
        count + " trivia question(s) of Category " + 
        category + "with Difficulty: " + 
        difficulty + " Respond only in valid JSON follow this strucutre exactly: {question: ... , choices: [..., ..., ..., ...] answer: ..., explanation: ...},  {question: ... , choices: [..., ..., ..., ...] answer: ..., explanation: ...}, ..."}],
    })
    let text = await response.message.content;
    text = String(text).trim();
    text = text.replace(/^```(?:json)?\s*|\s*```$/g, "");
    text = "[" + text.replace(/}\s*{/g, "},{") + "]";

    if (text.match(/"question"/g || []).length === count){
      badResponse = false;
      console.log(">>> Successful Response : " + text);
      return text;
    }
    else
      console.log(">>> Bad Response : " + text.match(/"question"/g || []).length + " !=  Count: " + count + " | Bad Response: " + text);
  }
}

router.post('/questionsAi', async (req, res) => {
  try {
      console.log(">>> AI POST LOGGED | Category: " + req.body.category + " | Difficulty: " + req.body.difficulty + " | Count: " + req.body.count);
      let response = await generateQuestions(req.body.category, req.body.difficulty, req.body.count);
      res.json({ response });
    } 
    catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Error fetching AI response' });
    }
});

module.exports =  router;