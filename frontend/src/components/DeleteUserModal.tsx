import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { GUEST_USER } from "../constants";

const DeleteUserModal = ({ setDeleteUserModalIsOpen }) => {

  const { setUserData } = useContext(UserContext)

  const navigate = useNavigate();

  const removeUser = async () => {

    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        sessionStorage.removeItem("token");
        setUserData(GUEST_USER)
        navigate("/");
      } else {
        console.error("Error deleting user:", response.status);
      }

      setDeleteUserModalIsOpen(false);

    } catch (error) {

      console.error("Error deleting user:", error);
      setDeleteUserModalIsOpen(false);
      
    }
  };

  const closeModal = () => {
    setDeleteUserModalIsOpen(false);
  };

  return (
    <div>
      <p>do you want to delete your account?</p>
      <button onClick={removeUser}>yes</button>
      <button onClick={closeModal}>no</button>
    </div>
  );
};

export default DeleteUserModal