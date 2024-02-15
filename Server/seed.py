from app import create_app
from app.models import *
from app.app_config import db

def seed_database():
    app = create_app()

    with app.app_context():
        db.drop_all()
        db.create_all()

        for i in range(10):  # Loop to create 10 users
            username = f"Alberto.Sierra{i}"
            email = f"Alberto{i}@Sierra.com"
            password_hash = "password"

            user = User(
                username=username,
                email=email,
                password_hash=password_hash,
            )
            profile = Profile(
                user=user,
                bio=f'This is a bio for {username}',
                profile_picture='https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            )
            post = Post(
                author=user,
                content="This is a post content",
                ingredients="This is a list of ingredients",
                image_url='https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            )
            # Note: Ensure Tag and Comment objects are correctly related to the User and Post objects as needed

            db.session.add_all([user, profile, post])
            # Add tags and comments as needed

        db.session.commit()
        print("Database seeded with fake data!✨")

if __name__ == "__main__":
    seed_database()
