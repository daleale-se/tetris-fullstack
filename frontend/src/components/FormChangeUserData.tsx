import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { updateProfile } from "../services/user"

const FormChangeUserData = ({formUserDataModal, setFormUserDataModal}) => {
    
    const [formValues, setFormValues] = useState({
        password: "",
        newUsername: "",
        newPassword: "" 
    })
    const { setUserData } = useContext(UserContext)

    const handleClose = () => {
        setFormUserDataModal({
            mode: "",
            isOpen: false
        })
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const token = sessionStorage.getItem("token")

        if (token) {
            const userData = await updateProfile(token, formValues)
            await setUserData(userData.user)
        }

        handleClose()
        setFormValues({
            password: "",
            newUsername: "",
            newPassword: "" 
        })
    }

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name

        setFormValues(prevData => ({
            ...prevData,
            [key]: e.target.value
        }))

    }

    return (
        <div>
            <button onClick={handleClose}>close</button>
            <h2>Change {formUserDataModal.mode}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="password">
                    <p>password</p>
                    <input 
                        type="password" 
                        name="password"
                        value={formValues["password"]} 
                        onChange={handleInput}/>
                </label>
                {
                    formUserDataModal.mode === "password"
                    ? <label htmlFor="newPassword">
                        <p>new password</p>
                        <input 
                            value={formValues["newPassword"]} 
                            type="password" 
                            name="newPassword" 
                            onChange={handleInput}/>
                    </label>
                    : <label htmlFor="newUsername">
                        <p>new username</p>
                        <input 
                            value={formValues["newUsername"]}
                            type="text" 
                            name="newUsername"
                            onChange={handleInput}/>
                    </label>
                }
                <button type="submit">update {formUserDataModal.mode}</button>
            </form>

        </div>)
}

export default FormChangeUserData