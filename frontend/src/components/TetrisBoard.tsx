import { useEffect, useRef} from "react";
import { drawBoard } from "../utils/drawBoard";
import { insertPieceToBoard } from "../utils/tetrisLogic";

const TetrisBoard = ({ board, currentPiece }) => {
  const canvasRef = useRef(null);

  const mergedBoard = insertPieceToBoard(currentPiece, board);

  useEffect(() => {

    const canvas = canvasRef.current;
    drawBoard(canvas, mergedBoard);
  
  }, [mergedBoard]);
  
  return <canvas ref={canvasRef} width={200} height={400} />;
};

export default TetrisBoard;
