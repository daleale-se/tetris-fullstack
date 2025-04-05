import os
import shutil
from flask import Blueprint, request, jsonify, current_app
from extensions import mongo, bcrypt
from bson import ObjectId   # type: ignore
from flask_jwt_extended import create_access_token

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
         "score": 0}).inserted_id
    
    new_filename = f"{user_id}_profile.png"
    file_path = os.path.join("static", "default_profile_image.png")
    save_path = os.path.join("uploads", new_filename)
    shutil.copy(
        os.path.join(current_app.root_path, file_path),
        os.path.join(current_app.root_path, save_path)
        )
    
    image_path = os.path.join(request.host_url, save_path)
    
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
