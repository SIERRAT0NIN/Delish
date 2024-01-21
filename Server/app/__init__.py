from flask import Flask
from .models import db  # Import the db instance from models.py
from flask_cors import CORS
from flask_migrate import Migrate


def create_app():
    app = Flask(__name__)
    # Configure your app
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///DATABASE.db'

    db.init_app(app)
    Migrate(app, db)
    CORS(app)
    # Define routes and view functions
    return app
