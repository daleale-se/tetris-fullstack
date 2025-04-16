import {UserDataType} from "../types"

export const fetchUsers = async (): Promise<UserDataType[]>  => {
    const response = await fetch(`http://localhost:5000/users/sort`)
    const users = await response.json()
    return users["users"]
}

// method: "GET",
// headers: {
//   'Authorization': `Bearer ${token}`
// }
