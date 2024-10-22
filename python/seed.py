from app import app
from models import db, User, Product

with app.app_context():
    db.drop_all()
    db.create_all()
    
    if not User.query.filter_by(email='angel@example.com').first():
        user1 = User(username='Angel', password='angel', email='angel@example.com')
        db.session.add(user1)

    if not User.query.filter_by(email='mitchelle@example.com').first():
        user2 = User(username='Mitchelle', password='mitchelle', email='mitchelle@example.com')
        db.session.add(user2)

    db.session.commit()
    
    user1 = User.query.filter_by(email='angel@example.com').first()
    user2 = User.query.filter_by(email='mitchelle@example.com').first()

    product1 = Product(
        user_id=user1.user_id,
        name="Smartphone",
        category="Gadgets",
        price=699.99,
        description="Latest model with high resolution display and long battery life.",
        photo_url="https://s.alicdn.com/@sc04/kf/H0e35cd60637b432a9da040648e6fc61cH.jpg_300x300.jpg"
    )
    product2 = Product(
        user_id=user2.user_id,
        name="Bluetooth Headphones",
        category="Gadgets",
        price=199.99,
        description="Noise-cancelling wireless headphones with comfortable ear pads.",
        photo_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQetxA_tZH8ihoux7CIxnAzRnArfUwHquPBqQ&s"
    )
    product3 = Product(
        user_id=user2.user_id,
        name="Digital Camera",
        category="Gadgets",
        price=149.99,
        description="High-resolution digital camera with built-in Wi-Fi and Bluetooth.",
        photo_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Lt71clRSi3-PBAifmBIBFilU4st-SJlvWg&s"
    )
    product4 = Product(
        user_id=user2.user_id,
        name="Action Camera",
        category="Gadgets",
        price=299.99,
        description="Durable action camera with 4K resolution and waterproof case.",
        photo_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8d1yghWsRotQLcIYGeNI_mlFSmy4gMcisTg&s"
    )
    product5 = Product(
        user_id=user2.user_id,
        name="Coffee Maker",
        category="Home Appliances",
        price=89.99,
        description="Automatic drip coffee maker with programmable settings.",
        photo_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSSLEcCx0Y7PdCGHyc8pbdR-tCS3q4_nPutroyuCuSv7_uAvcKJ1l9q7azS2st5BUggwg&usqp=CAU"
    )
    product6 = Product(
        user_id=user2.user_id,
        name="Electric Kettle",
        category="Home Appliances",
        price=49.99,
        description="Stainless steel electric kettle with fast boiling technology.",
        photo_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFQnGEv2U2B6gIv5MHjIVvQm4EdPov_FMmjA&s"
    )
    product7 = Product(
        user_id=user2.user_id,
        name="Smart Thermostat",
        category="Home Appliances ",
        price=129.99,
        description="Energy-efficient smart thermostat with voice control compatibility.",
        photo_url="data:image/jpeg;base64,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"
    )
    product8 = Product(
        user_id=user2.user_id,
        name="Ceramic Vase",
        category="Home Decor",
        price=29.99,
        description="Elegant ceramic vase, perfect for home decoration or flower arrangements.",
        photo_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeXg3mo_ky6iwlM04UcSLi7-m2R2UVP7WtAg&s"
    )
    product9 = Product(
        user_id=user2.user_id,
        name="LED Desk Lamp",
        category="Home Decor",
        price=34.99,
        description="Adjustable LED desk lamp with multiple brightness levels and a sleek design.",
        photo_url="https://www.shutterstock.com/image-photo/adjustable-white-mini-small-led-260nw-2262601763.jpg"
    )
    product10 = Product(
        user_id=user2.user_id,
        name="Wall Art",
        category="Home Decor",
        price=49.99,
        description="Framed wall art print featuring abstract designs.",
        photo_url="https://i.etsystatic.com/38262862/r/il/809928/5183492320/il_300x300.5183492320_4rzq.jpg"
    )
    product11 = Product(
        user_id=user2.user_id,
        name="Apple Pie",
        category="Foodstuff",
        price=12.99,
        description="Homemade apple pie with a buttery crust and cinnamon filling.",
        photo_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnZOvftErsiJoIYQ0e4RCKVHl7kdOR84fsaw&s"
    )
    product12 = Product(
        user_id=user2.user_id,
        name="Handmade Pasta",
        category="Foodstuff",
        price=6.99,
        description="Fresh, handmade pasta with a rich flavor, available in various shapes.",
        photo_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTojiaLF5CeKMGWlW6mYP5E0xlO6iPwoxAaaQ&s"
    )
    product13 = Product(
        user_id=user2.user_id,
        name="Spicy Salsa",
        category="Foodstuff",
        price=4.99,
        description="Homemade salsa with a blend of fresh, spicy ingredients.",
        photo_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEKqiowTpIpQv327ix4tJCqAyhjaPTeW-tgQ&s"
    )
    product14 = Product(
        user_id=user2.user_id,
        name="Stainless Steel Water Bottle",
        category="Outdoor Gear",
        price=19.99,
        description="Durable stainless steel water bottle with leak-proof cap.",
        photo_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDX_j4OEn8H-w2KwxXZDKTtBYo8NS2IUEGjQ&s"
    )
    product15 = Product(
        user_id=user2.user_id,
        name="Camping Tent",
        category="Outdoor Gear",
        price=159.99,
        description="Spacious camping tent with weather-resistant features.",
        photo_url="https://www.imagella.com/cdn/shop/products/f2fed80c3ab05b31a760529244ffdbb2.jpg?v=1692390632&width=300"
    )
    product16 = Product(
        user_id=user2.user_id,
        name="Outdoor Grill",
        category="Outdoor Gear",
        price=199.99,
        description="Portable outdoor grill with easy assembly and multiple cooking surfaces.",
        photo_url="https://images.thdstatic.com/productImages/bab0c6a8-e5e6-4fa2-b531-79856886cf82/svn/outsunny-portable-charcoal-grills-846-022-64_300.jpg"
    )
    db.session.add_all([product1, product2, product3, product4, product5, product6,product7, product8, product9, product10, product11, product12, product13, product14, product15, product16])
    db.session.commit()
    
    print("Database seeded successfully.")
