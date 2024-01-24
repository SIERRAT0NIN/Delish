from flask import Flask, request, make_response
from flask_restful import Api, Resource
from werkzeug.security import generate_password_hash, check_password_hash
import sqlalchemy
from sqlalchemy import or_
from flask_socketio import SocketIO
from datetime import datetime, timedelta
from models import db, User, Message, Chat
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    jwt_required,
    get_jwt_identity,
    unset_access_cookies,
    unset_refresh_cookies,
)
from dotenv import load_dotenv
import os

load_dotenv()  # Add this at the beginning


app = Flask(__name__)
# Configure your app
jwt_secret = os.getenv("JWT_SECRET")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.db"
app.config["JWT_TOKEN_LOCATION"] = ["cookies", "headers"]
app.config["JWT_COOKIE_SAMESITE"] = "Strict"
app.config["JWT_SECRET_KEY"] = jwt_secret
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=12)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)  # Add this line

db.init_app(app)

Migrate(app, db)

# Set up Flask-RESTful
api = Api(app)

# Set up CORS to allow all origins for the signup route
cors = CORS(
    app,
    supports_credentials=True,
    resources={
        r"/socket.io/*": {"origins": "http://localhost:5173"},
        r"/signup": {"origins": "http://localhost:5173"},
        r"/login": {"origins": "http://localhost:5173"},
        r"/messages": {"origins": "http://localhost:5173"},
        r"/user": {"origins": "http://localhost:5173/"},
        r"/refresh": {"origins": "http://localhost:5173/"},
    },
)

socketio = SocketIO(app, cors_allowed_origins="*")


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
        new_user = User(username=username, email=email, password_hash=hashed_password)

        try:
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity=email)

            refresh_token = create_refresh_token(identity=email)

            response = make_response(
                new_user.to_dict(only=("id", "username", "email")), 200
            )

            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)

            return response
        except sqlalchemy.exc.IntegrityError as e:
            db.session.rollback()
            return {"error": str(e)}, 500


# Add the SignUp resource to the API
api.add_resource(SignUp, "/signup")


class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"message": "Email and password are required"}, 400

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"message": "Email and password are required"}, 400

        user = User.query.filter_by(email=email).first()
        print(user)
        if user and check_password_hash(user.password_hash, password):
            access_token = create_access_token(identity=email)

            refresh_token = create_refresh_token(identity=email)

            response = make_response(
                user.to_dict(only=("id", "username", "email")), 200
            )
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)

            return response
        else:
            return {"message": "Invalid username or password"}, 401


# Add the Login resource to the API
api.add_resource(Login, "/login")


class RefreshToken(Resource):
    @jwt_required(refresh=True)
    def get(self):
        try:
            email = get_jwt_identity()

            new_access_token = create_access_token(identity=email)

            user = User.query.filter_by(email=email).first()
            u = user.to_dict(only=("id", "username", "email"))
            response = make_response(u, 200)
            set_access_cookies(response, new_access_token)

            return response
        except Exception as e:
            return {"error": e.args}, 500


api.add_resource(RefreshToken, "/refresh")


class MyUser(Resource):
    @jwt_required()
    def get(self):
        if user := User.query.filter_by(email=get_jwt_identity()).first():
            u = user.to_dict(only=("id", "username", "email"))
            return u, 200
        else:
            return {"error": "User not found"}, 404


api.add_resource(MyUser, "/user")


class Messages(Resource):
    def get(self):
        socketio.emit(
            "message",
            {
                "id": 1,
                "sender": "danner b",
                "text": "testtttt",
            },
        )
        return [
            message.to_dict(only=("id", "content")) for message in Message.query.all()
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
            return message.to_dict(only=("id"))

        except Exception as e:
            db.session.rollback()
            return {"error": e.args}, 500


api.add_resource(Messages, "/messages")


class Chats(Resource):
    @jwt_required()
    def get(self):
        if user := User.query.filter_by(email=get_jwt_identity()).first():
            return user.to_dict(only=("all_chats.id",'all_chats.user1_id','all_chats.user2_id','all_chats.user1.username','all_chats.user2.username',))

    @jwt_required()
    def post(self):
        user1_id = request.json.get("user1_id")
        user2_name = request.json.get("user2_name")

        if user1_id and user2_name:
            existing_chat = (
                Chat.query.join(
                    User,
                    or_(
                        (Chat.user1_id == user1_id) & (User.id == Chat.user2_id),
                        (Chat.user2_id == user1_id) & (User.id == Chat.user1_id),
                    ),
                )
                .filter(User.username == user2_name)
                .first()
            )

            if existing_chat:
                return {"error": "Chat already exists"}, 400

            if (current_user := User.query.filter_by(id=user1_id).first()) and (
                other_user := User.query.filter_by(username=user2_name).first()
            ):
                if current_user.id == other_user.id:
                    return {"error": "You cant start a chat with yourself"}, 400
                try:
                    chat = Chat(user1_id=current_user.id, user2_id=other_user.id)
                    db.session.add(chat)
                    db.session.commit()
                    return chat.to_dict(only=("id",))
                except Exception as e:
                    db.session.rollback()
                    return {"error": str(e)}, 500
            else:
                return {"error": "Invalid user id or other user username"}, 400
        else:
            return {"error": "Invalid arguments"}, 400


api.add_resource(Chats, "/chats")

class ChatID(Resource):
    @jwt_required()
    def get(self,id):

        # Get the current user's identity from the JWT
        # current_user_id = get_jwt_identity()

        chat = db.session.get(Chat,id)

        #! Query the database to check if the user is part of the chat

        # if not chat:
        #     return {"error": "Chat not found or unauthorized access"}, 404

        # Return the chat details
        return chat.to_dict(only=('messages.id','messages.sender.username','messages.reciever.username'))


# Add the resource to your API
api.add_resource(ChatID, '/chats/<int:id>')


class Logout(Resource):
    def delete(self):
        response = make_response({}, 204)
        unset_access_cookies(response)
        unset_refresh_cookies(response)
        return response


api.add_resource(Logout, "/user/logout")


@socketio.on("connect")
def handle_connect():
    print("Client connected")


if __name__ == "__main__":
    socketio.run(app, debug=True)
