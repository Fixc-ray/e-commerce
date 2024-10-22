from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    products = db.relationship('Product', backref='user', lazy=True)


    def to_dict(self):
        return {
            'id': self.user_id,
            'username': self.username,
            'email': self.email
        }
    
    @validates('email')
    def validate_email(self, key, email):
        if "@" not in email or "." not in email:
            raise ValueError("Invalid email address")
        return email
    
    @validates('username')
    def validate_username(self, key, username):
        if len(username) == 0:
            raise ValueError("Username cannot be empty")
        return username
    
class Product(db.Model):
    __tablename__ = 'products'
    product_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200))
    category = db.Column(db.String(50))
    photo_url = db.Column(db.String(200))

    def to_dict(self):
        return {
            'id': self.product_id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'category': self.category,
            'photo_url': self.photo_url,
            'user_id': self.user_id
        }
        
        
class Cart (db.Model):
    __tablename__ = 'carts'
    cart_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    
    user = db.relationship('User', backref='carts')
    product = db.relationship('Product', backref='carts')

    def __repr__(self):
        return f'<User {self.username}>'
