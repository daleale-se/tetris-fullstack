from utils import generate_test_image

def test_user_can_change_their_profile_image(client):
    
    client.post("/auth/register", json={
        "username": "testuser",
        "password": "testpassword"
    })

    response_login = client.post("/auth/login", json={
        "username": "testuser",
        "password": "testpassword"
    })

    token = response_login.get_json()["token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    img = generate_test_image()

    data = {
        "image": (img, "test_image.jpg")
    }

    response_update = client.put("/uploads", headers=headers, content_type="multipart/form-data", data=data)

    assert b"Image updated successfully" in response_update.data
    
def test_user_can_remove_their_profile_image(client):
    
    client.post("/auth/register", json={
        "username": "testuser",
        "password": "testpassword"
    })

    response_login = client.post("/auth/login", json={
        "username": "testuser",
        "password": "testpassword"
    })

    token = response_login.get_json()["token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    response_update = client.delete("/uploads", headers=headers)

    assert b"Image deleted successfully" in response_update.data
      
def test_app_can_serve_profile_image(client):
    
    client.post("/auth/register", json={
        "username": "testuser",
        "password": "testpassword"
    })

    response_login = client.post("/auth/login", json={
        "username": "testuser",
        "password": "testpassword"
    })
    
    token = response_login.get_json()["token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    response_get = client.get("/users", headers=headers)
    user_data = response_get.get_json()
    user_image = user_data["user"]["image_path"]

    response_image = client.get(user_image)

    assert response_image.status_code == 200
    assert response_image.content_type in ("image/jpeg", "image/png")
    assert response_image.data != b""
