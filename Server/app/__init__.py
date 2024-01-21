from flask import Flask, request
from flask_restful import Api, Resource
from werkzeug.security import generate_password_hash, check_password_hash
import sqlalchemy
from .models import db, User   
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token
from dotenv import load_dotenv
import os
load_dotenv()  # Add this at the beginning

def create_app():
    app = Flask(__name__)
    # Configure your app
    jwt_secret = os.getenv('JWT_SECRET')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
    app.config['JWT_SECRET_KEY'] = jwt_secret   
    jwt = JWTManager(app)  # Add this line

    db.init_app(app)
    Migrate(app, db)

 
    CORS(app, resources={r"/signup": {"origins": "*"}, r"/login": {"origins": "*"}})

 
    api = Api(app)

  
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

 
    api.add_resource(SignUp, '/signup')
    class Login(Resource):
        def post(self):
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')
           
            if not email or not password:
                return {'message': 'Email and password are required'}, 400

            user = User.query.filter_by(email=email).first()

            if user and check_password_hash(user.password_hash, password):
                access_token = create_access_token(identity=email)  # Make sure identity is correct
    
                return {'access_token': access_token}, 200
            else:
                return {'message': 'Invalid username or password'}, 401

    api.add_resource(Login, '/login')

    return app


if __name__ == "__main__":
    app = create_app()  
    app.run(debug=True)   
