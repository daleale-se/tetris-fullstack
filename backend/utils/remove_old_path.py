import os
from flask import current_app

def remove_old_path(old_image_path):
    if old_image_path:
        full_old_path = os.path.join(current_app.root_path, old_image_path)
        if os.path.exists(full_old_path):
            os.remove(full_old_path)
