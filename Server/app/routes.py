# from app import app
# from .models import User, Post   
# from flask import Flask, request
# from flask_restful import Api, Resource
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_jwt_extended import JWTManager, create_access_token
# import sqlalchemy
# from flask_cors import CORS

# from .app_config import db
# api = Api(app)
# CORS(app, resources={r"/signup": {"origins": "*"}, r"/login": {"origins": "*"}, r"/post/<int:post_id>/image": {"origins": ["http://localhost:5173", "http://127.0.0.1:5000"]},r"/api/*": {"origins": "http://localhost:5173"}})


# class SignUp(Resource):
#     def post(self):
#         data = request.get_json()   

#         username = data.get('username')
#         email = data.get('email')
#         password = data.get('password')

#         if not all([username, email, password]):
#             return {'message': 'Missing data'}, 400

#         existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
#         if existing_user:
#             return {'message': 'Username or email already taken'}, 400

#         hashed_password = generate_password_hash(password)
#         new_user = User(username=username, email=email, password_hash=hashed_password)

#         try:
#             db.session.add(new_user)
#             db.session.commit()
#             return {'message': 'User created successfully'}, 201
#         except sqlalchemy.exc.IntegrityError as e:
#             db.session.rollback()
#             return {'error': str(e)}, 500
# api.add_resource(SignUp, '/signup')

# class Login(Resource):
#     def post(self):
#         data = request.get_json()
#         email = data.get('email')
#         password = data.get('password')
        
#         if not email or not password:
#             return {'message': 'Email and password are required'}, 400

#         user = User.query.filter_by(email=email).first()

#         if user and check_password_hash(user.password_hash, password):
#             access_token = create_access_token(identity=email)   

#             return {'access_token': access_token}, 200
#         else:
#             return {'message': 'Invalid username or password'}, 401

# api.add_resource(Login, '/login')




# class PostImage(Resource):  
#     def get(self, post_id):
#         import ipdb; ipdb.set_trace()
#         post = Post.query.get(post_id)
#         if post:
#             return {'image_url': post.image_url}, 200
#         else:
#             return {'message': 'Post not found123'}, 404

# api.add_resource(PostImage, '/post/<int:post_id>/image')

