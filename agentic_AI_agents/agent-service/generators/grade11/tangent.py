import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["tangent_radius_angle", "equal_tangents", "find_angle", "true_false", "application"])

    if qtype == "tangent_radius_angle":
        question = "The angle between a tangent and the radius at the point of contact is:"
        correct = "90°"
        wrongs = ["45°", "60°", "180°"]
        steps = ["Tangent-Radius Theorem: A tangent to a circle is perpendicular to the radius at the point of contact.", "Answer: 90°"]

    elif qtype == "equal_tangents":
        question = "Two tangents are drawn from an external point to a circle. Which is true?"
        correct = "The lengths of the tangents are equal"
        wrongs = ["The angles are unequal", "The tangents intersect the circle", "The radii are unequal"]
        steps = ["Equal Tangents Theorem: Tangents drawn from the same external point are equal in length.", "Answer: The lengths of the tangents are equal"]

    elif qtype == "find_angle":
        angle = random.choice([30, 40, 50, 60])
        question = f"OP is a radius and a tangent touches the circle at P. What is the angle between OP and the tangent?"
        correct = "90°"
        wrongs = [f"{angle}°", f"{180-angle}°", f"{angle/2}°"]
        steps = ["The angle between a radius and a tangent at the point of contact is always 90°.", "Answer: 90°"]

    elif qtype == "true_false":
        question = "The tangents drawn from an external point to a circle are always equal in length."
        correct = "True"
        wrongs = ["False", "Only for large circles", "Cannot be determined"]
        steps = ["By the Equal Tangents Theorem, both tangents from the same external point are equal.", "Answer: True"]

    else:
        radius = random.choice([5, 7, 10])
        question = f"A tangent is drawn to a circle of radius {radius} cm. What is the distance from the centre to the point of contact?"
        correct = f"{radius} cm"
        wrongs = [f"{radius*2} cm", f"{radius/2} cm", f"{radius+2} cm"]
        steps = ["The point of contact lies on the circle's circumference.", "Distance from centre to circumference = radius.", f"Answer: {radius} cm"]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Tangent",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
