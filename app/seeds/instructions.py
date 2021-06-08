from ..models import db, Instruction


def seed_instructions():
    instructions_one = Instruction(
        method="""Preheat oven to 450F. Allow lamb to come to room temp.
                    Dice the potatoes, pick and chop rosemary.
                    Pull lamb when internal temp has reached 130.
                    Allow to rest before cutting. Garnish with rosemary.""",
        recipe_id=1
    )

    db.session.add(instructions_one)

    db.session.commit()


def undo_instructions():
    db.session.execute('TRUNCATE instructions RESTART IDENTITY CASCADE;')
    db.session.commit()
