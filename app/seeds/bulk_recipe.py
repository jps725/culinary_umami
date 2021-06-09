from app.models import (db, Recipe, Ingredient,
                        Instruction, Measurement_Type)
import requests
import json
import random
import os


def seed_bulk_recipes():

    url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random"

    querystring = {"number": "9"}
    API_KEY = os.environ.get('RAPID_API_KEY')
    headers = {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }

    response = requests.request(
        "GET", url, headers=headers, params=querystring)

    res = response.json()

    recipes = res["recipes"]

    for recipe in recipes:
        add_recipe = Recipe(
            title=recipe["title"],
            image_url=recipe["image"],
            source_url=recipe["sourceUrl"],
            servings=recipe["servings"],
            user_id=random.randint(1, 25)
        )
        db.session.add(add_recipe)

        new_recipe = Recipe.query.order_by(Recipe.id.desc()).first()

        for ingredient in recipe["extendedIngredients"]:
            measurement_type = Measurement_Type.query.filter_by(
                measurement_type=ingredient['unit']
            ).first()

            if not measurement_type:
                new_measurement_type = Measurement_Type(
                    measurement_type=ingredient['unit']
                )
                db.session.add(new_measurement_type)
                db.session.commit()
                measurement_type = Measurement_Type.query.filter_by(
                    measurement_type=ingredient['unit']
                ).first()

            new_ingredient = Ingredient(
                ingredient=ingredient['name'],
                quantity=float(ingredient['amount']),
                recipe_id=new_recipe.id,
                measurement_type_id=measurement_type.id
            )

            db.session.add(new_ingredient)
            db.session.commit()

        add_instruction = Instruction(
            method=recipe["instructions"],
            recipe_id=new_recipe.id
        )
        db.session.add(add_instruction)
        db.session.commit()


def undo_recipe_bulk():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE instructions RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE measurement_types RESTART IDENTITY CASCADE;')
    db.session.commit()
