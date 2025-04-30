import { FormModalType, FormInputType, PieceBagType, GameStateType, Difficulty } from "./types"

export const BOARD_WIDTH = 10
export const BOARD_HEIGHT = 20

export const EMPTY_SPACE = "_"
export const PIECES_BAG: PieceBagType[] = ['I','O','L','J','T','S','Z']

export const PIECES_SHAPES = {
    I: "IIII",
    O: "OO\nOO",
    L: "__L\nLLL",
    J: "JJJ\n__J",
    T: "TTT\n_T_",
    S: "_SS\nSS_",
    Z: "ZZ_\n_ZZ"
}

export const BLOCK_SIZE = 20;

export const DIFFICULTY_THRESHOLDS = [
    { score: 6000, difficulty: Difficulty.IMPOSSIBLE },
    { score: 3000, difficulty: Difficulty.VERY_HARD },
    { score: 1500, difficulty: Difficulty.HARD },
    { score: 500, difficulty: Difficulty.NORMAL },
    { score: 0, difficulty: Difficulty.EASY }
];

export const DIFFICULTIES = {
    [Difficulty.EASY]: 700,
    [Difficulty.NORMAL]: 500,
    [Difficulty.HARD]: 350,
    [Difficulty.VERY_HARD]: 225,
    [Difficulty.IMPOSSIBLE]: 100
}

export const XP_BY_DIFFICULTY = {
    [Difficulty.EASY]: 20,
    [Difficulty.NORMAL]: 40,
    [Difficulty.HARD]: 100,
    [Difficulty.VERY_HARD]: 220,
    [Difficulty.IMPOSSIBLE]: 500
}

export const FPS = 60;

export const SCORE = 50

export const INITIAL_GAME_STATE: GameStateType = {
    isGameOver: false,
    isGamePaused: false,
    score: 0,
    difficulty: Difficulty.EASY,
    linesCleared: 0
}

export const PIECES_COLORS = {
    _: "white",
    I: "green",
    O: "yellow",
    L: "red",
    J: "pink",
    T: "purple",
    S: "blue",
    Z: "cyan"
}

export const INITIAL_FORM_MODAL: FormModalType = {
    mode: null,
    isOpen: false
}

export const INITIAL_FORM_INPUT: FormInputType = {
    username: "",
    password: ""
}

export const GUEST_USER = null