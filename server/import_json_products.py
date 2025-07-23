import json
from app import app
from models import db, Product, User

json_path = "../client/src/db.json"

with app.app_context():
    with open(json_path, 'r') as f:
        data = json.load(f)
        products = data.get('products', [])

    user = User.query.first()
    if not user:
        print("No user found, please create a user first.")
        exit(1)

    for prod in products:
        existing = Product.query.filter_by(name=prod["name"]).first()
        if existing:
            print(f"Product '{prod['name']}' already exists. Skipping.")
            continue

        product = Product(
            user_id=user.user_id,
            name=prod["name"],
            price=prod["price"],
            description=prod.get("description", ""),
            category=prod.get("category", ""),
            photo_url=prod.get("photoUrl", prod.get("photo_url", ""))
        )
        db.session.add(product)

    db.session.commit()
    print(f"Imported {len(products)} products from db.json.")