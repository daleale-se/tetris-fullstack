from flask import Blueprint, request, jsonify
from extensions import mongo, bcrypt
from bson import ObjectId   # type: ignore
from flask_jwt_extended import get_jwt_identity, jwt_required

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
