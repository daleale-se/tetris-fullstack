import { BOARD_HEIGHT, BOARD_WIDTH, EMPTY_SPACE } from "../constants";

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