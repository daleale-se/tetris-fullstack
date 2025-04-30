from flask import Blueprint, request, jsonify
from extensions import mongo, bcrypt
from bson import ObjectId   # type: ignore
from flask_jwt_extended import create_access_token
from utils import copy_default_image

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    existing_user = mongo.db.users.find_one({"username": username})
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    user_id = mongo.db.users.insert_one(
        {"username": username,
         "password": hashed_password,
         "highScore": 0,
         "totalLinesCleared": 0,
         "totalGames": 0,
         "averageScore": 0,
         "level": 0,
         "xp": 0
         }).inserted_id
        
    image_path = copy_default_image(user_id)
    
    mongo.db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"image_path": image_path}}
        )

    return jsonify({"message": "User created successfully", "user_id": str(user_id)}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = mongo.db.users.find_one({"username": username})
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user["_id"]))
    return jsonify({"token": access_token, "username": username}), 200
