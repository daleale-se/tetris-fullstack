import { FC, useState } from "react";
import {registerUser, loginUser} from "../services/user"
import { AuthFormType } from "../types";
import { INITIAL_USER_DATA, INITIAL_USER_INFO } from "../constants";


const AuthForm: FC<AuthFormType> = ({setUserInfo, setUserForm, userForm}) => {

    const [data, setData] = useState(INITIAL_USER_DATA)

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name

        setData(prevData => ({
            ...prevData,
            [key]: e.target.value
        }))
    }

    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const actions = {
            register: () => registerUser(data),
            login: () => loginUser(data, setUserInfo),
        }
    
        actions[userForm.mode as 'register' | 'login']()

        setData(INITIAL_USER_DATA)
        setUserInfo(INITIAL_USER_INFO)
    }

  return (
    <div>
        <button onClick={() => setUserForm({...userForm, ["isOpen"] : userForm.isOpen!})}>close</button>
        <form>
            <h2>{userForm.mode}</h2>

            <label htmlFor="username">
                <p>username:</p>
                <input value={data["username"]} type="text" name="username" onChange={handleInput} required/>
            </label>
            <label htmlFor="password">
                <p>password:</p>
                <input value={data["password"]} type="password" name="password" onChange={handleInput} required/>
            </label>

            <button type="submit" onClick={handleSubmit}>{userForm.mode}</button>
        </form>
    </div>
  )
}

export default AuthForm