 
from  app import create_app, db
from  app.models import User, Profile, Post, Comment, Tag
from faker import Faker



# Function to add sample data to the database
def seed_database():
    app = create_app()  # Create an instance of your Flask app
    faker = Faker()  # Create a Faker instance

    # Clear existing data
    with app.app_context():  # This pushes an application context
        db.drop_all()
        db.create_all()


        # Create users
        # user1 = User(username='john_doe', email='john@example.com', password_hash='hashed_password')
        # user2 = User(username='jane_doe', email='jane@example.com', password_hash='hashed_password')

        # # Create profiles
        # profile1 = Profile(user=user1, bio='Bio for John', profile_picture='url/to/john_picture')
        # profile2 = Profile(user=user2, bio='Bio for Jane', profile_picture='url/to/jane_picture')

        # # Create tags
        # tag1 = Tag(name='Healthy')
        # tag2 = Tag(name='Quick')

        # # Create posts
        # post1 = Post(author=user1, content='Post content 1', ingredients='Ingredients for post 1', image_url='url/to/post1_image')
        # post2 = Post(author=user2, content='Post content 2', ingredients='Ingredients for post 2', image_url='url/to/post2_image')

        # # Add tags to posts
        # post1.tags.append(tag1)
        # post2.tags.append(tag2)

        # # Create comments
        # comment1 = Comment(commenter=user1, post=post1, content='Great post!')
        # comment2 = Comment(commenter=user2, post=post1, content='Thanks for sharing!')

        # # Add all to session and commit
        # db.session.add_all([user1, user2, profile1, profile2, tag1, tag2, post1, post2, comment1, comment2])
        # db.session.commit()
        for _ in range(10):  # Assuming you want 10 of each
            user = User(username=faker.user_name(), email=faker.email(), password_hash='hashed_password')
            profile = Profile(user=user, bio=faker.text(), profile_picture=faker.image_url())
            post = Post(author=user, content=faker.text(), ingredients=faker.text(), image_url=faker.image_url())
            tag = Tag(name=faker.word())
            comment = Comment(commenter=user, post=post, content=faker.text())

            db.session.add_all([user, profile, post, tag, comment])
        
        db.session.commit()
        print('Database seeded with fake data!✨')



if __name__ == '__main__':    
    seed_database()