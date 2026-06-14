import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["angle_at_center", "angle_in_semicircle", "same_segment", "concept"])

    if qtype == "angle_at_center":
        correct = "Twice the angle at the circumference"
        options, ans = shuffle_options(correct, ["Equal to the angle", "Half the angle", "Three times the angle"])
        question = "How is the angle at the centre related to the angle at the circumference standing on the same arc?"
        steps = [
            "Theorem: The angle at the centre = 2 × angle at the circumference (same arc).",
            "Example: If circumference angle = 30°, centre angle = 60°.",
            "Answer: Twice the angle at the circumference",
        ]

    elif qtype == "angle_in_semicircle":
        correct = "90°"
        options, ans = shuffle_options(correct, ["60°", "180°", "45°"])
        question = "What is the angle in a semicircle?"
        steps = [
            "Theorem: Any angle inscribed in a semicircle is 90°.",
            "This is because the diameter subtends a 180° angle at the centre, so 180°/2 = 90° at circumference.",
            "Answer: 90°",
        ]

    elif qtype == "same_segment":
        correct = "They are equal"
        options, ans = shuffle_options(correct, ["They are supplementary", "They are complementary", "They add to 180°"])
        question = "What can be said about angles in the same segment of a circle?"
        steps = [
            "Theorem: Angles in the same segment subtended by the same arc are equal.",
            "Any two angles on the same side of a chord and touching the circumference are equal.",
            "Answer: They are equal",
        ]

    else:
        correct = "A line joining the centre to the circle"
        options, ans = shuffle_options(correct, ["A chord", "A tangent", "A diameter only"])
        question = "What is the radius of a circle?"
        steps = [
            "The radius connects the centre of a circle to any point on its circumference.",
            "It is exactly half the diameter.",
            "Answer: A line joining the centre to the circle",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Angles in a Circle",
        "needs_image": True,
        "svg_diagram": None,
        "steps": steps,
    }
