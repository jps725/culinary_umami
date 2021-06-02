from .db import db
import datetime


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(500))
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    recipe = db.relationship("Recipe", back_populates="comments")
    user = db.relationship("User", back_populates="comments")

    def to_dict(self):
        return{
            "id": self.id,
            "rating": self.rating,
            "review": self.review,
            "recipe_id": self.recipe_id,
            "user_id": self.user_id,
            "recipe": self.recipe,
            "user": self.user
        }
