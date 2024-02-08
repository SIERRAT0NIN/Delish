from flask_sqlalchemy import SQLAlchemy  # cSpell:ignore SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func
from app_config import db


class Profile(db.Model, SerializerMixin):
    __tablename__ = "profiles"

    __table_args__ = {"extend_existing": True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), unique=True, nullable=False
    )
    bio = db.Column(db.Text)
    profile_picture = db.Column(db.String(255))

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

    def __repr__(self):
        return f"<Comment {self.id}>"


post_tags = db.Table(
    "post_tags",
    db.Column("post_id", db.Integer, db.ForeignKey("posts.id"), primary_key=True),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id"), primary_key=True),
    extend_existing=True,
)


class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    comments = db.relationship("Comment", backref="post", lazy="dynamic")

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
            "content": self.content,
            "ingredients": self.ingredients,
            "image_url": self.image_url,
            "created_at": self.created_at.isoformat(),  # Format datetime as a string
            # Include any other fields you want in the response
        }

    def __repr__(self):
        return f"<Post {self.id}>"


class Tag(db.Model, SerializerMixin):
    __tablename__ = "tags"
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    # Relationship with Post model needs to be defined (possibly a many-to-many relationship)

    def __repr__(self):
        return f"<Tag {self.name}>"


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
    comments = db.relationship(
        "Comment",
        backref="commenter",
        lazy="dynamic",
        cascade="all, delete, delete-orphan",
    )
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
