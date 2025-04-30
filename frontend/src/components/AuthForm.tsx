import { FC, useContext, useState } from "react";
import {registerUser, loginUser} from "../services/auth"
import { AuthFormType } from "../types";
import { INITIAL_FORM_INPUT, INITIAL_FORM_MODAL } from "../constants";
import { fetchUser } from "../services/user";
import { UserContext } from "../context/UserContext";


const AuthForm: FC<AuthFormType> = ({setFormModal, formModal}) => {

    const [formInput, setFormInput] = useState(INITIAL_FORM_INPUT)
    const { setUserData } = useContext(UserContext)
    
    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name

        setFormInput(prevData => ({
            ...prevData,
            [key]: e.target.value
        }))
    }

    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (formModal.mode === "login") {
            loginUser(formInput)
            fetchUser(setUserData)
        } else if (formModal.mode === "register") {
            registerUser(formInput)
        }
        
        setFormInput(INITIAL_FORM_INPUT)
        setFormModal(INITIAL_FORM_MODAL)
    }

  return (
    <div>
        <button onClick={() => setFormModal({...formModal, ["isOpen"] : formModal.isOpen!})}>close</button>
        <form>
            <h2>{formModal.mode}</h2>

            <label htmlFor="username">
                <p>username:</p>
                <input 
                    value={formInput["username"]} 
                    type="text" 
                    name="username" 
                    id="username" 
                    onChange={handleInput} 
                    required/>
            </label>
            <label htmlFor="password">
                <p>password:</p>
                <input 
                    value={formInput["password"]} 
                    type="password" 
                    name="password" 
                    id="password" 
                    onChange={handleInput} 
                    required/>
            </label>

            <button type="submit" onClick={handleSubmit}>{formModal.mode}</button>
        </form>
    </div>
  )
}

export default AuthForm