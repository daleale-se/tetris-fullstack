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

    response_update = client.put("/users/update-profile", headers=headers, json={
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

    response_update = client.put("/users/update-profile", headers=headers, json={
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


def test_user_increase_his_high_score_to_100(client):
    
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

    response_update = client.put("/users/update-stats", headers=headers, json={
        "score": 100
    })
    
    data = response_update.get_json()

    assert response_update.status_code == 200
    assert data["highScore"] == 100
    
    
def test_user_increase_his_total_lines_cleared_to_10(client):
    
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

    response_update = client.put("/users/update-stats", headers=headers, json={
        "linesCleared": 10
    })
    
    data = response_update.get_json()

    assert response_update.status_code == 200
    assert data["totalLinesCleared"] == 10
    
    
def test_user_increase_his_level_from_0_to_1_and_update_his_xp(client):
    
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

    response_update = client.put("/users/update-stats", headers=headers, json={
        "xpGained": 120
    })
    
    data = response_update.get_json()

    assert response_update.status_code == 200
    assert data["level"] == 1
    assert data["xp"] == 20

def test_user_increase_his_average_score(client):
    
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
    
    client.put("/users/update-stats", headers=headers, json={
        "score": 1000,
    })

    response_update = client.put("/users/update-stats", headers=headers, json={
        "score": 600,
    })
    
    data = response_update.get_json()

    assert response_update.status_code == 200
    assert data["averageScore"] == 800
    assert data["highScore"] == 1000
    assert data["totalGames"] == 2
