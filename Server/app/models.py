from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func
from app_config import db
# from .app_config import db


class Profile(db.Model, SerializerMixin):
    __tablename__ = "profiles"

    __table_args__ = {"extend_existing": True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), unique=True, nullable=False
    )
    bio = db.Column(db.Text)
    profile_picture = db.Column(db.String(255))
    def to_dict(self):
        return {
            'profile_picture': self.profile_picture,
            'bio': self.bio
        }
    
    user = db.relationship("User", back_populates="profile")

    def __repr__(self):
        return f"<Profile {self.id}>"


class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())

    post = db.relationship("Post", back_populates='comments')

    commenter = db.relationship('User', back_populates='comments')
    user = db.relationship('User', back_populates='user_comments',overlaps="commenter")
    def __repr__(self):
        return f"<Comment {self.id}>"


post_tags = db.Table(
    "post_tags",
    db.Column("post_id", db.Integer, db.ForeignKey("posts.id"), primary_key=True),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id"), primary_key=True),
    extend_existing=True,
)


likes = db.Table('likes',
                 db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
                 db.Column('post_id', db.Integer, db.ForeignKey('posts.id'), primary_key=True))


class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    comments = db.relationship("Comment", back_populates='post', lazy="dynamic")
    likers = db.relationship('User', secondary=likes, lazy='dynamic', back_populates='liked_posts')
    comments = db.relationship('Comment', back_populates='post', lazy='dynamic')
    

    tags = db.relationship(
        "Tag",
        secondary=post_tags,
        lazy="subquery",
        backref=db.backref("posts", lazy=True),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "content": self.content,
            "ingredients": self.ingredients.split(','),  
            "image_url": self.image_url,
            "created_at": self.created_at.isoformat(),  

        }

    def __repr__(self):
        return f"<Post {self.id}>"


class Tag(db.Model, SerializerMixin):
    __tablename__ = "tags"
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)


    def __repr__(self):
        return f"<Tag {self.name}>"
    
    
followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

 

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    posts = db.relationship(
        "Post", backref="author", lazy="dynamic", cascade="all, delete, delete-orphan"
    )
    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'),
        lazy='dynamic'
    )
 
    liked_posts = db.relationship('Post', secondary=likes, lazy='dynamic', back_populates='likers')

 
    def like_post(self, post):
        if not self.has_liked_post(post):
            self.liked_posts.append(post)
        else:
            self.liked_posts.remove(post)
        db.session.commit()

    def unlike_post(self, post):
        if self.has_liked_post(post):
            self.liked_posts.remove(post)
            db.session.commit()

    def has_liked_post(self, post):
        return post in self.liked_posts
    
    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0
    comments = db.relationship('Comment', back_populates='commenter', overlaps="user")
    user_comments = db.relationship('Comment', back_populates='user', overlaps="commenter,comments")
    profile = db.relationship(
        "Profile",
        back_populates="user",
        uselist=False,  # cSpell:ignore uselist
        cascade="all, delete, delete-orphan",
    )

    sent_messages = db.relationship(
        "Message",
        back_populates="sender",
        foreign_keys="Message.sender_id",
        cascade="all, delete, delete-orphan",
    )

    received_messages = db.relationship(
        "Message",
        back_populates="receiver",
        foreign_keys="Message.receiver_id",
        cascade="all, delete, delete-orphan",
    )

    chats_as_user1 = db.relationship(
        "Chat",
        back_populates="user1",
        foreign_keys="Chat.user1_id",
        overlaps="all_chats",
    )

    chats_as_user2 = db.relationship(
        "Chat",
        back_populates="user2",
        foreign_keys="Chat.user2_id",
        overlaps="all_chats",
    )

    all_chats = db.relationship(
        "Chat",
        back_populates="users",
        primaryjoin="or_(User.id == Chat.user1_id, User.id == Chat.user2_id)",
        overlaps="chats_as_user1,chats_as_user2",
        
        
    )
    
    def to_dict(self, only=None):
            profile_data = self.profile.to_dict() if self.profile else {}
            all_fields = {
                'id': self.id,
                'username': self.username,
                'email': self.email,
                'profile_picture': profile_data.get('profile_picture'),
                'bio': profile_data.get('bio'),
            }
            if only is None:
                return all_fields
            else:
                return {key: value for key, value in all_fields.items() if key in only}
    
    def get_username_by_user_id(user_id):
        user = User.query.filter_by(id=user_id).first()
        if user:
            return user.username
        else:
            return None
    def __repr__(self):
        return f"<User {self.username}>"


class Message(db.Model, SerializerMixin):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)

    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    receiver_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    chat_id = db.Column(db.Integer, db.ForeignKey("chats.id"), nullable=False)

    content = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)

    sender = db.relationship(
        "User", back_populates="sent_messages", foreign_keys=[sender_id]
    )

    receiver = db.relationship(
        "User", back_populates="received_messages", foreign_keys=[receiver_id]
    )

    chat = db.relationship("Chat", back_populates="messages")


class Chat(db.Model, SerializerMixin):
    __tablename__ = "chats"

    id = db.Column(db.Integer, primary_key=True)

    user1_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user2_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    messages = db.relationship("Message", back_populates="chat")

    user1 = db.relationship(
        "User",
        back_populates="chats_as_user1",
        foreign_keys=[user1_id],
        overlaps="all_chats",
    )

    user2 = db.relationship(
        "User",
        back_populates="chats_as_user2",
        foreign_keys=[user2_id],
        overlaps="all_chats",
    )

    # Tomfoolery
    users = db.relationship(
        "User",
        back_populates="all_chats",
        primaryjoin="or_(User.id == Chat.user1_id, User.id == Chat.user2_id)",
        overlaps="chats_as_user1,chats_as_user2,users,user1,user2",
    )
