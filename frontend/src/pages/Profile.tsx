import { useContext, useRef, useState } from "react"
import { UserContext } from "../context/UserContext"
import FormChangeUserData from "../components/FormChangeUserData"
import DeleteUserModal from "../components/DeleteUserModal"

const Profile = () => {

  const { userData, setUserData } = useContext(UserContext)

  const [formUserDataModal, setFormUserDataModal] = useState({mode: "", isOpen: false})
  const [deleteUserModalIsOpen, setDeleteUserModalIsOpen] = useState(false)

  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);
  const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

  const handleChangeUsername = () => {
      setFormUserDataModal({
          mode: "username",
          isOpen: true,
      })
  }

  const handleChangePassword = () => {
      setFormUserDataModal({
          mode: "password",
          isOpen: true,
      })
  }

  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setUploadError(`Image size exceeds the limit of ${MAX_IMAGE_SIZE_BYTES / (1024 * 1024)}MB.`);
      return;
    }

    setUploadError("");

    const formData = new FormData();
    formData.append("image", file);

    const token = sessionStorage.getItem("token")

    try {

      const response = await fetch("http://localhost:5000/uploads", {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`
        },    
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        await setUserData({ ...userData, imagePath: data.imagePath });
        alert("Image uploaded successfully!");

      } else {

        console.error("Error uploading image:", response.status);
        setUploadError("Failed to upload image. Please try again.");

      }
    } catch (error) {

      console.error("Error uploading image:", error);
      setUploadError("Failed to upload image. Please check your connection.");

    }
  };

  const handleRemoveImage = async () => {

    const token = sessionStorage.getItem("token")
    
    const response = await fetch("http://localhost:5000/uploads", {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    await setUserData({ ...userData, imagePath: data.imagePath });

  }

  const handleRemoveUser = () => {
    setDeleteUserModalIsOpen(true)
  }

  return (
    <div>
      <div>

        <div>
          <img src={userData?.imagePath} alt={userData?.username+"_img"} width={80}/>
          <button onClick={handleImageButtonClick}>change image</button>
          <button onClick={handleRemoveImage} >remove image</button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
        </div>

        <div>
          <h2>{userData?.username}</h2>
          <button onClick={handleChangeUsername}>change username</button>
        </div>

        <p>Level: {userData?.level}</p>
        <p>XP: {userData?.xp} / {userData?.limitXp}</p>
        <p>High score: {userData?.highScore}</p>
        <p>Average score: {userData?.averageScore}</p>
        <p>Total lines cleared: {userData?.totalLinesCleared}</p>
        <p>Games played: {userData?.totalGames}</p>
        
        <div>
          <button onClick={handleChangePassword}>change password</button>
          <button onClick={handleRemoveUser}>delete account</button>
        </div>

      </div>

      {
        formUserDataModal.isOpen
        ? <FormChangeUserData 
            formUserDataModal={formUserDataModal} 
            setFormUserDataModal={setFormUserDataModal}
          />
        : null
      }
      {
        deleteUserModalIsOpen 
        ? <DeleteUserModal 
          setDeleteUserModalIsOpen={setDeleteUserModalIsOpen}
          />
        : null
      }

    </div>
  )
}

export default Profile