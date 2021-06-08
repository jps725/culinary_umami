from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired
from app.models import db, Instruction


class InstructionForm(FlaskForm):
    # step_number = IntegerField("Step Number", validators=[DataRequired()])
    method = TextAreaField("Method", validators=[DataRequired()])
    recipe_id = IntegerField("Recipe ID", validators=[DataRequired()])
