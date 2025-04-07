import { useState } from "react"

const registerUser = (data) => {
    fetch(`http://localhost:5000/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

const loginUser = (data, setUsername, setToken) => {
    fetch(`http://localhost:5000/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then(data => {
        setUsername(data["username"])
        setToken(data["token"])
        sessionStorage.setItem("username", data["username"])
        sessionStorage.setItem("token", data["token"])
    })
}


const AuthForm = ({setModalIsOpen, mode, setMode, setUsername, setToken}) => {

    const [data, setData] = useState({
        "username":"",
        "password":""
    })

    const handleInput = (e) => {
        const key = e.target.name
        setData(prevData => ({
            ...prevData,
            [key]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (mode == "register") {
            registerUser(data)
        } else {
            loginUser(data, setUsername, setToken)
        }

        setData({
            "username":"",
            "password":""
        })

        setMode("")
        setModalIsOpen(false)
    }

  return (
    <div>
        <button onClick={() => setModalIsOpen(false)}>close</button>
        <form>
            <h2>{mode}</h2>

            <label htmlFor="username">
                <p>username:</p>
                <input value={data["username"]} type="text" name="username" onChange={e => handleInput(e)}/>
            </label>
            <label htmlFor="password">
                <p>password:</p>
                <input value={data["password"]} type="password" name="password" onChange={e => handleInput(e)}/>
            </label>

            <button type="submit" onClick={handleSubmit}>{mode}</button>
        </form>
    </div>
  )
}

export default AuthForm