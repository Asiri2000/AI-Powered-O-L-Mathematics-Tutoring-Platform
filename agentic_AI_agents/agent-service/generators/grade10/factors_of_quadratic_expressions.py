import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    a = random.randint(1, 4)
    b = random.randint(1, 5)
    s = a + b
    p = a * b
    correct = f"(x + {a})(x + {b})"
    options, ans = shuffle_options(
        correct,
        [f"(x + {s})(x)", f"(x + {a})(x - {b})", f"x² + {s}x"]
    )
    steps = [
        f"We need to factorise x² + {s}x + {p}.",
        f"Find two numbers that multiply to {p} and add to {s}.",
        f"Those numbers are {a} and {b} (since {a} × {b} = {p} and {a} + {b} = {s}).",
        f"Write as factors: (x + {a})(x + {b})",
        f"Answer: (x + {a})(x + {b})",
    ]
    return {
        "question": f"Factorize x² + {s}x + {p}.",
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Factors of Quadratic Expressions",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
