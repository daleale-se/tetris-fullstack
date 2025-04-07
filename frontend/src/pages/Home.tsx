import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AuthForm from "../components/AuthForm"

const Home = () => {

    const [username, setUsername] = useState("")
    const [token, setToken] = useState("")
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [mode, setMode] = useState("")

    useEffect(() => {

        const sessionUsername = sessionStorage.getItem("username")
        const sessionToken = sessionStorage.getItem("token")

        if (sessionUsername && sessionToken) {
            setUsername(sessionUsername)
            setToken(sessionToken)
            console.log(token)
        }

    }, [])

    const handleRegisterButton = () => {
        setMode("register")
        setModalIsOpen(true)
    }

    const handleLoginButton = () => {
        setMode("login")
        setModalIsOpen(true)
    }

    const handleLogoutButton = () => {
        sessionStorage.clear()
        setUsername("")
        setToken("")
    }

  return (
    <div>
        <Link to="/game">play</Link>
        <br />
        <Link to="/dashboard">dashboard</Link>
        <br />
        {username
        ?
        <div>
            <Link to="/profile">{username}</Link>
            <button onClick={handleLogoutButton}>logout</button>
        </div>
        : <div>
            <button onClick={handleRegisterButton}>register</button>
            <button onClick={handleLoginButton}>login</button>
        </div>
        }
        {modalIsOpen ? <AuthForm setModalIsOpen={setModalIsOpen} mode={mode} setMode={setMode} setUsername={setUsername} setToken={setToken}/> : null}
    </div>
  )
}

export default Home