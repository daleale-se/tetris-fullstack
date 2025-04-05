import os
import shutil
from flask import Blueprint, request, jsonify, send_from_directory, current_app
from extensions import mongo, bcrypt
from bson import ObjectId   # type: ignore
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

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
    user_id = mongo.db.users.insert_one({"username": username, "password": hashed_password, "score": 0}).inserted_id
    
    profile_image_name = f"{user_id}_profile.png"
    project_path = current_app.root_path
    shutil.copy(os.path.join(project_path, "static", "default_profile_image.png"), os.path.join(project_path, "uploads", profile_image_name))

    image_path = f"uploads/{profile_image_name}"
    mongo.db.users.update_one({"_id": ObjectId(user_id)}, {"$set": {"image_path": image_path}})

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

@auth_bp.route("/hello", methods=["GET"])
@jwt_required()
def hello():
    current_user_id = get_jwt_identity()
    current_user = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})
    return send_from_directory("", current_user["image_path"])
