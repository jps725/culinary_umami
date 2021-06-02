from ..models import db, Image


def seed_images():
    image_one = Image(
        user_id=1,
        image_url="https://www.clipartmax.com/png/small/33-331596_job-profiles-chef-avatar.png",
    )
    image_two = Image(
        user_id=1,
        recipe_id=1,
        image_url="https://i.ibb.co/zxYQFDf/IMG-3553.jpg"
    )

    db.session.add(image_one)
    db.session.add(image_two)
    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
