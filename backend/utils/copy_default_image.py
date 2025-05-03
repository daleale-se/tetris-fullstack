import os
from flask import request

def copy_default_image():
    save_path = os.path.join("uploads", "default_profile_image.png")
    return os.path.join(request.host_url, save_path)
