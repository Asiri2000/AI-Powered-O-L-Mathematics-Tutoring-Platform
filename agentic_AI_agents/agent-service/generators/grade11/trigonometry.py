import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["basic_ratio", "exact_value", "identity", "height_distance", "concept"])

    if qtype == "basic_ratio":
        question = "In a right-angled triangle, which ratio is defined as opposite / hypotenuse?"
        correct = "Sine"
        wrongs = ["Cosine", "Tangent", "Secant"]
        steps = [
            "SOH CAH TOA is the memory aid for trig ratios.",
            "SOH: Sine = Opposite / Hypotenuse",
            "Answer: Sine",
        ]

    elif qtype == "exact_value":
        angle = random.choice([30, 45, 60])
        values = {30: "1/2", 45: "1/√2", 60: "√3/2"}
        question = f"Find the exact value of sin {angle}°."
        correct = values[angle]
        wrongs = ["1", "0", "√3"]
        steps = [
            f"sin 30° = 1/2,  sin 45° = 1/√2,  sin 60° = √3/2",
            f"sin {angle}° = {values[angle]}",
            f"Answer: {values[angle]}",
        ]

    elif qtype == "identity":
        question = "Which of the following is a correct trigonometric identity?"
        correct = "sin²θ + cos²θ = 1"
        wrongs = ["sinθ + cosθ = 1", "tanθ = sinθ + cosθ", "sin²θ − cos²θ = 1"]
        steps = [
            "The Pythagorean identity is: sin²θ + cos²θ = 1",
            "This is derived from Pythagoras's theorem applied to a unit circle.",
            "Answer: sin²θ + cos²θ = 1",
        ]

    elif qtype == "height_distance":
        question = "The angle of elevation from the ground to the top is 45°. What can be said about height and horizontal distance?"
        correct = "Height equals distance"
        wrongs = ["Height is double the distance", "Distance is double the height", "They are unrelated"]
        steps = [
            "tan 45° = opposite / adjacent = height / horizontal distance",
            "tan 45° = 1, so height / distance = 1",
            "Therefore height = distance",
            "Answer: Height equals distance",
        ]

    else:
        question = "Which angle is used in trigonometric ratios?"
        correct = "Angle in a right-angled triangle"
        wrongs = ["Any angle in a triangle", "Only obtuse angles", "Only acute angles"]
        steps = [
            "Trigonometric ratios are defined for angles in right-angled triangles.",
            "sin, cos, and tan specifically use the acute angles.",
            "Answer: Angle in a right-angled triangle",
        ]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Trigonometry",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
