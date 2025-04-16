import {UserDataType} from "../types"

export const getUserData = async (token:string): Promise<UserDataType>  => {
    const response = await fetch(`http://localhost:5000/users`, {
        method: "GET",
        headers: {
        'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data["user"]
}
