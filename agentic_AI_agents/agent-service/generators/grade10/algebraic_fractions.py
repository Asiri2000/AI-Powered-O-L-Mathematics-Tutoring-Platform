import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["simplify", "multiply", "add", "concept"])

    # ---- SIMPLIFY ----
    if qtype == "simplify":
        correct = "3/2"
        options, ans = shuffle_options(correct, ["2/3", "5/2", "3"])
        question = "Simplify (3x / 4y) × (2y / x)."
        steps = [
            "Cancel common factors: x cancels with x, y cancels with y",
            "Remaining: (3 × 2) / (4 × 1) = 6/4",
            "Simplify 6/4 by dividing by 2: 3/2",
            "Answer: 3/2",
        ]

    # ---- MULTIPLICATION ----
    elif qtype == "multiply":
        correct = "x/2"
        options, ans = shuffle_options(correct, ["2/x", "x", "1/2"])
        question = "Simplify (x / 4) × (2 / 1)."
        steps = [
            "Multiply numerators: x × 2 = 2x",
            "Multiply denominators: 4 × 1 = 4",
            "Result: 2x/4",
            "Simplify by dividing by 2: Answer = x/2",
        ]

    # ---- ADDITION ----
    elif qtype == "add":
        correct = "5/(x+2)"
        options, ans = shuffle_options(correct, ["5/x + 2", "5x/(x+2)", "5"])
        question = "Simplify 3/(x+2) + 2/(x+2)."
        steps = [
            "Both fractions have the same denominator (x+2)",
            "Add numerators: 3 + 2 = 5",
            "Keep the common denominator: (x+2)",
            "Answer: 5/(x+2)",
        ]

    # ---- CONCEPT ----
    else:
        correct = "Factorisation"
        options, ans = shuffle_options(correct, ["Expansion", "Substitution", "Elimination"])
        question = "Which method is mainly used to simplify algebraic fractions?"
        steps = [
            "Algebraic fractions often have polynomial numerators or denominators.",
            "To simplify, we factorise both top and bottom.",
            "Then cancel common factors.",
            "Answer: Factorisation",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Algebraic Fractions",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
