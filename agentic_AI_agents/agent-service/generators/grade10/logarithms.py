import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["basic", "power", "product_law", "concept"])

    if qtype == "basic":
        correct = "2"
        options, ans = shuffle_options(correct, ["1", "4", "10"])
        question = "Find the value of log₁₀ 100."
        steps = [
            "log₁₀ 100 means: 10 to what power = 100?",
            "10² = 100",
            "So log₁₀ 100 = 2",
            "Answer: 2",
        ]

    elif qtype == "power":
        correct = "3"
        options, ans = shuffle_options(correct, ["6", "1", "9"])
        question = "Find the value of log₂ 8."
        steps = [
            "log₂ 8 means: 2 to what power = 8?",
            "2¹ = 2, 2² = 4, 2³ = 8",
            "So log₂ 8 = 3",
            "Answer: 3",
        ]

    elif qtype == "product_law":
        correct = "log a + log b"
        options, ans = shuffle_options(correct, ["log a − log b", "log a × log b", "log(a+b)"])
        question = "Using logarithm laws, log(a × b) = ?"
        steps = [
            "Product law of logarithms: log(A × B) = log A + log B",
            "So log(a × b) = log a + log b",
            "Answer: log a + log b",
        ]

    else:
        correct = "Multiplication becomes addition"
        options, ans = shuffle_options(correct, ["Addition becomes multiplication", "Division becomes multiplication", "Powers are removed"])
        question = "According to logarithm laws, what happens when two numbers are multiplied?"
        steps = [
            "Logarithm product rule: log(A × B) = log A + log B",
            "This means multiplication of numbers becomes addition of their logs.",
            "Answer: Multiplication becomes addition",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Logarithms",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
