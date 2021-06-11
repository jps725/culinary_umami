# Culinary Umami

Culinary Umami is a recipe search, share, and management app. User can create new recipes, like recipes, and dynamically search the entire database by ingredient.

Live Site - [Culinary-Umami](https://culinary-umami.herokuapp.com/)

## Technologies Used:

    * Python
    * Flask
    * SQLAlchemy
    * HTML
    * CSS
    * Javascript
    * React
    * Redux
    * Postgres

## Features and Functionality:

    * User Authentication - Users are able to securely sign-up, log-in, or use demo to test functionality.

    * Recipes - A user may create, edit, or delete a recipe they have created.

    * Likes - A user may make like any recipe or remove their like from a previously liked recipe.

    * Search - A user may utilize the drag and drop search to filter recipes from the database by ingredient.

## Main Page:

![main-page-gif](https://i.gyazo.com/eadf06eedbb86b689d5e4d3e4d8bcff8.gif)

## Drag and Drop Search:

![search-page-gif](https://i.gyazo.com/f2bfe67bb4e97719672b35a0c368501d.gif)

## React Dynamic handling of rendering additional input components for the form

```
        const returnDetails = (idx, details) => {
            setIngredients([
            ...ingredients.slice(0, idx),
            details,
            ...ingredients.slice(idx + 1),
            ]);
        };

        const handleAddIngredient = (e) => {
            e.preventDefault();
            setIngredients([
            ...ingredients,
            { quantity: 0, measurement_type: "", ingredient: "" },
            ]);
        };

        const handleDelete = (e) => {
            e.preventDefault();
            const idx = e.target.value;
            ingredients.splice(idx, 1);
            setIngredients([...ingredients]);
        };

     {ingredients.map((ingredient, idx) => (
            <div key={idx} className="recipe__ingredient--inputs">
              <IngredientInput
                key={idx}
                idx={idx}
                oldIngredient={ingredient}
                returnDetails={returnDetails}
              />
              <button
                className="ingredient__delete--button"
                value={idx}
                onClick={handleDelete}
              >
                X
              </button>
            </div>
          ))}
          <button
            className="recipe__form--addbutton"
            onClick={handleAddIngredient}
          >
            + Ingredient
          </button>
```

## Backend conditional add of measurement type to the database

```
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
```

## Future Features:

    * Recommendation engine to generate a list of recommended recipes based on recipe likes, and weighing the ingredients and cuisine to search and display.

    * Random recipe generator based on inputs of ingredients, cuisine, season.

    * Comments, a user can add a comment to any recipe.

## Review Wiki Pages for more information and documentation

[Wiki](https://github.com/jps725/culinary_umami/wiki)
