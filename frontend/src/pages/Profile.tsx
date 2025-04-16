import { useEffect, useState } from "react"
import {UserDataType} from "../types"
import { getUserData } from "../services/user"

const Profile = () => {

  const [userData, setUserData] = useState<UserDataType>()

  useEffect(() => {

    const fetchUser = async () => {
      const token = sessionStorage.getItem("token")
      if (token) {
        const usersData: UserDataType = await getUserData(token)
        setUserData(usersData)
      }
    }

    fetchUser()

  }, [])

  return (
    <div>
      <img src={userData?.image_path} alt={userData?.username+"_img"} />
      <h2>{userData?.username} <button>change username</button></h2>
      <p>Level: 2</p>
      <p>XP: 35</p>
      <p>High score: {userData?.score}</p>
      <p>Average score: 1000</p>
      <p>Total lines cleared: 34</p>
      <p>Games played: 9</p>
      <button>change password</button>
      <button>delete account</button>
    </div>
  )
}

export default Profile