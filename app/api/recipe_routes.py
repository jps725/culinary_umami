from flask import Blueprint, jsonify, request, session
from app.models import (db, Recipe, Measurement_Type, Image,
                        Ingredient, Instruction)
from app.forms import (RecipeForm, IngredientForm, CommentForm,
                       InstructionForm, MeasurementTypeForm, ImageForm)


recipe_routes = Blueprint('recipe', __name__)


def validation_errors_to_error_messages(validation_errors):
    error_messages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            error_messages.append(f'{field} : {error}')
    return error_messages


@recipe_routes.route("/", methods=['POST'])
def recipe():
    print("___________________post")
    if request.method == 'POST':
        form = RecipeForm()

        # one recipe form = create multiple instances, add/commit in order
        # for relationships to exist
        form['csrf_token'] = request.cookies['csrf_token']
        # add recipe to db
        recipe = Recipe(
            title=form.data['title'],
            user_id=int(form.data['user_id'])
        )
        db.session.add(recipe)
        db.session.commit()

        added_recipe = Recipe.query.order_by(Recipe.id.desc()).first()
        # add image to db if in form
        if form.data['image_url']:
            image = Image(
                image_url=form.data['image_url'],
                user_id=int(form.data['user_id']),
                recipe_id=added_recipe.id
            )
            db.session.add(image)
            db.session.commit()
        # iterate through list of ingredients
        # for each create a new ingredient
        # and check for measurement type, if not in db, add it
        for added_ingredient in form.data['ingredient']:
            measurement_type = Measurement_Type.query.filter_by(
                measurement_type=added_ingredient['measurement_type'])
            if not measurement_type_id:
                new_measurement_type = Measurement_Type(
                    measurement_type=added_ingredient['measurement_type']
                )
                db.session.add(new_measurement_type)
                db.session.commit()
            measurement_type = Measurement_Type.query.order_by(
                Measurement_Type.id.desc()).first()

            new_ingredient = Ingredient(
                ingredient=added_ingredient['ingredient'],
                quantity=int(added_ingredient['quantity']),
                recipe_id=added_recipe.id,
                measurement_type_id=measurement_type.id
            )

            db.session.add(new_ingredient)
            db.session.commit()
        # iterate through list of instructions and add each to db
        for new_instruction in form.data['instruction']:
            add_instruction = Instruction(
                step_number=int(add_instruction['step_number']),
                method=add_instruction['method'],
                recipe_id=added_recipe.id
            )
            db.session.add(add_instruction)
            db.session.commit()

        newest_recipe = Recipe.query.get(added_recipe.id)
        return newest_recipe.to_dict()
    return


@recipe_routes.route('/<int:id>')
def get_recipe(id):
    recipe = Recipe.query.get(id)
    print("____________________recipes", recipe.to_dict())

    return recipe.to_dict()


@recipe_routes.route('/<int:id>', methods=["DELETE"])
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    db.session.delete(recipe)
    db.session.commit()
    return{}
