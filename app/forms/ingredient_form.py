from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired
from app.models import db, Ingredient


class IngredientForm(FlaskForm):
    ingredient = StringField("Ingredient", validators=[DataRequired()])
    quantity = IntegerField("Quantity", validators=[DataRequired()])
    recipe_id = IntegerField("Recipe ID", validators=[DataRequired()])
    measurement_type_id = IntegerField(
        "Measurement Type ID", validators=[DataRequired()])
