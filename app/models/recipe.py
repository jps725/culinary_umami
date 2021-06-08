from .db import db
from datetime import date


class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    image_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=date.today())
    source_url = db.Column(db.String)
    servings = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="recipes")
    comments = db.relationship("Comment", back_populates="recipe")
    ingredients = db.relationship("Ingredient", back_populates="recipe")
    instruction = db.relationship("Instruction", back_populates="recipe")
    comments = db.relationship("Comment", back_populates="recipe")

    def to_dict(self):
        return{
            "id": self.id,
            "title": self.title,
            "servings": self.servings,
            "created_at": self.created_at,
            "user_id": self.user_id,
            "source_url": self.source_url,
            "image_url": self.image_url,
            "instruction": [instruction.to_dict() for
                            instruction in self.instruction],
            "ingredients": [ingredient.to_dict() for
                            ingredient in self.ingredients]
        }

# add source and url clickable on source
