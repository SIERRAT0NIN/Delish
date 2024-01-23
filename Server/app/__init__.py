from flask import Flask, request, make_response
from flask_restful import Api, Resource
from werkzeug.security import generate_password_hash, check_password_hash
import sqlalchemy
from flask_socketio import SocketIO
from datetime import datetime, timedelta
from models import db, User, Message   
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies, jwt_required, get_jwt_identity
from dotenv import load_dotenv
import os
load_dotenv()  # Add this at the beginning


app = Flask(__name__)
# Configure your app
jwt_secret = os.getenv('JWT_SECRET')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
app.config['JWT_TOKEN_LOCATION'] = ['cookies','headers']
app.config['JWT_COOKIE_SAMESITE'] = 'Strict'
app.config['JWT_SECRET_KEY'] = jwt_secret   
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=12)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
jwt = JWTManager(app)  # Add this line

db.init_app(app)

Migrate(app, db)

# Set up Flask-RESTful
api = Api(app)

# Set up CORS to allow all origins for the signup route
cors = CORS(app,supports_credentials=True,resources={
    r"/socket.io/*": {"origins": "http://localhost:5173"},
    r"/signup": {"origins": "http://localhost:5173"},
    r"/login": {"origins": "http://localhost:5173"},
    r"/messages": {"origins": "http://localhost:5173"},
    r"/user": {"origins": "http://localhost:5173/"},
    r"/refresh": {"origins": "http://localhost:5173/"}
})

socketio = SocketIO(
    app, cors_allowed_origins="*"
)


# Define your RESTful routes
class SignUp(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not all([username, email, password]):
            return {"message": "Missing data"}, 400

        existing_user = User.query.filter(
            (User.username == username) | (User.email == email)
        ).first()
        if existing_user:
            return {"message": "Username or email already taken"}, 400

        hashed_password = generate_password_hash(password)
        new_user = User(
            username=username, email=email, password_hash=hashed_password
        )

        try:
            db.session.add(new_user)
            db.session.commit()
            return {"message": "User created successfully"}, 201
        except sqlalchemy.exc.IntegrityError as e:
            db.session.rollback()
            return {"error": str(e)}, 500

# Add the SignUp resource to the API
api.add_resource(SignUp, "/signup")


class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return {'message': 'Email and password are required'}, 400

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"message": "Email and password are required"}, 400

        user = User.query.filter_by(email=email).first()
        print(user)
        if user and check_password_hash(user.password_hash, password):

            access_token = create_access_token(
                identity=email
            )

            refresh_token = create_refresh_token(
                identity=email
            )

            response = make_response(user.to_dict(only=('id','username','email')), 200)
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)

            return response
        else:
            return {'message': 'Invalid username or password'}, 401


# Add the Login resource to the API
api.add_resource(Login, "/login")

class RefreshToken(Resource):
    @jwt_required(refresh=True)
    def get(self):
        try:
            email = get_jwt_identity()

            new_access_token = create_access_token(
                    identity=email
            )
            
            user = User.query.filter_by(email=email).first()
            u = user.to_dict(only=('id','username','email'))
            response = make_response(u, 200)
            set_access_cookies(response, new_access_token)

            return response
        except Exception as e:

            return {"error": e.args}, 500
        
api.add_resource(RefreshToken,'/refresh')

class MyUser(Resource):
    @jwt_required()
    def get(self):
        if user := User.query.filter_by(email=get_jwt_identity()).first():
            u = user.to_dict(only=('id','username','email'))
            return u,200
        else:
            return {'error':'User not found'}
        
api.add_resource(MyUser,'/user')

class Messages(Resource):
    def get(self):
        socketio.emit('message',{
            'id': 1,
            'sender': "danner b",
            'text': 'testtttt',
        })
        return [
            message.to_dict(only=("id", "content"))
            for message in Message.query.all()
        ]

    def post(self):
        json = request.json

        sender_id = json.get("sender_id")

        reciever_id = json.get("reciever_id")

        chat_id = json.get("chat_id")

        content = json.get("content")

        try:
            message = Message(
                sender_id=sender_id,
                reciever_id=reciever_id,
                chat_id=chat_id,
                content=content,
            )
            db.session.add(message)
            db.session.commit()
            return message.to_dict(only=('id'))

        except Exception as e:
            db.session.rollback()
            return {"error": e.args}
        
api.add_resource(Messages,'/messages')

@socketio.on('connect')
def handle_connect():
    print('Client connected')

if __name__ == "__main__":
    socketio.run(app,debug=True)
