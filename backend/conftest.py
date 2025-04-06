from utils import remove_old_file
import pytest # type: ignore
from app import create_app
from extensions import mongo

@pytest.fixture
def client():
    app = create_app(testing=True)
    client = app.test_client()

    with app.app_context():
        users = mongo.db.users.find()
        for user in users:
            remove_old_file(user.get("image_path"))  
        mongo.db.users.delete_many({})
    yield client
