# from app import create_app
# from app.models import *
# from app.app_config import db

# def seed_database():
#     app = create_app()

#     with app.app_context():
#         db.drop_all()
#         db.create_all()

#         for i in range(10):  # Loop to create 10 users
#             username = f"Alberto.Sierra{i}"
#             email = f"Alberto{i}@Sierra.com"
#             password_hash = "password"

#             user = User(
#                 username=username,
#                 email=email,
#                 password_hash=password_hash,
#             )
#             profile = Profile(
#                 user=user,
#                 bio=f'This is a bio for {username}',
#                 profile_picture='https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
#             )
            
#             post = Post(
#                 author=user,
#                 title=f"This is a post title {i}",
#                 content="This is a post content",
#                 ingredients="This is a list of ingredients",
#                 image_url='https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
#             )
#             comment = Comment(
#                 user=user,
#                 post=post,
#                 content=f"This is a comment content {i}"
#             )
#             tags= Tag(
#                 name=f"Tag {i}"
#             )


#             db.session.add_all([user, profile, post, comment,tags])
#             # Add tags and comments as needed

#         db.session.commit()
#         print("Database seeded with fake data!✨")

# if __name__ == "__main__":
#     seed_database()
from app import create_app
from app.models import *
from app.app_config import db

def seed_database():
    app = create_app()

    with app.app_context():
        db.drop_all()
        db.create_all()

        # User 1
        user1 = User(username="Alice", email="alice@example.com", password_hash="password")
        profile1 = Profile(user=user1, bio="This is Alice's bio", profile_picture="https://example.com/alice.jpg")
        post1 = Post(author=user1, title="Alice's First Post", content="Content of the first post by Alice", ingredients="List of ingredients by Alice", image_url="https://example.com/post1.jpg")
        comment1 = Comment(user=user1, post=post1, content="Alice's comment on her own post")
        tag1 = Tag(name="Foodie")

        # User 2
        user2 = User(username="Bob", email="bob@example.com", password_hash="password")
        profile2 = Profile(user=user2, bio="This is Bob's bio", profile_picture="https://example.com/bob.jpg")
        post2 = Post(author=user2, title="Bob's First Post", content="Content of the first post by Bob", ingredients="List of ingredients by Bob", image_url="https://example.com/post2.jpg")
        comment2 = Comment(user=user2, post=post2, content="Bob's comment on his own post")
        tag2 = Tag(name="Travel")
        
        user3 = User(username="Alberto_Sierra", email="alberto@admin.com", password_hash="password")
        profile3 = Profile(user=user3, bio="This is Alberto's bio", profile_picture="https://example.com/bob.jpg")
        post3 = Post(author=user3, title="Bob's First Post", content="Content of the first post by Bob", ingredients="List of ingredients by Alberto", image_url="https://example.com/post2.jpg")
        comment3 = Comment(user=user3, post=post2, content="Alberto's comment on his own post")
        tag3 = Tag(name="example")

        # Manually adding each user, profile, post, comment, and tag to the session
        db.session.add_all(
            [user1, profile1, post1, comment1, tag1, user2, profile2, post2, comment2, tag2, user3, profile3, post3, comment3, tag3]
            )
        
        db.session.commit()
        print("Database seeded with fake data!✨")

if __name__ == "__main__":
    seed_database()
