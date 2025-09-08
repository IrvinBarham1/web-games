const { Ollama } = require('ollama');
const ollama = new Ollama({ host: 'http://127.0.0.1:11434'})

async function generateQuestions(category, difficulty) {
    const response = await ollama.chat({
    model: 'llama3.2:latest',
    messages: [{ role: 'user', content: "Give me a trivia question of Category: " + category + "with Difficulty: " + difficulty + " no blackslashes, plain english"}],
    })
     return response.message.content;
}
module.exports =  { generateQuestions };