import "../pages/GameView.css";

const GameView = () => {
    return (
    <div className="game-container">
        <h1 className="game-name">tic tac toe</h1>
            <div className="game-board">
                <div className="column1">
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                </div>
                <div classname="column2">
                    <div className="cell">4</div>
                    <div className="cell">5</div>
                    <div className="cell">6</div>
                </div>
                <div classname="column3">
                    <div className="cell">7</div>
                    <div className="cell">8</div>
                    <div className="cell">9</div>
                </div>
            </div>
    </div>
    )
}

export default GameView;