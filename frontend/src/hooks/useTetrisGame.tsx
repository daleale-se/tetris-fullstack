import { useEffect, useState } from "react";
import { createEmptyBoard } from "../utils/createEmptyBoard";
import { BOARD_WIDTH, EMPTY_SPACE, PIECES_BAG, PIECES_SHAPES } from "../constants";
import { PieceBagType, PieceType } from "../types";

const rotateShapeToLeft = (shape: string) => {
    const rows = shape.split('\n');
    const maxWidth = Math.max(...rows.map(r => r.length));
  
    return [...Array(maxWidth)].map((_, col) =>
      [...rows].map(row => (row[col] || ' ')).join('')
    ).reverse()
     .map(row => row.trimEnd())
     .join('\n');  
}

const initialPieceState = (name: PieceBagType): PieceType => {
    return {
        shape: PIECES_SHAPES[name],
        position: {
            x: BOARD_WIDTH / 2 - 1,
            y: 0
        }
    }
}

const randomPiece = (): PieceBagType => PIECES_BAG[Math.floor(Math.random()*PIECES_BAG.length)]

const shapeToTwoD = (shape: string) => shape.split("\n").map(row => row.split(""))

const insertPieceToBoard = (currentPiece:PieceType, board:string[][]) => {
    const newBoard = board.map(innerArray => [...innerArray]);
    const shape = shapeToTwoD(currentPiece.shape)
    const pos = currentPiece.position

    for (let i = 0; i < shape.length; ++i) {
        if (pos.y - i >= 0) {
            for (let j = 0; j < shape[0].length; ++j) {
                
                const yTarget = shape.length - 1 - i;
                if (shape[yTarget][j] !== EMPTY_SPACE) {
                    newBoard[pos.y - i][pos.x + j] = shape[yTarget][j];
                }
            }
        }
    }

    return newBoard;
}

const collideOnTheRight = (currentPiece:PieceType, board:string[][]) => {
    const newBoard = board.map(innerArray => [...innerArray]);
    const shape = shapeToTwoD(currentPiece.shape)
    const pos = currentPiece.position

    if (pos.x + shape[0].length > newBoard[0].length - 1){
        return true;
    }

    for (let i = 0; i < shape.length; ++i) {
        for (let j = 0; j < shape[0].length; ++j) {
            const checkY = pos.y - shape.length + 1 + i;
            const checkX = shape[0].length - 1 - j;
            if (shape[i][checkX] !== EMPTY_SPACE) {
                if (checkY >= 0 && newBoard[checkY][pos.x + checkX + 1] !== EMPTY_SPACE) {
                    return true;
                }
                break;
            }
        }
    }

    return false;
}

const collideOnTheLeft = (currentPiece:PieceType, board:string[][]) => {
    const newBoard = board.map(innerArray => [...innerArray]);
    const shape = shapeToTwoD(currentPiece.shape)
    const pos = currentPiece.position

    if (pos.x - 1 < 0){
        return true;
    }

    for (let i = 0; i < shape.length; ++i) {
        for (let j = 0; j < shape[0].length; ++j) {
            const checkY = pos.y - shape.length + 1 + i;
            const checkX = pos.x + j;
            if (shape[i][j] !== EMPTY_SPACE) {
                if (checkY >= 0 && newBoard[checkY][checkX - 1] !== EMPTY_SPACE) {
                    return true;
                }
                break;
            }
        }
    }

    return false;

}

const collideOnTheBottom = (currentPiece:PieceType, board:string[][]) => {
    const newBoard = board.map(innerArray => [...innerArray]);
    const shape = shapeToTwoD(currentPiece.shape)
    const pos = currentPiece.position

    if (pos.y + 1 >= newBoard.length) {
        return true;
    }

    for (let i = 0; i < shape[0].length; ++i) {
        for (let j = 0; j < shape.length; ++j) {
            if (shape[shape.length - 1 - j][i] != EMPTY_SPACE) {
                const nextY = pos.y - j + 1;
                const nextX = pos.x + i;
                if (nextY >= 0 && newBoard[nextY][nextX] != EMPTY_SPACE) {
                    return true;
                }
                break;
            }
        }
    }

    return false;

}

