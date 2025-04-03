from flask import Flask
from extensions import mongo, bcrypt, jwt
from routes.auth_routes import auth_bp
from routes.users_route import users_bp
from flask_cors import CORS # type: ignore

app = Flask(__name__)

app.config.from_object("config")

CORS(app)

mongo.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(users_bp, url_prefix="/users")

if __name__ == '__main__':
	app.run(debug=True)
