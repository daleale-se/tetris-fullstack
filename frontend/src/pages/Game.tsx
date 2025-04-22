import NextPiecePreview from "../components/NextPiecePreview"
import TetrisBoard from "../components/TetrisBoard"
import { useTetrisGame } from "../hooks/useTetrisGame"

const Game = () => {

  const {board, currentPiece, moveLeft, moveRight, rotate, hardDrop, gameState, pauseGame, newGame, nextPieces} = useTetrisGame()
  
  return (
    <div>

        <TetrisBoard board={board} currentPiece={currentPiece} moveLeft={moveLeft} moveRight={moveRight} rotate={rotate} hardDrop={hardDrop} pauseGame={pauseGame}/>

        <div className="user-info">
          <p>
            <span>username</span>
            <span>(3)</span>
          </p>
          {/* <p><span>guest</span></p> */}
        </div>

        <div className="game-info">
          <p>score: {gameState.score}</p>
          <NextPiecePreview nextPieces={nextPieces}/>
        </div>

        <div className="game-controls">
          <button>help</button>
          <br />
          {
            gameState.isGameOver 
            ? <button onClick={newGame}>new game</button>
            : <button onClick={pauseGame}>
              {
                gameState.isGamePaused 
                ? "continue"
                : "pause"
              }
            </button> 
          }
          <br />
          <button>home</button>
          <br />
        </div>

    </div>
  )
}

export default Game