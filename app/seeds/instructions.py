from ..models import db, Instruction


def seed_instructions():
    instructions_one = Instruction(
        step_number=1,
        method="""Preheat oven to 450F. Allow lamb to come to room temp.
                    Dice the potatoes, pick and chop rosemary.""",
        recipe_id=1
    )

    instructions_two = Instruction(
        step_number=2,
        method="""Roast lamb and potatoes.
                Pull potatoes when fully cooked and golden.""",
        recipe_id=1
    )

    instructions_three = Instruction(
        step_number=3,
        method="""Pull lamb when internal temp has reached 130.
                Allow to rest before cutting. Garnish with rosemary.""",
        recipe_id=1
    )

    db.session.add(instructions_one)
    db.session.add(instructions_two)
    db.session.add(instructions_three)
    db.session.commit()


def undo_instructions():
    db.session.execute('TRUNCATE instructions RESTART IDENTITY CASCADE;')
    db.session.commit()
