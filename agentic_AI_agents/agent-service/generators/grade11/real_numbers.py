import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["identify", "solve", "verify", "concept", "application"])

    if qtype == "identify":
        question = "Which of the following is an irrational number?"
        correct = random.choice(["√2", "√5", "π"])
        wrongs = ["3/4", "0.25", "7"]
        steps = [
            "Rational numbers can be expressed as a fraction p/q.",
            "Irrational numbers cannot (e.g. √2 = 1.41421...)",
            f"Answer: {correct}",
        ]

    elif qtype == "solve":
        question = "Evaluate √49."
        correct = "7"
        wrongs = ["-7", "49", "√7"]
        steps = [
            "√49 = ? means: what number squared equals 49?",
            "7 × 7 = 49",
            "Answer: 7",
        ]

    elif qtype == "verify":
        question = "Is 0.333... a rational number?"
        correct = "True"
        wrongs = ["False", "Cannot be determined", "Irrational"]
        steps = [
            "0.333... is a repeating decimal.",
            "It can be written as 1/3 (a fraction).",
            "Fractions are rational numbers.",
            "Answer: True",
        ]

    elif qtype == "concept":
        question = "Which best describes a real number?"
        correct = "Any number that can be represented on the number line"
        wrongs = ["Only positive numbers", "Only integers", "Only rational numbers"]
        steps = [
            "Real numbers include: Natural, Whole, Integer, Rational AND Irrational numbers.",
            "Every point on the number line is a real number.",
            "Answer: Any number that can be represented on the number line",
        ]

    else:
        question = "A square has side 2 cm. Which type of number represents the diagonal length?"
        correct = "Irrational number"
        wrongs = ["Natural number", "Whole number", "Rational number"]
        steps = [
            "Diagonal of square = side × √2",
            f"= 2 × √2 = 2√2 ≈ 2.828...",
            "√2 is irrational, so 2√2 is also irrational.",
            "Answer: Irrational number",
        ]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Real Numbers",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
