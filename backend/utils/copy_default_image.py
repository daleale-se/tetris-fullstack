import os
import shutil
from flask import current_app, request

def copy_default_image(user_id):
    new_filename = f"{user_id}_profile.png"
    file_path = os.path.join("static", "default_profile_image.png")
    save_path = os.path.join("uploads", new_filename)
    shutil.copy(
        os.path.join(current_app.root_path, file_path),
        os.path.join(current_app.root_path, save_path)
        )
    
    return os.path.join(request.host_url, save_path)
