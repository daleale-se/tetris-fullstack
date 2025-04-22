import { BOARD_HEIGHT, BOARD_WIDTH, EMPTY_SPACE, PIECES_BAG, PIECES_SHAPES } from "../constants";
import { PieceBagType, PieceType } from "../types";

export const createEmptyBoard = () => {
    const board: string[][] = []

    for (let i = 0; i < BOARD_HEIGHT; i++) {
        const row: string[] = []        
        for (let j = 0; j < BOARD_WIDTH; j++) {
            row.push(EMPTY_SPACE)
        }
        board.push(row)
    }

    return board
}

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

const insertPieceToBoard = (piece:PieceType, board:string[][]) => {
    const newBoard = board.map(innerArray => [...innerArray]);
    const shape = shapeToTwoD(piece.shape)
    const pos = piece.position

    for (let i = 0; i < shape.length; ++i) {
        if (0 <= pos.y - i) {
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

const collideOnTheRight = (piece:PieceType, board:string[][]) => {
    const newBoard = board.map(innerArray => [...innerArray]);
    const shape = shapeToTwoD(piece.shape)
    const pos = piece.position

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

const collideOnTheLeft = (piece:PieceType, board:string[][]) => {
    const newBoard = board.map(innerArray => [...innerArray]);
    const shape = shapeToTwoD(piece.shape)
    const pos = piece.position

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

const collideOnTheBottom = (piece:PieceType, board:string[][]) => {
    const newBoard = board.map(innerArray => [...innerArray]);
    const shape = shapeToTwoD(piece.shape)
    const pos = piece.position

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

const rowIsFilled = (row: string[]) => row.indexOf(EMPTY_SPACE) === -1;

const emptyRow = () => new Array(BOARD_WIDTH).fill(EMPTY_SPACE);

const removeCompletedRows = (board: string[][]) => {

    const newBoard = JSON.parse(JSON.stringify(board)) as string[][];
    let i = newBoard.length - 1;
    let completedRows = 0;
    
    while (i >= 0) {
        const row = newBoard[i]
        if (rowIsFilled(row)) {
            newBoard.splice(i, 1);
            newBoard.unshift(emptyRow())
            completedRows++;
        } else {
            i--;
        }
    }

    return {
        board: newBoard,
        completedRows,
    }
    
}

const pieceFitInTheBoard = (piece:PieceType) => {
    
    const shape = shapeToTwoD(piece.shape)
    const pos = piece.position

    for (let i = 0; i < shape.length; i++) {
        if (pos.y - i < 0) {
            return false
        } 
    }

    return true;

}


export {
    rotateShapeToLeft,
    initialPieceState,
    randomPiece,
    shapeToTwoD,
    insertPieceToBoard,
    collideOnTheRight,
    collideOnTheLeft,
    collideOnTheBottom,
    canMoveExcessToLeft,
    getRightOverflow,
    removeCompletedRows,
    pieceFitInTheBoard
}