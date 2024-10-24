from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from models import db, Product, User, Cart
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///user_data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['JWT_SECRET_KEY'] = "712727ce8e9c49787f842d6245c2d438562a67a9a22a8ebeb114a63f98dd885454e8690c38d9c89f775499ef666d0b130d503a031ebd941393a3b86741d33c01007b0c6e1e3dfdbf239ebc4f601454d2a1b903b2bdb60fc73b24ffa10f3dbaf096a8a821cf4f6aa87716f70631e64c7ee45f75db0ff0e2119110dc03d2eb85bf0a14c9477873313ddc3cd5353dd187b3234905cf1f084ae061035579338d237d695da4960b22d44eb86eb67369a0e4cd087f62f93d066375146fb04c957f38bd713c3447ff291e2a6de58b36d25f45a3ce28bdd6c64e5a04a4fadb38cd75eb2ab8029b839092b31d9d95d64fef1101021d886a6d94149b129d67ea6fe6e449be"
app.json.compact = False

migrate = Migrate(app, db)
jwt = JWTManager(app)
db.init_app(app)
CORS(app)


@app.route("/")
def index():
    return "<h1>Welcome to TasteNShop !</h1>"


@app.route('/api/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data or 'email' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    new_user = User(username=data['username'], password=data['password'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        'message': 'User created successfully',
        'user': new_user.to_dict()
    }), 201


@app.route('/api/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    data = request.get_json()
    
    if not data or 'user_id' not in data or 'product_id' not in data or 'quantity' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    user = User.query.get_or_404(data['user_id'])
    product = Product.query.get_or_404(data['product_id'])
    
    cart_item = Cart.query.filter_by(user_id=user.user_id, product_id=product.product_id).first()
    if cart_item:
        cart_item.quantity += data['quantity']
    else:
        cart_item = Cart(user_id=user.user_id, product_id=product.product_id, quantity=data['quantity'])
        db.session.add(cart_item)
    
    db.session.commit()
    return jsonify({'message': 'Item added to cart'}), 201


@app.route('/api/cart/<int:user_id>', methods=['GET'])
@jwt_required()
def view_cart(user_id):
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    return jsonify([{'product_id': item.product_id, 'quantity': item.quantity} for item in cart_items])


@app.route('/api/products', methods=['GET'])
# @jwt_required()
def get_products():
    products = Product.query.all() 
    return jsonify([product.to_dict() for product in products])


@app.route('/api/products/<int:product_id>', methods=['GET'])
@jwt_required()
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict())


@app.route('/api/products', methods=['POST'])
@jwt_required()
def create_product():
    data = request.get_json()
    
    if not data or 'name' not in data or 'category' not in data or 'price' not in data or 'user_id' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    user = User.query.get(data['user_id'])
    if not user:
        return jsonify({'error': 'Invalid user ID'}), 400
    
    new_product = Product(
        user_id=user.user_id,  
        name=data['name'],
        price=data['price'],
        description=data.get('description'),
        category=data['category'],
        photo_url=data.get('photo_url')
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201


@app.route('/api/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json()
    
    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.description = data.get('description', product.description)
    product.category = data.get('category', product.category)
    product.photo_url = data.get('photo_url', product.photo_url)
    product.user_id = data.get('user_id', product.user_id)  
    
    db.session.commit()
    return jsonify(product.to_dict())


@app.route('/api/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'}), 200


@app.route("/register", methods=["POST"])
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


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({'access_token': access_token}), 200



if __name__ == '__main__':
    app.run(port=5000, debug=True)