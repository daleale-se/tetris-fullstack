def test_user_can_update_their_username(client):
    
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

    response_update = client.put("/users", headers=headers, json={
        "username": "new_username"
    })

    assert response_update.status_code == 200
    assert b"Username updated successfully" in response_update.data

def test_user_can_update_their_username_and_password(client):
    
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

    response_update = client.put("/users", headers=headers, json={
        "username": "new_username",
        "password": "new_password"
    })

    assert response_update.status_code == 200
    assert b"Username updated successfully" in response_update.data
    assert b"Password updated successfully" in response_update.data

def test_user_can_delete_their_account(client):
    
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

    response_delete = client.delete("/users", headers=headers)

    assert response_delete.status_code == 200
    assert b"User deleted successfully" in response_delete.data
