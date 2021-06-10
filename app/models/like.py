from .db import db


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="likes")
    recipe = db.relationship("Recipe", back_populates="likes")

    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "recipe_id": self.recipe_id
        }
