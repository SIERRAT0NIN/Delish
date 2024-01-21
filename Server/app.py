# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_restful import Resource, Api
# from werkzeug.security import generate_password_hash
# from .models import User, db  # Import your models here
# import sqlalchemy  # Import the sqlalchemy module

# app = Flask(__name__)
# api = Api(app)  # Create an Api object

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

# # Add the SignUp resource to the API and define the route
# api.add_resource(SignUp, '/signup')

# if __name__ == "__main__":
#     app.run(debug=True)
