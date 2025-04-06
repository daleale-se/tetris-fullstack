def test_user_can_register(client):
    response = client.post("/auth/register", json={
        "username": "testuser",
        "password": "testpassword"
    })
    assert response.status_code == 201
    assert b"User created successfully" in response.data

def test_user_can_login_with_a_registered_account(client):
    client.post("/auth/register", json={
        "username": "testuser",
        "password": "testpassword"
    })

    response = client.post("/auth/login", json={
        "username": "testuser",
        "password": "testpassword"
    })
    
    assert response.status_code == 200
    data = response.get_json()
    assert "token" in data
