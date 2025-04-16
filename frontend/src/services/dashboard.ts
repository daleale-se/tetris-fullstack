import {UserDataType} from "../types"

export const getUsers = async (): Promise<UserDataType[]>  => {
    const response = await fetch(`http://localhost:5000/users/sort`)
    const data = await response.json()
    return data["users"]
}
