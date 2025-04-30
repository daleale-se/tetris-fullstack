import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import AuthForm from "../components/AuthForm"
import { GUEST_USER, INITIAL_FORM_MODAL } from "../constants"
import { UserContext } from "../context/UserContext"

const Home = () => {

    const {setUserData, userData} = useContext(UserContext)

    const [formModal, setFormModal] = useState(INITIAL_FORM_MODAL)

    const handleRegisterButton = () => {
        setFormModal({
            mode: "register",
            isOpen: true,
        })
    }

    const handleLoginButton = () => {
        setFormModal({
            mode: "login",
            isOpen: true,
        })
    }

    const handleLogoutButton = () => {
        sessionStorage.clear()
        setUserData(GUEST_USER)
    }

  return (
    <div>
        <Link to="/game">play</Link>
        <br />
        <Link to="/dashboard">dashboard</Link>
        <br />
        {
            userData
            ? <div>
                <Link to="/profile">{userData.username}</Link>
                <button onClick={handleLogoutButton}>logout</button>
            </div>
            : <div>
                <button onClick={handleRegisterButton}>register</button>
                <button onClick={handleLoginButton}>login</button>
            </div>
        }
        {
            formModal.isOpen 
            ? <AuthForm 
                setFormModal={setFormModal} 
                formModal={formModal}/> 
            : null
        }
    </div>
  )
}

export default Home