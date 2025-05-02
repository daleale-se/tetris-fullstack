import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import FormChangeUserData from "../components/FormChangeUserData"

const Profile = () => {

  const { userData } = useContext(UserContext)

  const [formUserDataModal, setFormUserDataModal] = useState({mode: "", isOpen: false})
  // const [formDeleteUserModal, setFormDeleteUserModal] = useState()

  const handleChangeUsername = () => {
      setFormUserDataModal({
          mode: "username",
          isOpen: true,
      })
  }

  // const handleChangePassword = () => {
  //     setFormUserDataModal({
  //         mode: "password",
  //         isOpen: true,
  //     })
  // }

  return (
    <div>
      <div>

        <div>
          <img src={userData?.imagePath} alt={userData?.username+"_img"} width={80}/>
          <button>change image</button>
        </div>

        <div>
          <h2>{userData?.username}</h2>
          <button onClick={handleChangeUsername}>change username</button>
        </div>

        <p>Level: {userData?.level}</p>
        <p>XP: {userData?.xp} / {userData?.limitXp}</p>
        <p>High score: {userData?.highScore}</p>
        <p>Average score: {userData?.averageScore}</p>
        <p>Total lines cleared: {userData?.totalLinesCleared}</p>
        <p>Games played: {userData?.totalGames}</p>
        
        <div>
          <button>change password</button>
          <button>delete account</button>
        </div>

      </div>

      {
        formUserDataModal.isOpen
        ? <FormChangeUserData 
            formUserDataModal={formUserDataModal} 
            setFormUserDataModal={setFormUserDataModal}
          />
        : null
      }
      

    </div>
  )
}

export default Profile