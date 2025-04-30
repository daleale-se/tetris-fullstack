export type UserInfoType = {
    username: string,
    token: string
}

export type RegisterUserType = (data: UserInputType) => void

export type LoginUserType = (data: UserInputType, setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>) => void

export type UserFormType = {
    mode: "register" | "login" | null,
    isOpen: boolean
}

export type AuthFormType = {
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>, 
    setUserForm: React.Dispatch<React.SetStateAction<UserFormType>>, 
    userForm: UserFormType
}

export type UserInputType = {
    username: string,
    password: string
}

export type UserDataType = {
  username: string,
  highScore: number,
  imagePath: string,
  level: number,
  xp: number,
  limitXp: number,
  averageScore: number,
  totalLinesCleared: number,
  totalGames: number
}

export type PieceBagType = 'I'|'O'|'J'|'L'|'T'|'S'|'Z'

export type PieceType = {
    shape: string,
    position: {
        x: number,
        y: number
    }
}

export enum Difficulty {
    EASY = "easy",
    NORMAL = "normal",
    HARD = "hard",
    VERY_HARD = "very hard",
    IMPOSSIBLE = "impossible"
}


export type GameStateType = {
    isGameOver: boolean,
    isGamePaused: boolean,
    score: 0,
    difficulty: Difficulty,
    linesCleared: 0
}