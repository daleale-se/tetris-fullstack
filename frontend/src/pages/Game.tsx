import PiecePreview from "../components/PiecePreview"
import TetrisCanvas from "../components/TetrisBoard"
import { useTetrisGame } from "../hooks/useTetrisGame"

const Game = () => {

  const {currentPiece, nextPieces, useNextPiece, moveLeft, moveRight, rotate, drop, printBoard, updatePiece} = useTetrisGame()

  return (
    <div>
      
        <TetrisCanvas/>	

        <div className="user-info">
          <p>
            <span>username</span>
            <span>(3)</span>
          </p>
          {/* <p><span>guest</span></p> */}
        </div>

        <div className="game-info">
          <p>score: 1200</p>
          <PiecePreview/>
        </div>

        <div className="game-controls">
          <button>help</button>
          <br />
          <button>pause (p)</button>
          <br />
          <button>home</button>
          <br />
          <button>new game</button>
        </div>

        <div>
          {/* <button onClick={() => console.log(currentPiece)}>show current piece</button>
          <button onClick={() => console.log(nextPieces)}>show next pieces</button> */}
          <button onClick={printBoard}>show board</button>
          <button onClick={updatePiece}>update piece</button>
          <button onClick={useNextPiece}>use next piece</button>
          <button onClick={moveLeft}>move left</button>
          <button onClick={moveRight}>move right</button>
          <button onClick={drop}>drop</button>
          <button onClick={rotate}>rotate</button>
        </div>

    </div>
  )
}

export default Game