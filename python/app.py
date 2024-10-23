from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Product, Cart

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/products.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = '712727ce8e9c49787f842d6245c2d438562a67a9a22a8ebeb114a63f98dd885454e8690c38d9c89f775499ef666d0b130d503a031ebd941393a3b86741d33c01007b0c6e1e3dfdbf239ebc4f601454d2a1b903b2bdb60fc73b24ffa10f3dbaf096a8a821cf4f6aa87716f70631e64c7ee45f75db0ff0e2119110dc03d2eb85bf0a14c9477873313ddc3cd5353dd187b3234905cf1f084ae061035579338d237d695da4960b22d44eb86eb67369a0e4cd087f62f93d066375146fb04c957f38bd713c3447ff291e2a6de58b36d25f45a3ce28bdd6c64e5a04a4fadb38cd75eb2ab8029b839092b31d9d95d64fef1101021d886a6d94149b129d67ea6fe6e449be'

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# User Registration Route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    # Check if username or email is already taken
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already taken'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400

    # Hash the password before storing it
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, email=email)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.user_id)
    return jsonify({'access_token': access_token}), 200

@app.route('/', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({'message': f'Hello {user.username}, this is a protected route!'}), 200


@app.route('/')
def home():
    return "Welcome to the Home Page!"


# GET all products (public)
@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200


# GET a specific product by ID (public)
@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict()), 200


# POST a new product (restricted to authenticated users)
@app.route('/api/products', methods=['POST'])
@jwt_required()
def create_product():
    user_id = get_jwt_identity()  # Get logged-in user ID
    data = request.get_json()

    # Validate input fields
    if not all(key in data for key in ['name', 'category', 'price']):
        return jsonify({'error': 'Missing required fields'}), 400

    # Create a new product owned by the logged-in user
    new_product = Product(
        user_id=user_id,
        name=data['name'],
        category=data['category'],
        price=data['price'],
        description=data.get('description', ''),
        photo_url=data.get('photo_url', '')
    )
    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.to_dict()), 201


# PUT update a product (only if the user owns it)
@app.route('/api/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    user_id = get_jwt_identity()
    product = Product.query.get_or_404(product_id)

    # Ensure the product belongs to the logged-in user
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


# DELETE a product (only if the user owns it)
@app.route('/api/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    user_id = get_jwt_identity()
    product = Product.query.get_or_404(product_id)

    # Ensure the product belongs to the logged-in user
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

@app.route('/api/users/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(user.to_dict()), 200


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
