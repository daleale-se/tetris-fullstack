import { useEffect, useRef, useMemo, useLayoutEffect} from "react";
import { drawBoard } from "../utils/drawBoard";
import { DROP_TICK_MS, EMPTY_SPACE } from "../constants";
import { shapeToTwoD } from "../hooks/useTetrisGame";
import { PieceType } from "../types";

function mergeBoardAndPiece(piece: PieceType, board: string[][]): string[][] {
  const merged = board.map(row => [...row]); // deep copy

  const shape = shapeToTwoD(piece.shape);
  const pos = piece.position;

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== EMPTY_SPACE) {
        const boardY = pos.y - (shape.length - 1) + y;
        const boardX = pos.x + x;
        if (boardY >= 0 && boardY < merged.length && boardX >= 0 && boardX < merged[0].length) {
          merged[boardY][boardX] = shape[y][x];
        }
      }
    }
  }

  return merged;
}


const TetrisBoard = ({ board, currentPiece, drop, canDrop, nextPiece }) => {

  const canvasRef = useRef(null);

  const mergedBoard = useMemo(() => mergeBoardAndPiece(currentPiece, board), [currentPiece, board]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    drawBoard(canvas, mergedBoard);
  }, [mergedBoard]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (canDrop()) {
        drop();
      } else {
        nextPiece();
      }
    }, DROP_TICK_MS);

    return () => clearInterval(intervalId);
  }, [canDrop, drop, nextPiece, board]);

  return <canvas ref={canvasRef} width={200} height={400} />;
};


// const TetrisBoard = ({inGameBoard, drop, canDrop, nextPiece}) => {
  
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {

//     const gameLoop = setInterval(() => {

//       if(canDrop()){
//         drop()
//       } else {
//         nextPiece()
//       }

//     }, DROP_TICK_MS)

//     return () => clearInterval(gameLoop)

//   }, [canDrop, drop, nextPiece])

//   useEffect(() => {
    
//     const canvas = canvasRef.current;
//     drawBoard(canvas, inGameBoard)
    
//   }, [inGameBoard]);


//   return <>
//     <canvas ref={canvasRef} width={200} height={400} />
//   </>;
// }

export default TetrisBoard