import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["speed", "speed_dynamic", "unit", "concept"])

    if qtype == "speed" or qtype == "speed_dynamic":
        d = random.randint(2, 10) * 30
        t = random.randint(1, 4)
        s = d // t
        correct = f"{s} km/h"
        options, ans = shuffle_options(correct, [f"{s//2} km/h", f"{s*2} km/h", f"{s+10} km/h"])
        question = f"A car travels {d} km in {t} hour{'s' if t > 1 else ''}. Find its speed."
        steps = [
            "Formula: Speed = Distance ÷ Time",
            f"Substitute: {d} ÷ {t} = {s}",
            f"Answer: {s} km/h",
        ]

    elif qtype == "unit":
        correct = "km/h"
        options, ans = shuffle_options(correct, ["km", "h", "m²"])
        question = "What is the unit of speed?"
        steps = [
            "Speed = Distance ÷ Time",
            "Units: km ÷ h = km/h",
            "Answer: km/h",
        ]

    else:
        correct = "Distance ÷ Time"
        options, ans = shuffle_options(correct, ["Time ÷ Distance", "Distance × Time", "Speed × Time"])
        question = "How is speed calculated?"
        steps = [
            "Speed tells us how far something moves per unit time.",
            "Formula: Speed = Distance ÷ Time",
            "Answer: Distance ÷ Time",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Rate",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
