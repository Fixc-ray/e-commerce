from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique =True, nullable=False) 
    
    @validates('email')
    def validates_email(self, key, value):
        if '@' not in value:
            raise ValueError("invalid email address format")
        return value

