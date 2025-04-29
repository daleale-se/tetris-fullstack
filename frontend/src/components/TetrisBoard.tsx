import { useEffect, useRef} from "react";
import { drawBoard } from "../utils/canvasLogic";
import { insertPieceToBoard } from "../utils/tetrisLogic";

const TetrisBoard = ({ board, currentPiece, moveLeft, moveRight, rotate, hardDrop, pauseGame, softDrop}) => {
  const canvasRef = useRef(null);

  const mergedBoard = insertPieceToBoard(currentPiece, board);

  useEffect(() => {

    const canvas = canvasRef.current;
    drawBoard(canvas, mergedBoard);
  
  }, [mergedBoard]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
  
      switch (e.key) {
        case 'i': rotate(); break;
        case 'k': softDrop(); break;
        case ' ': hardDrop(); break;
        case 'j': moveLeft(); break;
        case 'l': moveRight(); break;
        case 'p': pauseGame(); break;
        default: break;
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [rotate, hardDrop, moveLeft, moveRight, pauseGame]);

  
  return <canvas ref={canvasRef} width={200} height={400} />;
};

export default TetrisBoard;
