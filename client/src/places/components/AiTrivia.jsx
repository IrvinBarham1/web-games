import React, { useRef, useEffect, useState } from 'react';
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
const QUESTION_TIME_MS = 30_000;

function AiTrivia () { 

    const [questionCategory, setQuestionCategory] = useState('');
    const [questionDifficulty , setQuestionDifficulty] = useState('');
    const [questionAi, setQuestionAi] = useState();
    const [answerAi, setAnswerAi] = useState([]);
    const [explainationAi, setExplanationAi] = useState();
    const [choicesAi, setChoicesAi] = useState([]);
    const [userChoice, setUserChoice] = useState();
    const [timeLeftMs, setTimeLeftMs] = useState(QUESTION_TIME_MS);
    const rafRef = useRef(null);

    // ---------------------------- Flags ----------------------------
    
    const [phase, setPhase] = useState("pickingSettings");  // "reset" || "pickingSettings" || ""start" || "loadingQuestion" || "readingQuestion" || "answeredQuestion"
        
        const PickChoice = (choice) => {
            setChoicePicked(true);
            setUserChoice(choice);
            setPhase("answeredQuestion");

            if(choice != answerAi)
                 setWrongChoice(true)
            else   
                 setWrongChoice(false)
            if(phase === "reset")
                setUserChoice("")
        }

        const validateGameStart = () => {
            if (questionDifficulty === '' && questionCategory === '') 
                alert("Pleae Select a Difficulty and Category to Start the Game.");
            else if (questionDifficulty === '') 
                alert("Please Select a Difficulty");
            else if (questionCategory === '')
                alert("Please Select a Category");
            else {
                setGameStarted(true);
                setPhase("start");
            }
    }


    const [gameStarted, setGameStarted] = useState(false);
    const [responseLoadedAi, setResponseLoadedAi] = useState(false);
    const [choicePicked, setChoicePicked] = useState(false);
    const [wrongChoice, setWrongChoice] = useState();


    // ---------------------------- Components ----------------------------

    const StartButton = ( {onStart}) => (
        <button id="startBtn" className="btn primary" onClick={onStart}>Start</button>
    )

    // ---------------------------- Functions ----------------------------

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        const label = CATEGORIES.find(c => c.value === value)?.label ?? "Any";
        setQuestionCategory(label);
        setPhase("pickingSettings");
  }
      const handleDiffcultyChange = (e) => {
        const value = e.target.value;
        const label = DIFFICULTY.find(d => d.value === value)?.label ?? "Any";
        setQuestionDifficulty(label);
        setPhase("pickingSettings");
  }

    async function fetchQuestions() {
        try {
            const response = await fetch('/questionsAi', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category: questionCategory, difficulty: questionDifficulty }) 
            })

            if (!response.ok) 
                throw new Error('Network response was not ok');
        
            const data =  await response.json();
            let parsedData = JSON.parse(data.response);
            setAnswerAi(parsedData.answer);
            setExplanationAi(parsedData.explanation);

            setQuestionAi(parsedData.question);

            let choices = parsedData.choices;
            setChoicesAi([choices[0], choices[1], choices[2] , choices[3]]);

            setResponseLoadedAi(true);
            setPhase("readingQuestion");
            console.log(">>> " + questionAi);

            } 
            catch(err) {
            console.error('Chat response fetch error:', err);
            setQuestionAi("Failed to load");
            setGameStarted(false);
            }
        }
    
    function formatMMSS(ms) {
        const total = Math.ceil(ms / 1000);
        const m = Math.floor(total / 60).toString().padStart(2, "0");
        const s = (total % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    }

    useEffect(() => {
    
    // Game Reset
        if (phase === "reset") {
            setQuestionCategory('');
            setQuestionDifficulty('');
            setQuestionAi('');
            setAnswerAi('');
            setExplanationAi('');
            setChoicesAi('');
            setUserChoice('');
        }

        if (phase === "pickingSettings"){
            
        }

    // Generate Question
        if (phase === "start") {
            fetchQuestions();
        }

         if (phase != "readingQuestion") {
            if(rafRef.current)
                cancelAnimationFrame(rafRef.current);
        }
        if (phase === "readingQuestion") {
            setGameStarted(true);
            setTimeLeftMs(QUESTION_TIME_MS);
            const start = performance.now();

            const tick = (now) => {
                const elapsed = now - start;
                const remain = Math.max(0, QUESTION_TIME_MS - elapsed);
                setTimeLeftMs(remain);

                if (remain > 0) 
                    rafRef.current = requestAnimationFrame(tick);
            }
            rafRef.current = requestAnimationFrame(tick);
            return () => {
                if (rafRef.current)
                    cancelAnimationFrame(rafRef.current);
            }
        }
        
    }, [phase])

    return (
        <div className="trivia-page">
            <header className="trivia-header">
                <h1 className="game-name">🤖 AI Powered Trivia</h1>

                <div className="game-toolbar">

                {phase === "reset" || phase === "pickingSettings" ? 
                    <div className="selectors">
                        <label className="field">
                            <span>Category</span>
                            <select id="categorySelect" className="select" value={questionCategory} onChange={handleCategoryChange}>
                                {CATEGORIES.map(c => (<option key={c.value} value={c.value}>{c.label}</option>))}
                            </select>
                        </label>    

                        <label className="field">
                            <span>Difficulty</span>
                            <select id="difficultySelect" className="select" value={questionDifficulty} 
                            onChange={(e) => {
                                setPhase("pickingSettings"); 
                                handleDiffcultyChange(e);
                            }}>
                                {DIFFICULTY.map (d => (<option key={d.value} value={d.value}>{d.label}</option>))}
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
                : 
                    <div className="selectors">
                        <label className="field">
                            <span>Category</span>
                            <span className="select">{questionCategory}</span>
                        </label>    

                        <label className="field">
                            <span>Difficulty</span>
                            <span className="select">{questionDifficulty}</span>
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
                }

                <div className="actions">
                      {phase === "reset" || phase === "pickingSettings" && <StartButton onStart={(validateGameStart)}/>}
                      <button id="resetBtn" className="btn ghost"  disabled={!gameStarted} onClick={() => setPhase("reset")}>Reset</button>
                </div>
                </div>

                {phase != "reset" && phase != "pickingSettings" && 
                <div className="statusbar" role="status" aria-live="polite">
                    <div className="status-item">
                        <span className="label">Question</span>
                        <span id="qIndex" className="value">0/0</span>
                    </div>
                    <div className="status-item">
                        <span className="label">Score</span>
                        <span id="score" className="value">0</span>
                    </div>
                    {phase === "readingQuestion" && 
                        <div className="status-item timer">
                            <span className="label">Time</span>
                            <span id="timeLeft" className="value">{formatMMSS(timeLeftMs)}</span>
                            <div className="timebar">
                            <div id="timeFill" className="timefill" style={{ width: `${(timeLeftMs / QUESTION_TIME_MS) * 100}%` }} />
                            </div>
                        </div>
                    }
                    <div className="status-item ai-badge" title="AI features enabled">AI</div>
                    </div>
                }
            </header>

            <main className="trivia-container">
                <section className="game-holder">
                {/* Question Card */}
                <article className="question-card" aria-live="polite">
                    <div className="q-meta">
                    <span id="qCategory" className="chip">{questionCategory}</span>
                    <span id="qDifficulty" className="chip">{questionDifficulty}</span>
                    </div>
                    <h2 id="questionText" className="question">
                        {!gameStarted ? "Press Start to begin!" : questionAi}
                    </h2>

                    {(phase === "readingQuestion" || phase === "answeredQuestion") && 
                        <div className="">
                            <ul className="choices" role="listbox" aria-labelledby="questionText">
                                {phase === "answeredQuestion" ?
                                    <ul className="choices">
                                        <li><button disabled className={answerAi === choicesAi[0] ? "choice-btn correct " : "choice-btn incorrect"} data-choice="Option-A" onClick={() => PickChoice(choicesAi[0])}>{choicesAi[0]}</button></li>
                                        <li><button disabled className={answerAi === choicesAi[1] ? "choice-btn correct " : "choice-btn incorrect"} data-choice="Option-B" onClick={() => PickChoice(choicesAi[1])}>{choicesAi[1]}</button></li>
                                        <li><button disabled className={answerAi === choicesAi[2] ? "choice-btn correct " : "choice-btn incorrect"} data-choice="Option-C" onClick={() => PickChoice(choicesAi[2])}>{choicesAi[2]}</button></li>
                                        <li><button disabled className={answerAi === choicesAi[3] ? "choice-btn correct " : "choice-btn incorrect"} data-choice="Option-D" onClick={() => PickChoice(choicesAi[3])}>{choicesAi[3]}</button></li>
                                    </ul>
                                : 
                                    <ul className="choices">
                                        <li><button className="choice-btn" data-choice="Option-A" onClick={() => PickChoice(choicesAi[0])}>{choicesAi[0]}</button></li>
                                        <li><button className="choice-btn" data-choice="Option-B" onClick={() => PickChoice(choicesAi[1])}>{choicesAi[1]}</button></li>
                                        <li><button className="choice-btn" data-choice="Option-C" onClick={() => PickChoice(choicesAi[2])}>{choicesAi[2]}</button></li>
                                        <li><button className="choice-btn" data-choice="Option-D" onClick={() => PickChoice(choicesAi[3])}>{choicesAi[3]}</button></li>
                                    </ul>
                                }
                            </ul>
                             <div className="feedback" aria-live="assertive" id="answerFeedback">
                                {phase === "answeredQuestion" && (wrongChoice ? 
                                    <div className="wrong"> 
                                        <p className="wrong-text">
                                             ❌ {userChoice} is wrong. The correct answer was <span className="answer">{answerAi}</span>
                                        </p>
                                        <p className="explanation">
                                            {"💡 " + explainationAi}
                                        </p>
                                    </div> 
                                : 
                                    <div className="correct">
                                        <p className="correct-text">
                                            ✅ {userChoice}, Nice you got it right!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                           
                     }
                    
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