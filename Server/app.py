from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash
from sqlalchemy.sql import func


db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    
    db.init_app(app)
    migrate = Migrate(app, db)

    class User(db.Model):
        __tablename__ = 'users'
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(80), unique=True, nullable=False)
        email = db.Column(db.String(80), unique=True, nullable=False)
        password_hash = db.Column(db.String(128))
        posts = db.relationship('Post', backref='author', lazy='dynamic')
        comments = db.relationship('Comment', backref='commenter', lazy='dynamic')
        profile = db.relationship('Profile', backref='user', uselist=False)

        def __repr__(self):
            return f'<User {self.username}>'

    class Post(db.Model):
        __tablename__ = 'posts'
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
        content = db.Column(db.Text, nullable=False)
        image_url = db.Column(db.String(255))
        created_at = db.Column(db.DateTime(timezone=True), default=func.now())
        comments = db.relationship('Comment', backref='post', lazy='dynamic')

        def __repr__(self):
            return f'<Post {self.id}>'

    class Comment(db.Model):
        __tablename__ = 'comments'
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
        post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
        content = db.Column(db.Text, nullable=False)
        created_at = db.Column(db.DateTime(timezone=True), default=func.now())

        def __repr__(self):
            return f'<Comment {self.id}>'

    class Tag(db.Model):
        __tablename__ = 'tags'
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(50), unique=True, nullable=False)
        # Relationship with Post model needs to be defined (possibly a many-to-many relationship)

        def __repr__(self):
            return f'<Tag {self.name}>'

    class Profile(db.Model):
        __tablename__ = 'profiles'
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
        bio = db.Column(db.Text)
        profile_picture = db.Column(db.String(255))
        # Other fields can be added as needed

        def __repr__(self):
            return f'<Profile {self.id}>'
        
    @app.route('/signup', methods=['POST'])
    def signup():
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not all([username, email, password]):
            return jsonify({'message': 'Missing data'}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'Email already in use'}), 400

        hashed_password = generate_password_hash(password)
        new_user = User(username=username, email=email, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'}), 201

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
