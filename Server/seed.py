from app import create_app
from app.models import *
from faker import Faker
from app.app_config import db


# Function to add sample data to the database
def seed_database():
    app = create_app()  # Create an instance of your Flask app
    faker = Faker()  # Create a Faker instance

    # Clear existing data
    with app.app_context():  # This pushes an application context
        db.drop_all()
        db.create_all()

        for _ in range(10):  # Assuming you want 10 of each
            user = User(
                username=faker.user_name(),
                email=faker.email(),
                password_hash="hashed_password",
            )
            profile = Profile(
                user=user, bio=faker.text(), profile_picture=faker.image_url()
            )
            post = Post(
                author=user,
                content=faker.text(),
                ingredients=faker.text(),
                image_url=faker.image_url(),
            )
            tag = Tag(name=faker.word())
            comment = Comment(commenter=user, post=post, content=faker.text())

            db.session.add_all([user, profile, post, tag, comment])

        db.session.commit()
        print("Database seeded with fake data!✨")


if __name__ == "__main__":
    seed_database()
