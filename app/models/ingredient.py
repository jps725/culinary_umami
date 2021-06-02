from .db import db


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, nullable=False)
    ingredient = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    measurement_type_id = db.Column(
        db.Integer, db.ForeignKey("measurement_types.id"))
    recipe = db.relationship("Recipe", back_populates="ingredients")
    measurement_type = db.relationship("Measurement_Type")

    def to_dict(self):
        return {
            "id": self.id,
            "recipe_id": self.recipe_id,
            "ingredient": self.ingredient,
            "quantity": self.quantity,
            "measurement_type_id": self.measurement_type_id,
            "recipe": self.recipe,
            "measurement_type": self.measurement_type
        }
