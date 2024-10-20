from flask import Flask
from flask_migrate import Migrate

from models import db

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///user_data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)


@app.route("/")
def index():
    return "<h1>Welcome to TasteNShop !</h1>"


if __name__ == '__main__':
    app.run(port=5000, debug=True)