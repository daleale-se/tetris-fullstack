import { useEffect } from "react"
import PiecePreview from "../components/PiecePreview"
import TetrisBoard from "../components/TetrisBoard"
import { useTetrisGame } from "../hooks/useTetrisGame"

const Game = () => {

  const {board, currentPiece, moveLeft, moveRight, rotate, hardDrop } = useTetrisGame()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
  
      switch (e.key) {
        case 'i': rotate(); break;
        case 'k': hardDrop(); break;
        case 'j': moveLeft(); break;
        case 'l': moveRight();break;
        default: break;
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    
  }, [rotate, hardDrop, moveLeft, moveRight]);
  

  return (
    <div>

        <TetrisBoard board={board} currentPiece={currentPiece} />

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