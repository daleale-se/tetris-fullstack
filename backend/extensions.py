from flask_pymongo import PyMongo # type: ignore
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

mongo = PyMongo()
bcrypt = Bcrypt()
jwt = JWTManager()