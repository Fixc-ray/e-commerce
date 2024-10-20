from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

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

    def __repr__(self):
        return f'<User {self.username}>'
