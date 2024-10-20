from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User

app = Flask(__name__)
CORS(app)

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = '2859b15d384e2c7ae3af31aec24dac73c834de82fe7cab8b1420c924382cc9f53b05bfc73900de380d3bfc2e2c9e35fd80b9b0761f44debe090a3bb432bce38c6b6648cdd125ca5d54f055f8bbfe048f87d568316b37d9ef7eaf21b5ccdde2815152f6e60f475790c51fcf8a1d33c2deac62093bdc3ca39cbb4018531b6190739cd648786e908474fb9fc33920d56a6ca979f36af0d72b40bfbad8130e75556a21a4950184a293ebef87066325b7ea5f7cfaf13861dcf7a46af29374a6b56bd108257c0ac3fe5cf7782cf675bfa39a1c85824b21ea61a6b5b078bd848c25f5aeb7eb1de1281b8e3cea74d5f581875b778cda38b8740e662b6cbd1a910144897b'

db.init_app(app)
jwt = JWTManager(app)


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 400

    new_user = User(username=username, password=password, email=email)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username, password=password).first()

    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=username)
    return jsonify({'access_token': access_token}), 200

# Protected Route
@app.route('/', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'message': f'Hello {current_user}, this is a protected route!'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)
