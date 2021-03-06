from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker

fake = Faker()
# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password',
                image_url="https://www.clipartmax.com/png/small/33-331596_job-profiles-chef-avatar.png")

    db.session.add(demo)

    i = 25

    while i > 0:
        profile = fake.simple_profile()
        user = User(
            username=profile['username'],
            email=profile['mail'],
            password='password',
            image_url=fake.image_url()
        )
        db.session.add(user)
        i -= 1

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
