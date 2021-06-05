from ..models import db, Recipe


def seed_recipes():
    recipe_one = Recipe(
        title="Lamb and Potatoes",
        user_id=1,
        servings=4,
        image_url="https://i.ibb.co/zxYQFDf/IMG-3553.jpg"
    )

    db.session.add(recipe_one)
    db.session.commit()


def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()
