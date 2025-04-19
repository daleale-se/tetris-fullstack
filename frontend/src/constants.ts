import { UserInfoType, UserFormType, UserInputType, PieceBagType } from "./types"

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

export const DROP_TICK_MS = 600

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