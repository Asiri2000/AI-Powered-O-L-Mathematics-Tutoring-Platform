import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["identify_property", "opposite_angles", "true_false", "concept", "application"])

    if qtype == "identify_property":
        question = "Which of the following is a property of a cyclic quadrilateral?"
        correct = "Opposite angles are supplementary"
        wrongs = ["All sides are equal", "Diagonals bisect at right angles", "All angles are equal"]
        steps = ["Key property: in a cyclic quadrilateral, opposite angles add to 180° (supplementary).", "Answer: Opposite angles are supplementary"]

    elif qtype == "opposite_angles":
        angle = random.choice([70, 80, 100, 110])
        opp = 180 - angle
        question = f"In a cyclic quadrilateral, one angle is {angle}°. What is the opposite angle?"
        correct = f"{opp}°"
        wrongs = [f"{angle}°", f"{angle/2}°", f"{angle+20}°"]
        steps = [
            "Opposite angles of a cyclic quadrilateral are supplementary (sum = 180°).",
            f"Opposite angle = 180° − {angle}° = {opp}°",
            f"Answer: {opp}°",
        ]

    elif qtype == "true_false":
        question = "The sum of opposite angles of a cyclic quadrilateral is 180°."
        correct = "True"
        wrongs = ["False", "Only for squares", "Cannot be determined"]
        steps = ["Theorem: Opposite angles in a cyclic quadrilateral are supplementary.", "Their sum = 180°.", "Answer: True"]

    elif qtype == "concept":
        question = "When is a quadrilateral said to be cyclic?"
        correct = "When all its vertices lie on a circle"
        wrongs = ["When all sides are equal", "When diagonals are equal", "When opposite sides are parallel"]
        steps = ["A cyclic quadrilateral has all four vertices on the circumference of a circle.", "Answer: When all its vertices lie on a circle"]

    else:
        question = "Why are opposite angles of a cyclic quadrilateral supplementary?"
        correct = "They subtend the same arc of the circle"
        wrongs = ["They are vertically opposite angles", "They are alternate interior angles", "They are corresponding angles"]
        steps = ["Each pair of opposite angles subtends the entire circle (360°) at the centre.", "So at the circumference they sum to 180°.", "Answer: They subtend the same arc of the circle"]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Cyclic Quadrilaterals",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
