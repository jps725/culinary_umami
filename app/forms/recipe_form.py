from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import db, Recipe


class RecipeForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    user_id = IntegerField('User ID', validators=[DataRequired()])
    # measurement_type = StringField(
    #     "Measurement Type", validators=[DataRequired()])
    # image_url = StringField("Image Url", validators=[DataRequired()])
    # ingredient = StringField("Ingredient", validators=[DataRequired()])
    # quantity = IntegerField("Quantity", validators=[DataRequired()])
    # step_number = IntegerField("Step Number", validators=[DataRequired()])
    # method = StringField("Method", validators=[DataRequired()])
