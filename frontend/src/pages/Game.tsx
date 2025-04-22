import PiecePreview from "../components/PiecePreview"
import TetrisBoard from "../components/TetrisBoard"
import { useTetrisGame } from "../hooks/useTetrisGame"

const Game = () => {

  const {board, currentPiece, moveLeft, moveRight, rotate, hardDrop, gameState } = useTetrisGame()
  
  return (
    <div>

        <TetrisBoard board={board} currentPiece={currentPiece} moveLeft={moveLeft} moveRight={moveRight} rotate={rotate} hardDrop={hardDrop}/>

        <div className="user-info">
          <p>
            <span>username</span>
            <span>(3)</span>
          </p>
          {/* <p><span>guest</span></p> */}
        </div>

        <div className="game-info">
          <p>score: {gameState.score}</p>
          <PiecePreview/>
        </div>

        <div className="game-controls">
          <button>help</button>
          <br />
          {
            gameState.isGameOver 
            ? <button>new game</button>
            : <button>pause</button> 
          }
          <br />
          <button>home</button>
          <br />
        </div>

    </div>
  )
}

export default Game