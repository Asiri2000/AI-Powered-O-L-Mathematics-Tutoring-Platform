import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["tool", "perpendicular", "bisector", "concept"])

    if qtype == "tool":
        correct = "Compass"
        options, ans = shuffle_options(correct, ["Protractor", "Ruler only", "Divider"])
        question = "Which instrument is used to draw arcs in geometric constructions?"
        steps = [
            "In geometric constructions, we use a compass to draw arcs and circles.",
            "A ruler draws straight lines.",
            "Answer: Compass",
        ]

    elif qtype == "perpendicular":
        correct = "A right angle"
        options, ans = shuffle_options(correct, ["An obtuse angle", "An acute angle", "A straight angle"])
        question = "What type of angle is formed when constructing a perpendicular line?"
        steps = [
            "A perpendicular line meets another line at 90°.",
            "90° is a right angle.",
            "Answer: A right angle",
        ]

    elif qtype == "bisector":
        correct = "Two equal halves"
        options, ans = shuffle_options(correct, ["Two unequal parts", "A perpendicular line", "A parallel line"])
        question = "What does it mean to bisect a line segment?"
        steps = [
            "To bisect means to cut into two equal parts.",
            "Bisecting a line segment divides it at its midpoint.",
            "Answer: Two equal halves",
        ]

    else:
        correct = "Accuracy"
        options, ans = shuffle_options(correct, ["Speed", "Guessing", "Measurement by eye"])
        question = "Why is accuracy important in geometric constructions?"
        steps = [
            "Geometric constructions produce exact shapes only when done accurately.",
            "Errors in arcs or lines lead to wrong results.",
            "Answer: Accuracy",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Constructions",
        "needs_image": True,
        "svg_diagram": None,
        "steps": steps,
    }
