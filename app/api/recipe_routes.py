from flask import Blueprint, jsonify, request, session
from app.models import (db, Recipe, Measurement_Type,
                        Ingredient, Instruction)
# from app.forms import (RecipeForm, IngredientForm, CommentForm,
#                        InstructionForm, MeasurementTypeForm, ImageForm)


recipe_routes = Blueprint('recipe', __name__)


def validation_errors_to_error_messages(validation_errors):
    error_messages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            error_messages.append(f'{field} : {error}')
    return error_messages


@recipe_routes.route("/user/<int:id>")
def get_recipes(id):
    recipes = Recipe.query.filter(Recipe.user_id == id).order_by(
        Recipe.created_at.desc()).limit(16)

    return jsonify([recipe.to_dict() for recipe in recipes])


@recipe_routes.route("", methods=['POST'])
def recipe():
    if request.method == 'POST':
        # one recipe form = create multiple instances, add/commit in order
        # for relationships to exist
        if request.cookies['csrf_token']:
            recipe = request.json
            # form['csrf_token'] = request.cookies['csrf_token']
            # add recipe to db
            if recipe['image_url'] == "":
                image_url = "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
            else:
                image_url = recipe['image_url']

            new_recipe = Recipe(
                title=recipe['title'],
                user_id=recipe['user_id'],
                servings=recipe['servings'],
                image_url=image_url
            )
            db.session.add(new_recipe)
            db.session.commit()

            added_recipe = Recipe.query.order_by(Recipe.id.desc()).first()
            # add image to db if in form
            # if recipe['image_url']:
            #     image = Image(
            #         image_url=recipe['image_url'],
            #         user_id=int(recipe['user_id']),
            #         recipe_id=added_recipe.id
            #     )
            #     db.session.add(image)
            #     db.session.commit()
            # iterate through list of ingredients
            # for each create a new ingredient
            # and check for measurement type, if not in db, add it
            for added_ingredient in recipe['ingredients']:
                measurement_type = Measurement_Type.query.filter_by(
                    measurement_type=added_ingredient['measurement_type']
                ).first()

                if not measurement_type:
                    new_measurement_type = Measurement_Type(
                        measurement_type=added_ingredient['measurement_type']
                    )
                    db.session.add(new_measurement_type)
                    db.session.commit()
                    measurement_type = Measurement_Type.query.filter_by(
                        measurement_type=added_ingredient['measurement_type']
                    ).first()

                new_ingredient = Ingredient(
                    ingredient=added_ingredient['ingredient'],
                    quantity=float(added_ingredient['quantity']),
                    recipe_id=added_recipe.id,
                    measurement_type_id=measurement_type.id
                )

                db.session.add(new_ingredient)
                db.session.commit()

            instruction = Instruction(
                # step_number=int(new_instruction['step_number']),
                method=recipe["instructions"],
                recipe_id=added_recipe.id
            )
            db.session.add(instruction)
            db.session.commit()

            newest_recipe = Recipe.query.get(added_recipe.id)
            return newest_recipe.to_dict()
    return


@recipe_routes.route('', methods=['PUT'])
def update_recipe():

    if request.method == 'PUT':
        if request.cookies['csrf_token']:
            data = request.json
            recipe = Recipe.query.get(int(data['id']))

            if data['image_url'] == "":
                image_url = "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
            else:
                image_url = data['image_url']

                recipe.title = data['title'],
                recipe.servings = data['servings'],
                recipe.image_url = image_url

            db.session.add(recipe)
            db.session.commit()

            ingredients = Ingredient.query.filter(
                Ingredient.recipe_id == data['id'])
            ing_id_list = [ing.id for ing in ingredients]

            new_ing_list = [new_ing['id'] for new_ing in data['ingredients']]

            for ing_id in ing_id_list:
                if ing_id not in new_ing_list:
                    del_ing = Ingredient.query.get(ing_id)
                    db.session.delete(del_ing)
                    db.session.commit()

            for ingredient in data['ingredients']:
                if 'id' not in ingredient:
                    measurement_type = Measurement_Type.query.filter_by(
                        measurement_type=ingredient['measurement_type']
                    ).first()

                    if not measurement_type:
                        new_measurement_type = Measurement_Type(
                            measurement_type=ingredient['measurement_type']
                        )
                        db.session.add(new_measurement_type)
                        db.session.commit()
                        measurement_type = Measurement_Type.query.filter_by(
                            measurement_type=ingredient['measurement_type']
                        ).first()

                    new_ingredient = Ingredient(
                        ingredient=ingredient['ingredient'],
                        quantity=ingredient['quantity'],
                        recipe_id=recipe.id,
                        measurement_type_id=measurement_type.id
                    )
                    db.session.add(new_ingredient)
                    db.session.commit()

                else:
                    edit_ingredient = Ingredient.query.get(
                        int(ingredient['id']))

                    measurement_type = Measurement_Type.query.filter_by(
                        measurement_type=ingredient['measurement_type']
                    ).first()

                    if not measurement_type:
                        new_measurement_type = Measurement_Type(
                            measurement_type=ingredient['measurement_type']
                        )
                        db.session.add(new_measurement_type)
                        db.session.commit()
                        measurement_type = Measurement_Type.query.filter_by(
                            measurement_type=ingredient['measurement_type']
                        ).first()

                    edit_ingredient.ingredient = ingredient['ingredient'],
                    edit_ingredient.quantity = float(ingredient['quantity']),
                    edit_ingredient.measurement_type_id = measurement_type.id,

                    db.session.add(edit_ingredient)
                    db.session.commit()

            if 'id' not in data['instructions']:
                instruction = Instruction(

                    method=data["instructions"],
                    recipe_id=recipe.id
                )
                db.session.add(instruction)
                db.session.commit()

            else:
                edit_instruction = Instruction.query.get(
                    int(instruction['id']))

                edit_instruction.method = instruction['method'],

                db.session.add(edit_instruction)
                db.session.commit()

        return recipe.to_dict()


@recipe_routes.route('/<int:id>')
def get_recipe(id):
    recipe = Recipe.query.get(id)

    return recipe.to_dict()


@recipe_routes.route('/<int:id>', methods=["DELETE"])
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    db.session.delete(recipe)
    db.session.commit()
    return {"id": id}
