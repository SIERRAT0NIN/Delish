from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from werkzeug.security import generate_password_hash
from sqlalchemy.sql import func
from .models import User, db  # Import your models here
from __init__ import app






@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([username, email, password]):
        return jsonify({'message': 'Missing data'}), 400

    # Check if username or email already exists
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        if existing_user.username == username:
            return jsonify({'message': 'Username already taken'}), 400
        if existing_user.email == email:
            return jsonify({'message': 'Email already in use'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password_hash=hashed_password)
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except sqlalchemy.exc.IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Unexpected error occurred'}), 500



if __name__ == "__main__":
    app.run(debug=True)
