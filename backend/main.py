from flask import Flask
from extensions import mongo, bcrypt, jwt
from flask_cors import CORS # type: ignore
from routes import auth_bp, users_bp, uploads_bp

app = Flask(__name__)

app.config.from_object("config")

CORS(app)

mongo.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(users_bp, url_prefix="/users")
app.register_blueprint(uploads_bp, url_prefix="/uploads")

if __name__ == '__main__':
	app.run(debug=True)
