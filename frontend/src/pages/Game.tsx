import { useContext } from "react"
import NextPiecePreview from "../components/NextPiecePreview"
import TetrisBoard from "../components/TetrisBoard"
import { UserContext } from "../context/UserContext"
import { useTetrisGame } from "../hooks/useTetrisGame"

const Game = () => {

  const {board, currentPiece, moveLeft, moveRight, rotate, hardDrop, gameState, pauseGame, newGame, nextPieces, softDrop} = useTetrisGame()
  const { userData } = useContext(UserContext)  

  return (
    <div style={{display: "flex"}}>

        <TetrisBoard board={board} currentPiece={currentPiece} moveLeft={moveLeft} moveRight={moveRight} rotate={rotate} hardDrop={hardDrop} pauseGame={pauseGame} softDrop={softDrop}/>

        <div style={{display:"flex", flexDirection:"column"}}>

          <div className="game-info">
            <NextPiecePreview nextPieces={nextPieces}/>
            <p>score: {gameState.score}</p>
            <p>difficulty: {gameState.difficulty}</p>
          </div>

          {
            userData 
            ? <div className="user-info">
                <p>
                  <span>{userData?.username}</span>
                  <span>({userData?.level})</span>
                </p>
                <p>xp: {userData?.xp} / {userData?.limitXp}</p>
              </div>
            : <div>
                <p>playing as guest</p>
              </div>
          }

          <div className="game-controls" style={{display:"flex", flexDirection:"column"}}>
            <button>help</button>
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
            <button>home</button>
          </div>

        </div>

    </div>
  )
}

export default Game