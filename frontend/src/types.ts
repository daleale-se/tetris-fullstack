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
  score: number,
  image_path: string
}

export type PieceBagType = 'I'|'O'|'J'|'L'|'T'|'S'|'Z'

export type PieceType = {
    shape: string,
    position: {
        x: number,
        y: number
    }
}
