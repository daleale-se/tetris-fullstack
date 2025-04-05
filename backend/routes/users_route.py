import os
import shutil
from PIL import Image
from flask import Blueprint, request, jsonify, current_app
from extensions import mongo, bcrypt
from bson import ObjectId   # type: ignore
from flask_jwt_extended import get_jwt_identity, jwt_required
from utils.allowed_file import allowed_file
from utils.remove_old_path import remove_old_path
from werkzeug.utils import secure_filename

users_bp = Blueprint("users", __name__)

@users_bp.route("/", methods=["PUT"])
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
    elif new_password:
        hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
        updates["password"] = hashed_password
    else:
        updates["score"] = new_score
        
    mongo.db.users.update_one({"_id": ObjectId(current_user_id)}, {"$set": updates})
    
    return jsonify({"msg": "User updated successfully"}), 200

@users_bp.route("/", methods=["DELETE"])
@jwt_required()
def remove_user():
    current_user_id = get_jwt_identity()
    
    mongo.db.users.delete_one({"_id": ObjectId(current_user_id)})
    return jsonify({"msg": "User deleted successfully"}), 204

@users_bp.route("/sort", methods=["GET"])
@jwt_required()
def get_users_sort_by_score():
    sorted_users = mongo.db.users.find().sort("score", -1)
    return jsonify({"users": sorted_users}), 200

@users_bp.route("/image", methods=["PUT"])
@jwt_required()
def update_user_image():
    current_user_id = get_jwt_identity()
        
    if "image" not in request.files:
        return jsonify({"error": "No file part"}), 400

    img_file = request.files["image"]
    if img_file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if img_file and allowed_file(img_file.filename):
        filename = secure_filename(img_file.filename)
        user = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})
    
        remove_old_path(user.get("image_path"))

        extension = filename.rsplit(".", 1)[1].lower()
        new_filename = f"{current_user_id}_profile.{extension}"
        save_path = os.path.join("uploads", new_filename)
        file_path = os.path.join(current_app.root_path, save_path)
        
        img = Image.open(img_file)
        img = img.convert("RGB") 
        img.thumbnail((300, 300))
        img.save(file_path, "JPEG", quality=75, optimize=True)

        mongo.db.users.update_one(
            {"_id": ObjectId(current_user_id)},
            {"$set": {"image_path": save_path}}
            )

        return jsonify({"msg": "Image updated successfully"}), 200

    return jsonify({"error": "Invalid file"}), 400
              
@users_bp.route("/image", methods=["DELETE"])
@jwt_required()
def remove_user_image():
    current_user_id = get_jwt_identity()
    
    user = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})

    remove_old_path(user.get("image_path"))
    
    new_filename = f"{current_user_id}_profile.png"
    file_path = os.path.join("static", "default_profile_image.png")
    save_path = os.path.join("uploads", new_filename)
    shutil.copy(
        os.path.join(current_app.root_path, file_path),
        os.path.join(current_app.root_path, save_path)
        )
    
    mongo.db.users.update_one(
        {"_id": ObjectId(current_user_id)},
        {"$set": {"image_path": save_path}}
        )

    return jsonify({"msg": "Image deleted successfully"}), 200
