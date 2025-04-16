import PiecePreview from "../components/PiecePreview"
import TetrisCanvas from "../components/TetrisCanvas"

const Game = () => {
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

    </div>
  )
}

export default Game