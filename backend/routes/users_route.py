import os
from flask import Blueprint, request, jsonify, current_app
from extensions import mongo, bcrypt
from bson import ObjectId   # type: ignore
from flask_jwt_extended import get_jwt_identity, jwt_required
from utils.allowed_file import allowed_file
from werkzeug.utils import secure_filename

users_bp = Blueprint("users", __name__)

@users_bp.route("/", methods=["PUT","DELETE"])
@jwt_required()
def user_update():
    current_user_id = get_jwt_identity()
    
    if request.method == "PUT":
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
        elif new_password:
            hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
            updates["password"] = hashed_password
        else:
            updates["score"] = new_score
            
        mongo.db.users.update_one({"_id": ObjectId(current_user_id)}, {"$set": updates})
        
        return jsonify({"msg": "User updated successfully"}), 200
    
    elif request.method == "DELETE":
        mongo.db.users.delete_one({"_id": ObjectId(current_user_id)})
        return jsonify({"msg": "User deleted successfully"}), 204

@users_bp.route("/sort", methods=["GET"])
@jwt_required()
def get_user_sort_by_score():
    sorted_users = mongo.db.users.find().sort("score", -1)
    return jsonify({"users": sorted_users}), 200

@users_bp.route("/image", methods=["PUT"])
@jwt_required()
def update_user_image():
    current_user_id = get_jwt_identity()

    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        user = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})
    
        old_image_path = user.get("image_path")
        if old_image_path:
            full_old_path = os.path.join(current_app.root_path, old_image_path)
            if os.path.exists(full_old_path):
                os.remove(full_old_path)

        extension = filename.rsplit(".", 1)[1].lower()
        new_filename = f"{current_user_id}_profile.{extension}"
        save_path = os.path.join("uploads", new_filename)
        file.save(os.path.join(current_app.root_path, save_path))

        mongo.db.users.update_one({"_id": ObjectId(current_user_id)}, {"$set": {"image_path": save_path}})

        return jsonify({"msg": "Image updated successfully"}), 200

    return jsonify({"error": "Invalid file"}), 400
    