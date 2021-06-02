from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import db, Comment


class CommentForm(FlaskForm):
    rating = IntegerField("Rating", validators=[DataRequired()])
    review = StringField("Review")
    recipe_id = IntegerField("Recipe ID")
    user_id = IntegerField("User ID")
