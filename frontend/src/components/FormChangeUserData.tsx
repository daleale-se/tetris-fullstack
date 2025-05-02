import { useState } from "react"

const FormChangeUserData = ({formUserDataModal, setFormUserDataModal}) => {

    const handleClose = () => {
        setFormUserDataModal({
            mode: "",
            isOpen: false
        })
    }

    return (
        <div>
            <button onClick={handleClose}>close</button>
            <h2>Change </h2>
            <form>
                <label htmlFor="">
                    <p>password</p>
                    <input type="text" />
                </label>
                {
                    formUserDataModal.mode === "password"
                    ? <label htmlFor="new-password">
                        <p>new password</p>
                        <input type="text" name="new-password"/>
                    </label>
                    : <label htmlFor="new-username">
                        <p>new username</p>
                        <input type="text" name="new-username"/>
                    </label>
                }
                <button type="submit">update {formUserDataModal.mode}</button>
            </form>

        </div>)
}

export default FormChangeUserData