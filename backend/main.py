from flask import Flask
from extensions import mongo, bcrypt, jwt
from backend.routes.auth_routes import auth_bp
from flask_cors import CORS # type: ignore

app = Flask(__name__)

app.config.from_object("config")

CORS(app)

mongo.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

app.register_blueprint(auth_bp, url_prefix="/auth")

if __name__ == '__main__':
	app.run(debug=True)
