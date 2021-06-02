from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import db, Measurement_Type


class MeasurementTypeForm(FlaskForm):
    measurement_type = StringField(
        "Measurement Type", validators=[DataRequired()])
