from ..models import db, Recipe, Ingredient, Instruction, Measurement_Type


def seed_big_recipe():

    recipe = {
        title: 'Persian Chicken',
        image_url: 'https://www.edamam.com/web-img/8f8/8f810dfe198fa3e520d291f3fcf62bbf.jpg',
        source: 'BBC Good Food',
        source_url: 'http://www.bbcgoodfood.com/recipes/7343/',
        servings: 5,
        ingredients: [
            {quantity: 2, measurement_type: 'large', name: 'onions'},
            {quantity: 750, measurement_type: 'g', name: 'chicken'},
            {quantity: 500, measurement_type: 'g', name: 'mushrooms'},
            {quantity: 1, measurement_type: 'cup', name: 'water'},
            {quantity: 1, measurement_type: 'cup', name: 'red wine'},
            {
                quantity: 2,
                measurement_type: 'teaspoons',
                name: 'chicken stock'
            },
            {quantity: 200, measurement_type: 'ml', name: 'mayonnaise'},
            {quantity: 200, measurement_type: 'ml', name: 'cream'},
            {
                quantity: 0,
                measurement_type: ' ',
                name: 'small bunch of parsley'
            },
            {quantity: 1, measurement_type: 'teaspoon', name: 'curry powder'}
        ]
    }

    if recipe[image_url] == "":
        image_url = "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
    else:
        image_url = recipe[image_url]

    new_recipe = Recipe(
        title=recipe[title],
        user_id=recipe[user_id],
        servings=recipe[servings],
        image_url=image_url,
        source_url=recipe[source_url]

    )
    db.session.add(new_recipe)
    db.session.commit()

    added_recipe = Recipe.query.order_by(Recipe.id.desc()).first()
    for added_ingredient in recipe[ingredients]:
        measurement_type = Measurement_Type.query.filter_by(
            measurement_type=added_ingredient[measurement_type]
        ).first()

        if not measurement_type:
            new_measurement_type = Measurement_Type(
                measurement_type=added_ingredient[measurement_type]
            )
            db.session.add(new_measurement_type)
            db.session.commit()
            measurement_type = Measurement_Type.query.filter_by(
                measurement_type=added_ingredient[measurement_type]
            ).first()

        new_ingredient = Ingredient(
            ingredient=added_ingredient[ingredient],
            quantity=float(added_ingredient[quantity]),
            recipe_id=added_recipe.id,
            measurement_type_id=measurement_type.id
        )

        db.session.add(new_ingredient)
        db.session.commit()

    # for new_instruction in recipe['instructions']:
    #     add_instruction = Instruction(
    #         step_number=int(new_instruction['step_number']),
    #         method=new_instruction['method'],
    #         recipe_id=added_recipe.id
    #     )
    #     db.session.add(add_instruction)
    #     db.session.commit()


def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE measurement_types RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE instructions RESTART IDENTITY CASCADE;')
    db.session.commit()
