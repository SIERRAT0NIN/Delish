from flask import Flask, request
from flask_restful import Api, Resource
from werkzeug.security import generate_password_hash
import sqlalchemy

# Assuming .models is a module in the same package
from .models import db, User  # Import your models here
from flask_cors import CORS
from flask_migrate import Migrate


def create_app():
    app = Flask(__name__)
    # Configure your app
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///DATABASE.db'

    db.init_app(app)
    Migrate(app, db)

    # Set up CORS to allow all origins for the signup route
    CORS(app, resources={r"/signup": {"origins": "*"}})

    # Set up Flask-RESTful
    api = Api(app)

    # Define your RESTful routes
    class SignUp(Resource):
        def post(self):
            data = request.get_json()   

            username = data.get('username')
            email = data.get('email')
            password = data.get('password')

            if not all([username, email, password]):
                return {'message': 'Missing data'}, 400

            existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
            if existing_user:
                return {'message': 'Username or email already taken'}, 400

            hashed_password = generate_password_hash(password)
            new_user = User(username=username, email=email, password_hash=hashed_password)

            try:
                db.session.add(new_user)
                db.session.commit()
                return {'message': 'User created successfully'}, 201
            except sqlalchemy.exc.IntegrityError as e:
                db.session.rollback()
                return {'error': str(e)}, 500

    # Add the SignUp resource to the API
    api.add_resource(SignUp, '/signup')

    return app


# The main block to run the app
if __name__ == "__main__":
    app = create_app()  # Create an app using the factory function
    app.run(debug=True)  # Run the app
