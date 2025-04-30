import {UserDataType} from "../types"

export const getUserData = async (token:string): Promise<UserDataType>  => {
    const response = await fetch(`http://localhost:5000/users`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
    const userData = await response.json()
    return userData
}

export const updateUserStats = async (token:string, payload): Promise<UserDataType>  => {
    const response = await fetch(`http://localhost:5000/users/update-stats`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })
    const userData = await response.json()
    return userData
}

export const fetchUser = async (setUserData) => {

  const token = sessionStorage.getItem("token")

  if (token) {
    const usersData: UserDataType = await getUserData(token)
    setUserData(usersData)
  }
  
}

