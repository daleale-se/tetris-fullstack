from flask import Blueprint, request, jsonify
from utils import add_experience
from utils import remove_old_file
from extensions import mongo, bcrypt
from bson import ObjectId   # type: ignore
from flask_jwt_extended import get_jwt_identity, jwt_required

users_bp = Blueprint("users", __name__)

@users_bp.route("/update-profile", methods=["PUT"])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    old_password = data.get("old_password")
    new_username = data.get("username")
    new_password = data.get("password")

    user = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Require old password if changing username or password
    if (new_password or new_username) and not old_password:
        return jsonify({"error": "Old password is required"}), 400

    # Verify old password
    if not bcrypt.check_password_hash(user["password"], old_password):
        return jsonify({"error": "Old password is incorrect"}), 403

    updates = {}

    # Check if username is already taken by another user
    if new_username and new_username != user["username"]:
        if mongo.db.users.find_one({"username": new_username}):
            return jsonify({"error": "Username already exists"}), 409
        updates["username"] = new_username

    # If new password provided
    if new_password:
        hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
        updates["password"] = hashed_password

    if updates:
        mongo.db.users.update_one({"_id": ObjectId(current_user_id)}, {"$set": updates})

    message = [f"{key.capitalize()} updated successfully" for key in updates]

    user = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})
    
    return jsonify({"message": message, "user": user}), 200

@users_bp.route("/update-stats", methods=["PUT"])
@jwt_required()
def update_stats():
    current_user_id = get_jwt_identity()

    data = request.get_json()
    
    updates = {}
    
    score = data.get("score")
    lines_cleared = data.get("linesCleared")
    xp_gained = data.get("xpGained")
    
    user = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})

    if xp_gained:
        level = user["level"]
        total_xp = user["xp"]
        
        current_level, current_xp, limit_xp = add_experience(level, total_xp, xp_gained)
        
        updates["level"] = current_level
        updates["xp"] = current_xp
        updates["limitXp"] = limit_xp

    if score is not None:
        high_score = user.get("highScore", 0)
        if high_score < score:
            updates["highScore"] = score

        total_games = user.get("totalGames", 0) + 1
        updates["totalGames"] = total_games
        updates["averageScore"] = round((user.get("averageScore", 0) * user.get("totalGames", 0) + score) / total_games)
    else:
        updates["totalGames"] = user.get("totalGames") + 1

    if lines_cleared is not None:
        updates["totalLinesCleared"] = user.get("totalLinesCleared", 0) + lines_cleared
            
    mongo.db.users.update_one({"_id": ObjectId(current_user_id)}, {"$set": updates})

    user = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})
    user["_id"] = str(user["_id"])
    
    return jsonify(user), 200

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
def get_users_sort_by_score():
    sorted_users = mongo.db.users.find().sort("highScore", -1)
    return jsonify({"users": sorted_users}), 200

@users_bp.route("", methods=["GET"])
@jwt_required()
def get_user_data():
    current_user_id = get_jwt_identity()
    user = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})
    return jsonify(user), 200
