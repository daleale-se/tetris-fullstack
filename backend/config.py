import os
from datetime import timedelta
from dotenv import load_dotenv # type: ignore

load_dotenv()

MONGO_URI = os.environ.get("MONGO_URI")
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
