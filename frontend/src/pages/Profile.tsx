import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Profile = () => {

  const { userData } = useContext(UserContext)

  return (
    <div>
      <img src={userData?.imagePath} alt={userData?.username+"_img"} width={80}/>
      <h2>{userData?.username} <button>change username</button></h2>
      <p>Level: {userData?.level}</p>
      <p>XP: {userData?.xp} / {userData?.limitXp}</p>
      <p>High score: {userData?.highScore}</p>
      <p>Average score: {userData?.averageScore}</p>
      <p>Total lines cleared: {userData?.totalLinesCleared}</p>
      <p>Games played: {userData?.totalGames}</p>
      <button>change password</button>
      <button>delete account</button>
    </div>
  )
}

export default Profile