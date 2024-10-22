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
app.config['JWT_SECRET_KEY'] = '6c05cec217b3a237d09d853e87fdfe7f3e18cd53e258c3d0a91569863811bb98b57bbf05e444538cf7f0ca5da6a478c00f2c67104aedd8718c9223d7f1f986f4da23bd2a2b78c7ddec5f0f5a8e0cb879536097d9b99a88915e1d0672f505abe81432cebf353b9533e7d9055a093cfeafdbae3115f9ec62a2c69abe749b20d4fb41d9d4232a07242c16eb43543adc55d9d119b2d70b8b86b75865aa6c1108ad2b6f15fd52931038b6961505536e2bbc66f2af7add6c819d0cce88318b9e9f75d25868dffcd5601f7459c0f3cde25115fabd53ebd3a6125719583564fcecc94c8aebb81df4267298e3c01fa63bdabc2af522593798e0f74c341b3275816e319a96'

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
