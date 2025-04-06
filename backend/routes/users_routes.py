from flask import Blueprint, request, jsonify
from utils import remove_old_file
from extensions import mongo, bcrypt
from bson import ObjectId   # type: ignore
from flask_jwt_extended import get_jwt_identity, jwt_required

users_bp = Blueprint("users", __name__)

@users_bp.route("", methods=["PUT"])
@jwt_required()
def update_user():
    current_user_id = get_jwt_identity()
    
    data = request.get_json()
    updates = {}
    
    new_username = data.get("username")
    new_password = data.get("password")
    new_score = data.get("score")
    
    user = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    if new_username:
        updates["username"] = new_username
    
    if new_password:
        hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
        updates["password"] = hashed_password
        
    if new_score:
        updates["score"] = new_score
        
    message = []
    for key in updates:
        message.append(f"{key.capitalize()} updated successfully")

    mongo.db.users.update_one({"_id": ObjectId(current_user_id)}, {"$set": updates})
    
    return jsonify({"message": message}), 200

@users_bp.route("", methods=["DELETE"])
@jwt_required()
def remove_user():
    current_user_id = get_jwt_identity()
    
    user = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})
    
    if not user:
        return jsonify({"error": "User not found"}), 200
    
    remove_old_file(user.get("image_path"))
    
    mongo.db.users.delete_one({"_id": ObjectId(current_user_id)})
    
    return jsonify({"message": "User deleted successfully"}), 200

@users_bp.route("/sort", methods=["GET"])
@jwt_required()
def get_users_sort_by_score():
    sorted_users = mongo.db.users.find().sort("score", -1)
    return jsonify({"users": sorted_users}), 200

@users_bp.route("", methods=["GET"])
@jwt_required()
def get_user_data():
    current_user_id = get_jwt_identity()
    user = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})
    return jsonify({"user": user}), 200
