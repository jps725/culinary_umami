from .db import db


class Instruction(db.Model):
    __tablename__ = "instructions"

    id = db.Column(db.Integer, primary_key=True)
    method = db.Column(db.Text, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))

    recipe = db.relationship("Recipe", back_populates="instruction")

    def to_dict(self):
        return {
            "method": self.method,
            "recipe_id": self.recipe_id,
        }
