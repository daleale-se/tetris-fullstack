import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AuthForm from "../components/AuthForm"
import { INITIAL_USER_FORM, INITIAL_USER_INFO } from "../constants"

const Home = () => {

    const [userInfo, setUserInfo] = useState(INITIAL_USER_INFO)
    const [userForm, setUserForm] = useState(INITIAL_USER_FORM)

    useEffect(() => {

        const username = sessionStorage.getItem("username")
        const token = sessionStorage.getItem("token")

        if (username && token) {
            setUserInfo({
                username,
                token,
            })
        }

    }, [])

    const handleRegisterButton = () => {
        setUserForm({
            mode: "register",
            isOpen: true,
        })
    }

    const handleLoginButton = () => {
        setUserForm({
            mode: "login",
            isOpen: true,
        })
    }

    const handleLogoutButton = () => {
        sessionStorage.clear()
        setUserInfo(INITIAL_USER_INFO)
    }

  return (
    <div>
        <Link to="/game">play</Link>
        <br />
        <Link to="/dashboard">dashboard</Link>
        <br />
        {userInfo.username
        ?
        <div>
            <Link to="/profile">{userInfo.username}</Link>
            <button onClick={handleLogoutButton}>logout</button>
        </div>
        : <div>
            <button onClick={handleRegisterButton}>register</button>
            <button onClick={handleLoginButton}>login</button>
        </div>
        }
        {userForm.isOpen ? <AuthForm setUserInfo={setUserInfo} setUserForm={setUserForm} userForm={userForm}/> : null}
    </div>
  )
}

export default Home