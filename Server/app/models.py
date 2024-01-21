from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
class Profile(db.Model):
    __tablename__ = 'profiles'

    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    bio = db.Column(db.Text)
    profile_picture = db.Column(db.String(255)) 
    
    
    user = db.relationship('User', back_populates='profile')

    def __repr__(self):
        return f'<Profile {self.id}>'
    
class Comment(db.Model):
    __tablename__ = 'comments'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())

    def __repr__(self):
        return f'<Comment {self.id}>'

post_tags = db.Table('post_tags',
db.Column('post_id', db.Integer, db.ForeignKey('posts.id'), primary_key=True),
db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True),
extend_existing=True)

class Post(db.Model):
    __tablename__ = 'posts'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    comments = db.relationship('Comment', backref='post', lazy='dynamic')


    tags = db.relationship('Tag', secondary=post_tags, lazy='subquery',
                            backref=db.backref('posts', lazy=True))

    def __repr__(self):
        return f'<Post {self.id}>'



class Tag(db.Model):
    __tablename__ = 'tags'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    # Relationship with Post model needs to be defined (possibly a many-to-many relationship)

    def __repr__(self):
        return f'<Tag {self.name}>'

class User(db.Model):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    comments = db.relationship('Comment', backref='commenter', lazy='dynamic')


    profile = db.relationship('Profile', back_populates='user', uselist=False)

    def __repr__(self):
        return f'<User {self.username}>'
