import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["solve", "sign_change", "concept"])

    if qtype == "solve":
        x = random.randint(2, 6)
        correct = f"x > {x}"
        options, ans = shuffle_options(correct, [f"x < {x}", f"x = {x}", f"x ≥ {x}"])
        question = f"Solve the inequality x + {x} > {2*x}."
        steps = [
            f"Start with: x + {x} > {2*x}",
            f"Subtract {x} from both sides: x > {2*x} − {x}",
            f"x > {x}",
            f"Answer: x > {x}",
        ]

    elif qtype == "sign_change":
        correct = "The inequality sign reverses"
        options, ans = shuffle_options(correct, ["The sign remains same", "The inequality disappears", "The value becomes zero"])
        question = "What happens to the inequality sign when both sides are multiplied by a negative number?"
        steps = [
            "When you multiply or divide an inequality by a NEGATIVE number...",
            "...the direction of the inequality sign REVERSES.",
            "Example: −2x > 4  →  x < −2",
            "Answer: The inequality sign reverses",
        ]

    else:
        correct = "A range of values"
        options, ans = shuffle_options(correct, ["A single value", "Only integers", "Only fractions"])
        question = "What does the solution of an inequality represent?"
        steps = [
            "Unlike equations, inequalities have many possible solutions.",
            "The solution is a range of values satisfying the condition.",
            "Example: x > 3 means all values greater than 3.",
            "Answer: A range of values",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Algebraic Inequalities",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
