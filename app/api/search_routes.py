from flask import Blueprint, jsonify, session, request
from app.models import (User, Recipe, Ingredient, db,
                        Instruction, Measurement_Type, Comment)

search_routes = Blueprint('search', __name__)


@search_routes.route("/", methods=["POST"])
def search():
    data = request.json
    input = data['input']

    input_list = input.split()
    recipe_dict = {}

    for string in input_list:
        ingredients = Ingredient.query.filter(
            Ingredient.ingredient.ilike(f'%{string}%')).limit(20)

        for ingredient in ingredients:
            recipe_obj = Recipe.query.get(ingredient.recipe_id)
            recipe = recipe_obj.to_dict()
            if recipe['id'] not in recipe_dict:
                recipe_dict[recipe['id']] = recipe

    if len(recipe_dict) == 0:
        return {"title": "Oops we don't seem to have any recipes with that ingredient.",
                "id": 0, "image_url": "https://pixabay.com/get/g221cb4b42bc0281c48474d355324f8861a34ac5a47b411938b27e8069f7dd545d3e262d7aa210280c22cbc2d3598b413_640.png"}

    return recipe_dict
    #  recipes_title = Recipe.query.filter(
    #     Recipe.title.ilike(f'%{string}%')).limit(10)

    # return jsonify([recipe.to_dict() for recipe in recipes_title])
