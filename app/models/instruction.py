from .db import db


class Instruction(db.Model):
    __tablename__ = "instructions"

    id = db.Column(db.Integer, primary_key=True)
    step_number = db.Column(db.Integer, nullable=False)
    method = db.Column(db.String, nullable=False)
    recipe_id = db.Column(db.Integer, nullable=False,
                          db.ForeignKey("recipes.id"))

    recipe = db.relationship("Instruction", back_populates="instructions")

    def to_dict(self):
        return {
            "id": self.id,
            "step_number": self.step_number,
            "method": self.method,
            "recipe_id": self.recipe_id,
            "recipe": self.recipe
        }
