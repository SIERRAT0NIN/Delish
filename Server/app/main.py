from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource, reqparse
from werkzeug.security import generate_password_hash, check_password_hash
import sqlalchemy
from sqlalchemy import or_
from flask_socketio import SocketIO, join_room, leave_room
from datetime import datetime, timedelta
# from models import User, Message, Chat, Post, Profile
from models import *
from app_config import db
# from .app_config import db
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
        r"/socket.io/*": {"origins": ["http://10.0.0.200:5173"]},
        r"/signup": {"origins": "http://localhost:5173"},
        r"/login": {"origins": "http://localhost:5173"},
        r"/messages": {"origins": "http://localhost:5173"},
        r"/user": {"origins": "http://localhost:5173"},
        r"/refresh": {"origins": "http://localhost:5173"},
        r"/posts": {"origins": "http://localhost:5173"},
        r"/search_users": {"origins": "*"},
    },
)
CORS(
    app, supports_credentials=True, origins="http://localhost:5173"
)  # Adjust the origin as needed

socketio = SocketIO(app, cors_allowed_origins=["http://10.0.0.200:5173"])


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
        
        if user and check_password_hash(user.password_hash, password):
            print(email)
            access_token = create_access_token(identity=email)

            refresh_token = create_refresh_token(identity=email)

            # response = make_response(
            #     user.to_dict(only=("id", "username", "email")), 200
            # )
            user_data = user.to_dict(
                only=("id", "username", "email")
            )  # Assuming to_dict() works as expected
            user_data["access_token"] = access_token
            user_data["refresh_token"] = refresh_token
            # set_access_cookies(response, access_token)
            # set_refresh_cookies(response, refresh_token)
            response = make_response(
                user_data, 200
            )  # Send the modified user data including tokens
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)
            return response
        else:
            return {"message": "Invalid username or password"}, 401


# Add the Login resource to the API
api.add_resource(Login, "/login")


