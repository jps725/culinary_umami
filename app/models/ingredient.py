from .db import db
from .measurement_type import Measurement_Type


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    ingredient = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    measurement_type_id = db.Column(
        db.Integer, db.ForeignKey("measurement_types.id"))
    recipe = db.relationship("Recipe", back_populates="ingredients")
    measurement_type = db.relationship("Measurement_Type")

    def to_dict(self):
        measurement_type = Measurement_Type.query.get(
            self.measurement_type_id).measurement_type
        return {
            "id": self.id,
            "recipe_id": self.recipe_id,
            "ingredient": self.ingredient,
            "quantity": self.quantity,
            "measurement_type": measurement_type,
        }
