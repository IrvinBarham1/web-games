import React, {useEffect, useState } from 'react';
import './assets/AITrivia.css';

const CATEGORIES = [
  { value: "", label: "Any" },
  { value: "general", label: "General Knowledge" },
  { value: "science", label: "Science" },
  { value: "history", label: "History" },
  { value: "sports", label: "Sports" },
  { value: "movies", label: "Movies" }
];

const DIFFICULTY = [
  { value: "", label: "Any" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" }
];

function AiTrivia () { 

    const [gameStarted, setGameStarted] = useState(false);
    const [questionCategory, setQuestionCategory] = useState("");
    const [questionDifficulty , setQuestionDifficulty] = useState("");
    const [questionAi, setQuestionAi] = useState("NULL");

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        const label = CATEGORIES.find(c => c.value === value)?.label ?? "Any";
        setQuestionCategory(label);
  }
      const handleDiffcultyChange = (e) => {
        const value = e.target.value;
        const label = DIFFICULTY.find(d => d.value === value)?.label ?? "Any";
        setQuestionDifficulty(label);
  }
    async function fetchQuestions() {
        const res = await fetch('/questionsAi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            category: questionCategory,
            difficulty: questionDifficulty
            }),
    });
    const data = await res.json();
    setQuestionAi(data.question);
    }

    useEffect(() => {
        if (gameStarted)
        fetch('/questionsAi')
        .then(response => response.json())
        .then(data => {
        setQuestionAi(data.text ?? ["error fetching questions"])
        })
    }, [gameStarted])

    return (
        <div className="trivia-page">
            <header className="trivia-header">
                <h1 className="game-name">🤖 AI Powered Trivia</h1>

                <div className="game-toolbar">
                <div className="selectors">
                    <label className="field">
                    <span>Category</span>
                    <select id="categorySelect" className="select" value={questionCategory} onChange={handleCategoryChange}>
                        {CATEGORIES.map(c => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                    </select>
                    </label>

                    <label className="field">
                    <span>Difficulty</span>
                    <select id="difficultySelect" className="select" value={questionDifficulty} onChange={handleDiffcultyChange}>
                        {DIFFICULTY.map (d => (
                            <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                    </select>
                    </label>

                    <label className="field">
                    <span>Questions</span>
                    <input
                        id="questionCount"
                        className="input"
                        type="number"
                        min="1"
                        max="25"
                        defaultValue="10"
                    />
                    </label>
                </div>
                <div className="actions">
                      {!gameStarted && <button id="startBtn" className="btn primary" onClick={() =>setGameStarted(true)}>Start</button>}
                      <button id="resetBtn" className="btn ghost"  disabled={!gameStarted} onClick={() => setGameStarted(false)}>Reset</button>
                </div>
                </div>

                <div className="statusbar" role="status" aria-live="polite">
                <div className="status-item">
                    <span className="label">Question</span>
                    <span id="qIndex" className="value">0/0</span>
                </div>
                <div className="status-item">
                    <span className="label">Score</span>
                    <span id="score" className="value">0</span>
                </div>
                <div className="status-item timer">
                    <span className="label">Time</span>
                    <span id="timeLeft" className="value">00:30</span>
                    <div className="timebar">
                    <div id="timeFill" className="timefill" style={{ width: '100%' }} />
                    </div>
                </div>
                <div className="status-item ai-badge" title="AI features enabled">AI</div>
                </div>
            </header>

            <main className="trivia-container">
                <section className="game-holder">
                {/* Question Card */}
                <article className="question-card" aria-live="polite">
                    <div className="q-meta">
                    <span id="qCategory" className="chip">Category</span>
                    <span id="qDifficulty" className="chip">Medium</span>
                    </div>
                    <h2 id="questionText" className="question">
                        {!gameStarted ? "Press Start to begin!" : questionAi}

                    </h2>

                    {gameStarted &&
                         <ul className="choices" role="listbox" aria-labelledby="questionText">
                        <li><button className="choice-btn" data-choice="Option-A">Option A</button></li>
                        <li><button className="choice-btn" data-choice="Option-B">Option B</button></li>
                        <li><button className="choice-btn" data-choice="Option-C">Option C</button></li>
                        <li><button className="choice-btn" data-choice="Option-D">Option D</button></li>
                                </ul>
                    }

                    <div className="feedback" aria-live="assertive" id="answerFeedback">
                    {/* “Correct!” / “Oops, the answer was …” */}
                    </div>

                    <div className="card-actions">
                    <button id="nextBtn" className="btn" disabled>Next</button>
                    </div>
                </article>

                {/* Right Sidebar: AI helpers */}
                <aside className="assistant-panel">
                    <h3 className="panel-title">AI Assist</h3>

                    <div className="assist-actions">
                    <button id="hintBtn" className="btn small" disabled>💡 Get Hint</button>
                    <button id="explainBtn" className="btn small" disabled>
                        📘 Explain Answer
                    </button>
                    <button id="genQuestionBtn" className="btn small ghost">
                        ✨ Generate New Question
                    </button>
                    </div>

                    <div className="assist-output" id="assistOutput" aria-live="polite">
                    {/* AI hint/explanation text goes here */}
                    </div>
                </aside>
                </section>
            </main>

            <footer className="trivia-footer">
                <button id="reviewBtn" className="btn ghost" disabled>Review Questions</button>
                <button id="shareBtn" className="btn ghost" disabled>Share Score</button>
            </footer>
            </div>
    )
}

export default AiTrivia;