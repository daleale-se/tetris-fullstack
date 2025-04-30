import { LoginUserType, RegisterUserType } from "../types"

const registerUser: RegisterUserType = (data) => {
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

const loginUser: LoginUserType = (data) => {
    fetch(`http://localhost:5000/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then(data => {
        sessionStorage.setItem("token", data["token"])
    })
}

export {
    registerUser,
    loginUser
}
