from app import app 
from models import db, User

def seed_users():
    user_data = [
        {'username': 'IanDegrassi', 'email': 'iandegrassed@gmail.com'},
        {'username': 'janesmith001', 'email': 'janesmitheises@gmail.com'},
    ]
    
    for data in user_data:
        user = User(username=data['username'], email=data['email'])
        db.session.add(user)

    db.session.commit()
    print("Users added successfully!")

def drop_users():

    db.session.query(User).delete()
    db.session.commit()
    print("All the seeded users have been dropped successfully!")


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        drop_users()
        seed_users()
