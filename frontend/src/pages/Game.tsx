import PiecePreview from "../components/PiecePreview"
import TetrisCanvas from "../components/TetrisBoard"
import { useTetrisGame } from "../hooks/useTetrisGame"

const Game = () => {

  const {inGameBoard, drop, canDrop, nextPiece, moveLeft, moveRight, rotate, hardDrop} = useTetrisGame()

  return (
    <div>

        <TetrisCanvas inGameBoard={inGameBoard} drop={drop} canDrop={canDrop} nextPiece={nextPiece}/>

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
          <button onClick={moveLeft}>move left</button>
          <button onClick={moveRight}>move right</button>
          <button onClick={rotate}>rotate</button>
          <button onClick={hardDrop}>hard drop</button>
        </div>

    </div>
  )
}

export default Game