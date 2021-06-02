from ..models import db, Ingredient


def seed_ingredients():
    ingredient_one = Ingredient(
        recipe_id=1,
        ingredient="Lamb",
        quantity=1,
        measurement_type_id=1,
    )

    ingredient_two = Ingredient(
        recipe_id=1,
        ingredient="Potato",
        quantity=1,
        measurement_type_id=2,
    )

    ingredient_three = Ingredient(
        recipe_id=1,
        ingredient="Rosemary",
        quantity=.5,
        measurement_type_id=3,
    )

    db.session.add(ingredient_one)
    db.session.add(ingredient_two)
    db.session.add(ingredient_three)
    db.session.commit()


def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
