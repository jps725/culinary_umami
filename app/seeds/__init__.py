from flask.cli import AppGroup
from .users import seed_users, undo_users
from .comments import seed_comments, undo_comments
from .ingredients import seed_ingredients, undo_ingredients
from .instructions import seed_instructions, undo_instructions
from .measurement_types import seed_measurement_types, undo_measurement_types
from .recipes import seed_recipes, undo_recipes
from .bulk_recipe import seed_bulk_recipes, undo_recipe_bulk
from .likes import undo_likes
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    # seed_users()

    # Add other seed functions here
    # seed_recipes()
    # seed_measurement_types()
    # seed_ingredients()
    # seed_instructions()
    # seed_comments()
    seed_bulk_recipes()


# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_likes()
    # Add other undo functions here
    undo_recipes()
    undo_measurement_types()
    undo_ingredients()
    undo_instructions()
    undo_comments()
    undo_recipe_bulk()
