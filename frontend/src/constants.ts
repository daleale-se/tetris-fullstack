import { UserInfoType, UserFormType, UserInputType } from "./types"

export const BOARD_WIDTH = 10
export const BOARD_HEIGHT = 20

export const EMPTY_SPACE = " "
export const PIECES_BAG = ['I','O','L','J','T','S','Z']

export const PIECES_SHAPES = {
    I: "IIII",
    O: "OO\nOO",
    L: "  L\nLLL",
    J: "JJJ\n  J",
    T: "TTT\n T ",
    S: " SS\nSS ",
    Z: "ZZ \n ZZ"
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