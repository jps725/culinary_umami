from flask import Blueprint, jsonify, request, session
from app.models import (db, Recipe, User, Like)

like_routes = Blueprint('like', __name__)


@like_routes.route("", methods=['POST'])
def like():
    data = request.json

    new_like = Like(
        recipe_id=data["recipeId"],
        user_id=data["userId"]
    )
    db.session.add(new_like)
    db.session.commit()

    return new_like.to_dict()


@like_routes.route("/<int:id>")
def all_likes(id):
    likes = Like.query.filter(Like.recipe_id == int(id)).all()
    all_likes = [like.to_dict() for like in likes]
    return jsonify(all_likes)


@like_routes.route("/<int:id>", methods=['DELETE'])
def delete_like(id):
    # print("=============", id)
    like = Like.query.get(int(id))
    # print("--------------", like)
    db.session.delete(like)
    db.session.commit()
    # print("====+++++++++", like.user_id)
    return {"id": like.user_id}


@like_routes.route("/user/<int:id>")
def user_likes(id):
    likes = Like.query.filter(Like.user_id == int(id)).all()
    recipe_ids = [like.recipe_id for like in likes]
    recipes = [Recipe.query.get(recipe_id) for recipe_id in recipe_ids]

    return jsonify([recipe.to_dict() for recipe in recipes])
