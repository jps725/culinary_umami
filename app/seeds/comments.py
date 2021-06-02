from ..models import db, Comment
from datetime import date


def seed_comments():
    comment_one = Comment(
        rating=4,
        review="This came out really well. Super easy to make. Will definitely do again.",
        recipe_id=1,
        user_id=1,
        created_at=date.today(),
    )

    db.session.add(comment_one)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
