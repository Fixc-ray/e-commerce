from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from models import db, Product, User, Cart
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Product, Cart

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/products.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = '8369a00156590593b430006a34c9944cd2f07ecbdd1caa53d259853b03fffc2dd092aa1be3c7d782efbd88949d036e1af71dbd16aba51dd308df632fb82d0632fa6a35163077ec8e3f7db1321d9dad6de5cf29a73c490a74da6f1fd14579100dc8f1e05f5003d0339739e8e2780bdeb8391d5581545da4f96cac6903c188e248309f8b67ea0ead3dc076ac02aea0ca727bae0f453f60e00f1cbe1c4e13be7d959ab041a8fb4bc5ff5e0756e70dc25a2c5dbb0f03a7d1914424a6136b51e4956ed5b4c600e8c782ae7317a9ae04d42188c4372c9816c08ec3b7f547c20cf3217188ea79a830caaa9dae4acfb628b422cd6c3522feb1d9365a8529de768cc18082'

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already taken'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, email=email)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.user_id)
    return jsonify({
        'access_token': access_token,
        'user': {
            'username': user.username,
            'email': user.email
        }
    }), 200
    

# Protected Route Example
@app.route('/', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({'message': f'Hello {user.username}, this is a protected route!'}), 200


@app.route('/')
def home():
    return "Welcome to the Home Page!"

@app.route('/api/user/products', methods=['GET'])
@jwt_required()
def get_user_products():
    user_id = get_jwt_identity()
    products = Product.query.filter_by(user_id=user_id).all()
    return jsonify([product.to_dict() for product in products]), 200
 # GET all products (public)
@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

# Create New Product (for Profile Page)
@app.route('/api/products', methods=['POST'])
@jwt_required()
def create_product():
    user_id = get_jwt_identity()
    data = request.get_json()

    if not all(key in data for key in ['name', 'price', 'category']):
        return jsonify({'error': 'Missing required fields'}), 400

    new_product = Product(
        user_id=user_id,
        name=data['name'],
        price=data['price'],
        category=data['category'],
        description=data.get('description', ''),
        photo_url=data.get('photo_url', '')
    )
    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.to_dict()), 201

# Update Product (only if it belongs to the logged-in user)
@app.route('/api/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    user_id = get_jwt_identity()
    product = Product.query.get_or_404(product_id)

    if product.user_id != user_id:
        return jsonify({'error': 'Unauthorized access'}), 403

    data = request.get_json()
    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.description = data.get('description', product.description)
    product.category = data.get('category', product.category)
    product.photo_url = data.get('photo_url', product.photo_url)

    db.session.commit()
    return jsonify(product.to_dict()), 200

# Delete Product (only if it belongs to the logged-in user)
@app.route('/api/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    user_id = get_jwt_identity()
    product = Product.query.get_or_404(product_id)

    if product.user_id != user_id:
        return jsonify({'error': 'Unauthorized access'}), 403

    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'}), 200
# GET all users (public)
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200


# POST create a new user (registration)
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()

    if not all(key in data for key in ['username', 'password', 'email']):
        return jsonify({'error': 'Missing required fields'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400

    hashed_password = generate_password_hash(data['password'])
    new_user = User(username=data['username'], password=hashed_password, email=data['email'])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully', 'user': new_user.to_dict()}), 201


# POST add a product to the cart (for authenticated users)
@app.route('/api/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    data = request.get_json()

    if 'product_id' not in data or 'quantity' not in data:
        return jsonify({'error': 'Missing required fields'}), 400

    product = Product.query.get_or_404(data['product_id'])

    cart_item = Cart.query.filter_by(user_id=user_id, product_id=product.product_id).first()
    if cart_item:
        cart_item.quantity += data['quantity']
    else:
        cart_item = Cart(user_id=user_id, product_id=product.product_id, quantity=data['quantity'])
        db.session.add(cart_item)

    db.session.commit()
    return jsonify({'message': 'Item added to cart'}), 201


# GET cart items for the current user
@app.route('/api/cart', methods=['GET'])
@jwt_required()
def view_cart():
    user_id = get_jwt_identity()
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'product_id': item.product_id,
        'quantity': item.quantity
    } for item in cart_items]), 200


# DELETE a product from the cart (for authenticated users)
@app.route('/api/cart/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_cart_item(product_id):
    user_id = get_jwt_identity()
    cart_item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first_or_404()

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({'message': 'Cart item deleted'}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
