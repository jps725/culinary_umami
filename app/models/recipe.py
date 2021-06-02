from .db import db


class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="recipes")
    images = db.relationship("Image", back_populates="recipe")
    comments = db.relationship("Comment", back_populates="recipe")
    ingredients = db.relationship("Ingredient", back_populates="recipe")
    instructions = db.relationship("Instruction", back_populates="recipe")
    comments = db.relationship("Comment", back_populates="recipe")

    def to_dict(self):
        return{
            "id": self.id,
            "title": self.title,
            "user": self.user,
            "user_id": self.user_id,
            "images": self.images,
            "comments": self.comments
        }
