import { useState } from "react";
import { createEmptyBoard } from "../utils/createEmptyBoard";
import { BOARD_HEIGHT, BOARD_WIDTH, PIECES_BAG, PIECES_SHAPES } from "../constants";

type PieceBagType = 'I'|'O'|'J'|'L'|'T'|'S'|'Z'

type PieceType = {
    shape: string,
    position: {
        x: number,
        y: number
    }
}

const rotateShapeToLeft = (shape:string) => {
    const rows = shape.split('\n');
    const maxWidth = Math.max(...rows.map(r => r.length));
  
    return [...Array(maxWidth)].map((_, col) =>
      [...rows].map(row => (row[col] || ' ')).join('')
    ).reverse()
     .map(row => row.trimEnd())
     .join('\n');  
}

const initialPieceState = (name: PieceBagType) => {
    return {
        shape: PIECES_SHAPES[name],
        position: {
            x: BOARD_WIDTH / 2 - 1,
            y: BOARD_HEIGHT - 1
        }
    }
}

const randomPiece = (): PieceBagType => {
    return PIECES_BAG[Math.floor(Math.random()*PIECES_BAG.length)] as PieceBagType
}


export function useTetrisGame() {
    // Core game state
    const [gameState, setGameState] = useState({
      isGameOver: false,
      score: 0,
      difficulty: 1,
      linesCleared: 0
    });
    
    // Board state (typically a 2D array)
    const [board, setBoard] = useState<string[][]>(createEmptyBoard());
    const [inGameBoard, setInGameBoard] = useState<string[][]>();
    
    // Current active piece and next pieces
    const [currentPiece, setCurrentPiece] = useState<PieceType>();
    const [nextPieces, setNextPieces] = useState<PieceBagType[]>([]);
    
    // Game loop timing reference
    // const lastTickRef = useRef(Date.now());
    // const requestIdRef = useRef(null);
    
    // Game logic functions...
    
    const useNextPiece = () => {
        const newPiece = randomPiece()
    
        if (nextPieces.length > 0) {
            setCurrentPiece(initialPieceState(nextPieces[0]))
            const [, ...rest] = nextPieces
            setNextPieces([...rest, newPiece])
        } else {
            setCurrentPiece(initialPieceState(newPiece))
            const pieces = [randomPiece(), randomPiece()]
            setNextPieces(pieces)
        }
    }

    const moveLeft = () => {
        setCurrentPiece(prevPiece => {

            if (prevPiece) {
                return {
                    ...prevPiece,
                    position: {
                        ...prevPiece.position,
                        x: prevPiece.position.x - 1
                    }
                }
            }

        })
    }

    const moveRight = () => {
        setCurrentPiece(prevPiece => {

            if (prevPiece) {
                return {
                    ...prevPiece,
                    position: {
                        ...prevPiece.position,
                        x: prevPiece.position.x + 1
                    }
                }
            }

        })
    }

    const rotate = () => {
        const rotatedShape = rotateShapeToLeft(currentPiece?.shape)

        setCurrentPiece(prevPiece => {

            if (prevPiece) {
                return {
                    ...prevPiece,
                    shape: rotatedShape
                }
            }

        })
    
    }
    
    const drop = () => {
        setCurrentPiece(prevPiece => {

            if (prevPiece) {
                return {
                    ...prevPiece,
                    position: {
                        ...prevPiece.position,
                        y: prevPiece.position.x - 1
                    }
                }
            }

        })

    }

    return {
      gameState,
      board,
      currentPiece,
      nextPieces,
      moveLeft,
      moveRight,
      rotate,
      useNextPiece,
      drop
    //   hardDrop,
    //   startGame,
    //   pauseGame
    };
}
  