export type UserInfoType = {
    username: string,
    token: string
}

export type RegisterUserType = (data: UserDataType) => void

export type LoginUserType = (data: UserDataType, setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>) => void


export type UserFormType = {
    mode: "register" | "login" | null,
    isOpen: boolean
}

export type AuthFormType = {
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>, 
    setUserForm: React.Dispatch<React.SetStateAction<UserFormType>>, 
    userForm: UserFormType
}

export type UserDataType = {
    username: string,
    password: string
}

