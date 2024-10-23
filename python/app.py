from flask import Flask, request
from flask import jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from models import db, Product, User, Cart
from flask_cors import CORS

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/products.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)


@app.route('/')
def home():
    return "Welcome to the Home Page!"


# GET all products
@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all() 
    return jsonify([product.to_dict() for product in products])


# GET a specific product by ID 
@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict())


# POST a new product
@app.route('/api/products', methods=['POST'])
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
        description=data('description'),
        category=data['category'],
        photo_url=data('photo_url', None)
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201


# PUT update a product
@app.route('/api/products/<int:product_id>', methods=['PUT'])
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


# DELETE a product
@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'}), 200


# GET all users
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


# POST a new user
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


# POST to add to cart
@app.route('/api/cart', methods=['POST'])
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


# GET cart items for a user
@app.route('/api/cart/<int:user_id>', methods=['GET'])
def view_cart(user_id):
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    return jsonify([{'product_id': item.product_id, 'quantity': item.quantity} for item in cart_items])


if __name__ == '__main__':
    app.run(port=8080, debug=True)
