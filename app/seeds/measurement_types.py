from ..models import db, Measurement_Type


def seed_measurement_types():
    measurement_type_one = Measurement_Type(
        measurement_type="lb"
    )

    measurement_type_two = Measurement_Type(
        measurement_type="cup"
    )

    measurement_type_three = Measurement_Type(
        measurement_type="bunch"
    )

    db.session.add(measurement_type_one)
    db.session.add(measurement_type_two)
    db.session.add(measurement_type_three)
    db.session.commit()


def undo_measurement_types():
    db.session.execute('TRUNCATE measurement_types RESTART IDENTITY CASCADE;')
    db.session.commit()
