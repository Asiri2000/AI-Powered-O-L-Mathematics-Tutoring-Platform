import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["expand", "identify_terms", "coefficient", "evaluate"])
    a = random.randint(1, 5)
    b = random.randint(1, 5)

    # -------- EXPANSION --------
    if qtype == "expand":
        correct = f"x² + {2*b}x + {b*b}"
        options, ans = shuffle_options(correct, [f"x² + {b}x + {b}", f"x² + {b*b}", f"{2*b}x + {b*b}"])
        question = f"Expand (x + {b})²."
        steps = [
            f"Formula: (x + a)² = x² + 2ax + a²",
            f"Substitute a = {b}: x² + 2({b})x + {b}²",
            f"= x² + {2*b}x + {b*b}",
            f"Answer: x² + {2*b}x + {b*b}",
        ]

    # -------- IDENTIFY TERMS --------
    elif qtype == "identify_terms":
        correct = "3"
        options, ans = shuffle_options(correct, ["2", "1", "4"])
        question = "How many terms are there in the expression x² + 3x + 2?"
        steps = [
            "Count individual terms separated by + or − signs.",
            "Terms: x², 3x, and 2 — that is 3 terms.",
            "Answer: 3",
        ]

    # -------- COEFFICIENT --------
    elif qtype == "coefficient":
        correct = "3"
        options, ans = shuffle_options(correct, ["2", "1", "4"])
        question = "Find the coefficient of x in the expression 2x² + 3x + 5."
        steps = [
            "The coefficient is the number multiplying a variable.",
            "The term with x (not x²) is 3x.",
            "The coefficient of x = 3.",
            "Answer: 3",
        ]

    # -------- EVALUATION --------
    else:
        val = (a + b) ** 2
        correct = str(val)
        options, ans = shuffle_options(correct, [str(a*a + b*b), str(a + b), str(2*a*b)])
        question = f"Find the value of (x + {b})² when x = {a}."
        steps = [
            f"Substitute x = {a}: ({a} + {b})²",
            f"= ({a + b})²",
            f"= {val}",
            f"Answer: {val}",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Binomial Expressions",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
