import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["property", "angle", "concept"])

    if qtype == "property":
        correct = "Opposite sides are equal"
        options, ans = shuffle_options(correct, ["All sides are unequal", "Adjacent sides are equal", "Only one pair of sides equal"])
        question = "Which of the following is a property of a parallelogram?"
        steps = [
            "Key properties of a parallelogram:",
            "1. Opposite sides are equal and parallel",
            "2. Opposite angles are equal",
            "3. Diagonals bisect each other",
            "Answer: Opposite sides are equal",
        ]

    elif qtype == "angle":
        correct = "60°"
        options, ans = shuffle_options(correct, ["120°", "30°", "90°"])
        question = "If one angle of a parallelogram is 120°, find the adjacent angle."
        steps = [
            "In a parallelogram, adjacent angles are supplementary (add to 180°).",
            f"Adjacent angle = 180° − 120° = 60°",
            "Answer: 60°",
        ]

    else:
        correct = "Both pairs of opposite sides are parallel"
        options, ans = shuffle_options(correct, ["All sides are equal", "Diagonals are perpendicular", "Only one pair of sides parallel"])
        question = "Which condition is used to identify a parallelogram?"
        steps = [
            "A parallelogram is defined as a quadrilateral where BOTH pairs of opposite sides are parallel.",
            "This distinguishes it from a trapezium (only one pair parallel).",
            "Answer: Both pairs of opposite sides are parallel",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Parallelograms",
        "needs_image": True,
        "svg_diagram": None,
        "steps": steps,
    }
