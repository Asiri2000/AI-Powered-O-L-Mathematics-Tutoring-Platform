import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["simple", "with_coeff", "concept"])

    if qtype == "simple":
        correct = "2x²y"
        options, ans = shuffle_options(correct, ["x²y", "2xy", "x²y²"])
        question = "Find the LCM of 2x²y and xy."
        steps = [
            "Find LCM of coefficients: LCM(2, 1) = 2",
            "Find highest power of each variable: x² and y¹",
            "LCM = 2 × x² × y = 2x²y",
            "Answer: 2x²y",
        ]

    elif qtype == "with_coeff":
        correct = "6x²y"
        options, ans = shuffle_options(correct, ["3x²y", "6xy", "2x²y"])
        question = "Find the LCM of 3xy and 2x²y."
        steps = [
            "LCM of coefficients: LCM(3, 2) = 6",
            "Highest power of x: x² (from 2x²y)",
            "Highest power of y: y¹",
            "LCM = 6x²y",
            "Answer: 6x²y",
        ]

    else:
        correct = "Highest powers of all variables"
        options, ans = shuffle_options(correct, ["Lowest powers of variables", "Sum of powers", "Difference of powers"])
        question = "When finding the LCM of algebraic expressions, which powers of variables are taken?"
        steps = [
            "LCM takes the HIGHEST power of each variable that appears.",
            "For example: LCM(x², x³) = x³",
            "Answer: Highest powers of all variables",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Least Common Multiple of Algebraic Expressions",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
