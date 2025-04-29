import { UserInfoType, UserFormType, UserInputType, PieceBagType, GameStateType, Difficulty } from "./types"

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
    { score: 8000, difficulty: Difficulty.IMPOSSIBLE },
    { score: 3000, difficulty: Difficulty.VERY_HARD },
    { score: 1000, difficulty: Difficulty.HARD },
    { score: 500, difficulty: Difficulty.NORMAL },
    { score: 0, difficulty: Difficulty.EASY }
];

export const DIFFICULTIES = {
    [Difficulty.EASY]: 500,
    [Difficulty.NORMAL]: 300,
    [Difficulty.HARD]: 200,
    [Difficulty.VERY_HARD]: 100,
    [Difficulty.IMPOSSIBLE]: 80
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

export const INITIAL_USER_INFO: UserInfoType = {
    username: "",
    token: ""
}

export const INITIAL_USER_FORM: UserFormType = {
    mode: null,
    isOpen: false
}

export const INITIAL_USER_DATA: UserInputType = {
    username: "",
    password: ""
}