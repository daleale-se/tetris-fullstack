import os
from PIL import Image
from flask import Blueprint, current_app, jsonify, request, send_from_directory
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.utils import secure_filename
from utils import remove_old_file, allowed_file, copy_default_image
from extensions import mongo
from bson import ObjectId   # type: ignore

uploads_bp = Blueprint("uploads", __name__)

@uploads_bp.route("", methods=["PUT"])
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

        remove_old_file(user.get("imagePath"))

        extension = filename.rsplit(".", 1)[1].lower()
        new_filename = f"{current_user_id}_profile.{extension}"
        save_path = os.path.join("uploads", new_filename)
        file_path = os.path.join(current_app.root_path, save_path)
        
        img = Image.open(img_file)
        img = img.convert("RGB") 
        img.thumbnail((300, 300))
        img.save(file_path, "JPEG", quality=75, optimize=True)
        
        image_path = os.path.join(request.host_url, save_path)

        mongo.db.users.update_one(
            {"_id": ObjectId(current_user_id)},
            {"$set": {"imagePath": image_path}}
            )

        return jsonify({"message": "Image updated successfully"}), 200

    return jsonify({"error": "Invalid file"}), 400

@uploads_bp.route("", methods=["DELETE"])
@jwt_required()
def remove_user_image():
    user_id = get_jwt_identity()
    
    user = mongo.db.users.find_one({"_id": ObjectId(user_id)})

    remove_old_file(user.get("image_path"))
    
    image_path = copy_default_image(user_id)
    
    mongo.db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"image_path": image_path}}
        )

    return jsonify({"message": "Image deleted successfully"}), 200

@uploads_bp.route('/<filename>', methods=["GET"])
def uploaded_file(filename):
    return send_from_directory(os.path.join(current_app.root_path, 'uploads'), filename)