class RefreshToken(Resource):
    @jwt_required(refresh=True)
    def post(self):
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

        receiver_id = json.get("receiver_id")

        chat_id = json.get("chat_id")

        content = json.get("content")

        try:
            message = Message(
                sender_id=sender_id,
                receiver_id=receiver_id,
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
            return user.to_dict(
                only=(
                    "all_chats.id",
                    "all_chats.user1_id",
                    "all_chats.user2_id",
                    "all_chats.user1.username",
                    "all_chats.user2.username",
                )
            )

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
    def get(self, id):

        # Get the current user's identity from the JWT
        # current_user_id = get_jwt_identity()

        chat = db.session.get(Chat, id)

        #! Query the database to check if the user is part of the chat

        # if not chat:
        #     return {"error": "Chat not found or unauthorized access"}, 404

        # Return the chat details
        return chat.to_dict(
            only=(
                "messages.content",
                "messages.id",
                "messages.sender.username",
                "messages.sender.id",
                "messages.receiver.username",
                "messages.receiver.id",
                "user1_id",
                "user2_id",
            )
        )


# Add the resource to your API
api.add_resource(ChatID, "/chats/<int:id>")



class Posts(Resource):
    @jwt_required()
    def get(self):
        # user_id = get_jwt_identity()
        # Using .first_or_404() to simplify and directly handle user not found scenario.
        posts = Post.query.all()
        if not posts:
            return jsonify([])
        return jsonify([post.to_dict() for post in posts])

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first_or_404(
            description="User not found."
        )

    # # Accessing the profile picture
    # if user and user.profile:
    #     profile_picture_url = user.profile.profile_picture
    #     print(f"Profile picture URL: {profile_picture_url}")
    # else:
    #     print("User not found or user does not have a profile.")

        data = request.get_json()

        content = data.get("content")
        ingredients = data.get("ingredients")
        image_url = data.get(
            "image_url", None
        )  # Using None as default if key doesn't exist

        if not content or not ingredients:
            return {"error": "Missing data for content or ingredients"}, 400

        try:
            new_post = Post(
                user_id=user.id,
                content=content,
                ingredients=ingredients,
                image_url=image_url,
            )
            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict(), 201  # 201 Created
        except IntegrityError as e:
            db.session.rollback()
            return {"error": "Failed to create new post.", "details": str(e)}, 500
    @jwt_required()
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument('content', required=True, help="Content cannot be blank")
        
        args = request.json


        current_user_email = get_jwt_identity()
        current_user = User.query.filter_by(email=current_user_email).first()
        print(current_user_email)
        print(1)
        
        if not current_user:
            return {'message': 'User not found'}, 404
        all_ingredients = ''.join(args['ingredients'])
        # Create the post
        new_post = Post(user_id=current_user.id, content=args['content'], ingredients=all_ingredients, image_url=args['image_url'])


        try:
            db.session.add(new_post)
            db.session.commit()
            return {'message': 'Post created successfully', 'post_id': new_post.id}, 201
        except Exception as e:
            db.session.rollback()
            return {'message': 'An error occurred while creating the post', 'error': str(e)}, 500



# Ensure to add the resource to the API after the class definition
api.add_resource(Posts, "/posts")


class UserPosts(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        # Using .first_or_404() to simplify and directly handle user not found scenario.
        posts = Post.query.filter_by(user_id=user_id).all()
        
        if not posts:
            return jsonify([])
        return jsonify([post.to_dict() for post in posts])

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first_or_404(
            description="User not found."
        )
        data = request.get_json()

        content = data.get("content")
        ingredients = data.get("ingredients")
        image_url = data.get(
            "image_url", None
        )  # Using None as default if key doesn't exist

        if not content or not ingredients:
            return {"error": "Missing data for content or ingredients"}, 400

        try:
            new_post = Post(
                user_id=user.id,
                content=content,
                ingredients=ingredients,
                image_url=image_url,
            )
            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict(), 201  # 201 Created
        except IntegrityError as e:
            db.session.rollback()
            return {"error": "Failed to create new post.", "details": str(e)}, 500


# Ensure to add the resource to the API after the class definition
api.add_resource(UserPosts, "/user/posts")


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


@socketio.on("join")
def handle_join(data):
    room = data["room"]
    join_room(room)


@socketio.on("leave")
def on_leave(data):
    # username = data['username']
    room = data["room"]
    leave_room(room)


@socketio.on("client_message")
def handle_message(_message):
    chat_id = _message.get("chat_id")
    sender_id = _message.get("sender_id")
    receiver_id = _message.get("receiver_id")
    content = _message.get("content")

    if chat_id and sender_id and receiver_id and content:
        print("111111")
        message = Message(
            chat_id=chat_id,
            sender_id=sender_id,
            receiver_id=receiver_id,
            content=content,
        )
        try:
            db.session.add(message)
            db.session.commit()

            m = message.to_dict(
                only=("id", "sender_id", "receiver_id", "chat_id", "content")
            )

            print(message)

            # Emit the message to the specific chatroom
            print(f"Broadcasted message to room chat_{chat_id}")
            socketio.emit("server_message", m, room=f"chat_{chat_id}")

        except Exception as e:
            db.session.rollback()
            return {"error": e.args}

        print(message)
    else:
        print("Invalid args")


@socketio.on("connect_error")
def error(err):
    print(err)
    
    
class SearchUsers(Resource):
    def get(self):
        query = request.args.get('query')
        if query:
            users = User.query.filter(User.username.ilike(f'%{query}%')).all()
            profile = Profile.query.filter(Profile.user_id.in_([user.id for user in users])).all()
            return [user.to_dict() for user in users]  
  
            if user and user.profile:
                profile_picture_url = user.profile.profile_picture
                print(f"Profile picture URL: {profile_picture_url}")
            else:
                print("User not found or user does not have a profile.")
        return []

api.add_resource(SearchUsers, '/search_users')

# class LikePost(Resource):
#     @jwt_required()
#     def post(self, post_id):
#         current_user_email = get_jwt_identity()
#         current_user = User.query.filter_by(email=current_user_email).first()

#         if not current_user:
#             return {'message': 'User not found'}, 404

#         post = Post.query.get_or_404(post_id)


#         try:
#             current_user.like_post(post)
#             db.session.commit()
#             return {'message': 'Post liked successfully'}, 200
#         except Exception as e:
#             db.session.rollback()
#             return {'message': 'An error occurred while liking the post', 'error': str(e)}, 500

# api.add_resource(LikePost, '/like/<int:post_id>')

# class LikePost(Resource):
#     @jwt_required()
#     def post(self, post_id):
#         current_user_email = get_jwt_identity()
#         current_user = User.query.filter_by(email=current_user_email).first()

#         if not current_user:
#             return {'message': 'User not found'}, 404

#         post = Post.query.get_or_404(post_id)

#         # Check if the post is already liked by the current user
#         if current_user.has_liked_post(post):
#             return {'message': 'Post already liked by this user'}, 400
#         try:
#             current_user.like_post(post)
#             db.session.commit()
#             return {'message': 'Post liked successfully'}, 200
#         except Exception as e:
#             db.session.rollback()
#             return {'message': 'An error occurred while liking the post', 'error': str(e)}, 500
        
#     @jwt_required()
#     def delete(self, post_id):
#         current_user_email = get_jwt_identity()
#         current_user = User.query.filter_by(email=current_user_email).first()

#         if not current_user:
#             return {'message': 'User not found'}, 404

#         post = Post.query.get_or_404(post_id)

#         try:
#             # Directly attempt to unlike the post without checking if it's currently liked
#             current_user.unlike_post(post)  # Assumes you have an unlike_post method
#             db.session.commit()
#             return {'message': 'Post unliked successfully'}, 200
#         except Exception as e:
#             db.session.rollback()
#             return {'message': 'An error occurred while unliking the post', 'error': str(e)}, 500
class LikePost(Resource):
    @jwt_required()
    def post(self, post_id):
        current_user_email = get_jwt_identity()
        current_user = User.query.filter_by(email=current_user_email).first()

        if not current_user:
            return {'message': 'User not found'}, 404

        post = Post.query.get_or_404(post_id)

        # Toggle like state
        if current_user.has_liked_post(post):
            try:
                # If the post is already liked, unlike it
                current_user.unlike_post(post)
                db.session.commit()
                return {'message': 'Post unliked successfully'}, 200
            except Exception as e:
                db.session.rollback()
                return {'message': 'An error occurred while unliking the post', 'error': str(e)}, 500
        else:
            try:
                # If the post is not liked, like it
                current_user.like_post(post)
                db.session.commit()
                return {'message': 'Post liked successfully'}, 200
            except Exception as e:
                db.session.rollback()
                return {'message': 'An error occurred while liking the post', 'error': str(e)}, 500
    @jwt_required()
    def delete(self, post_id):
        # Unlike post logic
        current_user_email = get_jwt_identity()
        current_user = User.query.filter_by(email=current_user_email).first()

        if not current_user:
            return {'message': 'User not found'}, 404

        post = Post.query.get_or_404(post_id)

        if not current_user.has_liked_post(post):
            return {'message': 'Post not liked by this user'}, 400

        try:
            current_user.unlike_post(post)
            db.session.commit()
            return {'message': 'Post unliked successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': 'An error occurred while unliking the post', 'error': str(e)}, 500



api.add_resource(LikePost, '/like/<int:post_id>')

class DeleteUser(Resource):
    @jwt_required()
    def delete(self):
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()

        if not user:
            return {'message': 'User not found'}, 404

        try:
            db.session.delete(user)
            db.session.commit()
            return {'message': 'User deleted successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': 'Failed to delete user', 'error': str(e)}, 500
        
api.add_resource(DeleteUser, '/delete_user')
class CommentOnPost(Resource):
    @jwt_required()
    def post(self, post_id):
        parser = reqparse.RequestParser()
        parser.add_argument('content', required=True, help="Content cannot be blank")
        args = parser.parse_args()

        current_user_email = get_jwt_identity()
        current_user = User.query.filter_by(email=current_user_email).first()

        if not current_user:
            return {'message': 'User not found'}, 404

        post = Post.query.get_or_404(post_id)

        comment = Comment(content=args['content'], post_id=post.id, user_id=current_user.id)

        try:
            db.session.add(comment)
            db.session.commit()
            return {'message': 'Comment added successfully', 'comment_id': comment.id}, 201
        except Exception as e:
            db.session.rollback()
            return {'message': 'An error occurred while adding the comment', 'error': str(e)}, 500

    @jwt_required()
    def get(self, post_id):
        post = Post.query.get_or_404(post_id)
        comments = Comment.query.filter_by(post_id=post.id).all()
        
        if comments:
            comments_data = [{
                'id': comment.id,
                'user_id': comment.user_id,
                'post_id': comment.post_id,
                'content': comment.content,
                'created_at': comment.created_at.strftime('%Y-%m-%d %H:%M:%S')  # Formatting the datetime
            } for comment in comments]
            return {'comments': comments_data}, 200
        else:
            return {'message': 'No comments found for this post'}, 404

api.add_resource(CommentOnPost, '/posts/<int:post_id>/comment')

class ProfileResource(Resource):
    def get(self, profile_id):
        profile = Profile.query.get_or_404(profile_id)
        return jsonify(profile.to_dict())

api.add_resource(ProfileResource, '/profiles/<int:profile_id>')

 

class Follow(Resource):
    @jwt_required()
 

    def post(self, user_id):
        current_user_id = get_jwt_identity()
        
        follower = User.query.filter_by(email=current_user_id).first()
        if follower.id == user_id:
            return {"error": "You cannot follow yourself"}, 400

        user_to_follow = User.query.get_or_404(user_id)
        if follower.is_following(user_to_follow):
            return {"message": "Already following"}, 409

        try:
            follower.follow(user_to_follow)
            db.session.commit()
            return {"message": f"Now following {user_to_follow.username}"}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": "Unable to follow user", "details": str(e)}, 500
    @jwt_required()
    def delete(self, user_id):
        current_user_id = get_jwt_identity()
        follower = User.query.filter_by(email=current_user_id).first()
        
        if follower.id == int(user_id):
            return {"error": "You cannot unfollow yourself"}, 400

        user_to_unfollow = User.query.get_or_404(user_id)
        if not follower.is_following(user_to_unfollow):
            return {"message": "Not following this user"}, 404

        try:
            follower.unfollow(user_to_unfollow)
            db.session.commit()
            return {"message": f"Unfollowed {user_to_unfollow.username}"}, 200
        except Exception as e:
            db.session.rollback()
            return {"error": "Unable to unfollow user", "details": str(e)}, 500
    @jwt_required()
    def get(self, user_id):
        current_user_id = get_jwt_identity()
        
        # Ensure a user can only see their own follow stats or make this publicly available
        # depending on your application's requirements
        if str(current_user_id) != str(user_id):
            return {"error": "Access denied"}, 403

        user = User.query.get_or_404(user_id)
        
        # Assuming 'followers' and 'followed' are the relationship attributes
        # You might need to adjust these based on your actual model attributes
        followers_count = user.followers.count()
        followed_count = user.followed.count()
        
        return jsonify({
            "followers_count": followers_count,
            "followed_count": followed_count
        })
# Add the resource to the API
api.add_resource(Follow, '/users/<int:user_id>/follow')
class UserFollowInfo(Resource):
    @jwt_required()
    def get(self, user_id):
        # Removing the identity check to make follow info publicly accessible
        user = User.query.get_or_404(user_id)
        
        followers_count = user.followers.count()
        followed_count = user.followed.count()
        
        return jsonify({
            "followers_count": followers_count,
            "followed_count": followed_count
        })

# Add the resource to the API
api.add_resource(UserFollowInfo, '/users/<int:user_id>/follow-info')

if __name__ == "__main__":
    socketio.run(app, debug=True, host="0.0.0.0", port=5050)