const canMoveExcessToLeft = (piece:PieceType, board:string[][], rightOverflow:number) => {
    
    for (let i = 0; i < rightOverflow; i++) {
        if (collideOnTheLeft(piece, board)) {
            return false
        }
        piece.position.x--;
    }
    
    return true;

}

const getRightOverflow = (piece:PieceType, board:string[][]) => {

    const shape = shapeToTwoD(piece.shape)
    const {position : pos} = piece
    
    if (pos.x + shape[0].length > board[0].length) {
        return pos.x + shape[0].length - board[0].length
    }

    for (let i = 0; i < shape[0].length; i++) {
        for (let j = 0; j < shape.length; j++) {

            if (pos.y - j > 0 && shape[shape.length - 1 - j][1 + i] !== EMPTY_SPACE && board[pos.y - j][pos.x + 1 + i] !== EMPTY_SPACE) {
                return shape[0].length - (1 + i)
            } 
    
        }
    }

    return -1

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
    const [inGameBoard, setInGameBoard] = useState<string[][]>(board);
    
    // Current active piece and next pieces
    const [currentPiece, setCurrentPiece] = useState<PieceType>(initialPieceState(randomPiece()));
    const [nextPieces, setNextPieces] = useState<PieceBagType[]>([randomPiece(), randomPiece()]);
        
    // Game logic functions...
    
    const nextPiece = () => {

        const newBoard = insertPieceToBoard(currentPiece, board)
        setBoard(newBoard)

        const newPiece = randomPiece()
        setCurrentPiece(initialPieceState(nextPieces[0]))
        const [, ...rest] = nextPieces
        setNextPieces([...rest, newPiece])

    }

    const moveLeft = () => {

        if (!collideOnTheLeft(currentPiece, board)) {
            setCurrentPiece(prevPiece => ({
                ...prevPiece,
                position: {
                  ...prevPiece?.position, 
                  x: (prevPiece?.position.x ?? 0) - 1, 
                },
            }));
        }

    }

    const moveRight = () => {

        if (!collideOnTheRight(currentPiece, board)) {
            setCurrentPiece(prevPiece => ({
                ...prevPiece,
                position: {
                  ...prevPiece?.position, 
                  x: (prevPiece?.position.x ?? 0) + 1, 
                },
            }));        
        }

    }

    const rotate = () => {

        const rotatedShape = rotateShapeToLeft(currentPiece.shape)
    
        const rotatedPiece = {
            shape: rotatedShape,
            position: {...currentPiece.position}
        }
    
        const rightOverflow = getRightOverflow(rotatedPiece, board)
    
        if (rightOverflow > 0 && canMoveExcessToLeft(rotatedPiece, board, rightOverflow)) {
            setCurrentPiece(prevPiece => ({
                shape: rotatedShape,
                position: {
                  ...prevPiece?.position, 
                  x: (prevPiece?.position.x ?? 0) - rightOverflow, 
                },
            })); 
        } else if (rightOverflow <= 0) {
            setCurrentPiece(rotatedPiece); 
        }

    }
    
    const drop = () => {
        setCurrentPiece(prevPiece => ({
            ...prevPiece,
            position: {
                ...prevPiece?.position, 
                y: (prevPiece?.position.y ?? 0) + 1, 
            },
        }));
    }

    const canDrop = () => {
        return !collideOnTheBottom(currentPiece, board)
    }

    useEffect(() => {
        const newBoard = insertPieceToBoard(currentPiece, board);
        setInGameBoard(newBoard);

      }, [currentPiece, board]);

    return {
      gameState,
      inGameBoard,
      currentPiece,
      nextPieces,
      moveLeft,
      moveRight,
      rotate,
      nextPiece,
      drop,
      canDrop
    //   hardDrop,
    //   startGame,
    //   pauseGame
    };
}
  