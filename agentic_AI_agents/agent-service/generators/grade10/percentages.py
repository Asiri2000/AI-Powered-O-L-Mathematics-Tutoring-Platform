import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["percentage_of", "percentage_of_random", "increase", "decrease", "concept"])

    # ---- FIND PERCENTAGE (dynamic) ----
    if qtype == "percentage_of" or qtype == "percentage_of_random":
        p = random.choice([10, 15, 20, 25, 30, 50])
        total = random.randint(2, 10) * 100
        result = (p * total) // 100
        correct = str(result)
        options, ans = shuffle_options(
            correct,
            [str(result + 10), str(result - 10), str(result * 2)]
        )
        question = f"Find {p}% of {total}."
        steps = [
            f"Formula: Percentage of a value = (percentage / 100) × value",
            f"Substitute: ({p} / 100) × {total}",
            f"Calculate: {p} × {total} ÷ 100 = {result}",
            f"Answer: {result}",
        ]

    # ---- INCREASE ----
    elif qtype == "increase":
        original = random.randint(2, 10) * 50
        p = random.choice([10, 20, 25, 50])
        increased = original + (original * p) // 100
        correct = str(increased)
        options, ans = shuffle_options(
            correct,
            [str(increased - 10), str(increased + p), str(original)]
        )
        question = f"Increase {original} by {p}%."
        steps = [
            f"Find {p}% of {original}: ({p}/100) × {original} = {(original*p)//100}",
            f"Add to original: {original} + {(original*p)//100} = {increased}",
            f"Answer: {increased}",
        ]

    # ---- DECREASE ----
    elif qtype == "decrease":
        original = random.randint(2, 10) * 50
        p = random.choice([10, 20, 25])
        decreased = original - (original * p) // 100
        correct = str(decreased)
        options, ans = shuffle_options(
            correct,
            [str(decreased + 10), str(decreased - p), str(original)]
        )
        question = f"Decrease {original} by {p}%."
        steps = [
            f"Find {p}% of {original}: ({p}/100) × {original} = {(original*p)//100}",
            f"Subtract from original: {original} − {(original*p)//100} = {decreased}",
            f"Answer: {decreased}",
        ]

    # ---- CONCEPT ----
    else:
        correct = "Divide by 100"
        options, ans = shuffle_options(
            correct,
            ["Multiply by 100", "Subtract from 100", "Add 100"]
        )
        question = "To convert a percentage into a fraction, what must be done?"
        steps = [
            "A percentage means 'per hundred'.",
            "To convert to a fraction, write the percentage as numerator over 100.",
            "Example: 25% = 25/100 = 1/4. So divide by 100.",
            "Answer: Divide by 100",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Percentages",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
