from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import db, Image


class ImageForm(FlaskForm):
    image_url = StringField("Image Url", validators=[DataRequired()])
    user_id = IntegerField("User ID")
    recipe_id = IntegerField("Recipe ID")
