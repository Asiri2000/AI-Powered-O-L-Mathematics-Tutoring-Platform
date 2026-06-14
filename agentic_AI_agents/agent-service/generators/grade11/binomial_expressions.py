import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["expand", "identify_term", "simplify", "concept", "application"])

    if qtype == "expand":
        b = random.randint(1, 5)
        question = f"Expand (x + {b})²."
        correct = f"x² + {2*b}x + {b*b}"
        wrongs = [f"x² + {b}x + {b}", f"x² + {b*b}", f"x² + {b}x"]
        steps = [
            f"Use identity: (x + a)² = x² + 2ax + a²",
            f"Here a = {b}",
            f"= x² + 2({b})x + {b}²",
            f"= x² + {2*b}x + {b*b}",
            f"Answer: x² + {2*b}x + {b*b}",
        ]

    elif qtype == "identify_term":
        question = "What is the middle term in the expansion of (a + b)²?"
        correct = "2ab"
        wrongs = ["a²", "b²", "ab"]
        steps = ["(a + b)² = a² + 2ab + b²", "Middle term = 2ab", "Answer: 2ab"]

    elif qtype == "simplify":
        question = "Simplify (x + 2)(x + 3)."
        correct = "x² + 5x + 6"
        wrongs = ["x² + 6x + 5", "x² + 5x", "x² + 6"]
        steps = [
            "FOIL: First, Outer, Inner, Last",
            "(x + 2)(x + 3) = x² + 3x + 2x + 6",
            "= x² + 5x + 6",
            "Answer: x² + 5x + 6",
        ]

    elif qtype == "concept":
        question = "Which identity is used to expand (a + b)²?"
        correct = "(a + b)² = a² + 2ab + b²"
        wrongs = ["(a − b)² = a² − 2ab + b²", "(a + b)³ = a³ + b³", "(a − b)³ = a³ − b³"]
        steps = ["The perfect square identity is: (a + b)² = a² + 2ab + b²", "Answer: (a + b)² = a² + 2ab + b²"]

    else:
        question = "If the side of a square is (x + 3) cm, what is the area?"
        correct = "x² + 6x + 9"
        wrongs = ["x² + 9", "x² + 3x + 9", "x² + 6x"]
        steps = [
            "Area = side² = (x + 3)²",
            "= x² + 2(3)x + 3² = x² + 6x + 9",
            "Answer: x² + 6x + 9",
        ]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Binomial Expressions",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
