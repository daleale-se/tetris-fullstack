import { useEffect, useRef } from "react";
import { drawBoard } from "../utils/drawBoard";
import { DROP_TICK_MS } from "../constants";

const TetrisBoard = ({inGameBoard, drop, canDrop, nextPiece}) => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    const gameLoop = setInterval(() => {

      if(canDrop()){
        drop()
      } else {
        nextPiece()
      }

    }, DROP_TICK_MS)

    return () => clearInterval(gameLoop)

  }, [canDrop, drop, nextPiece])

  useEffect(() => {
    
    const canvas = canvasRef.current;
    drawBoard(canvas, inGameBoard)
    
  }, [inGameBoard]);


  return <>
    <canvas ref={canvasRef} width={200} height={400} />
  </>;
}

export default TetrisBoard