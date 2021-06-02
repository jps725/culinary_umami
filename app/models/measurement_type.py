from .db import db


class Measurement_Type(db.Model):
    __tablename__ = "measurement_types"
    id = db.Column(db.Integer, primary_key=True)
    measurement_type = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "measurement_type": self.measurement_type
        }
