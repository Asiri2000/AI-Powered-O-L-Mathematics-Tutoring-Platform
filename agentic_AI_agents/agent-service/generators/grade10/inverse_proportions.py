import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    x1 = random.randint(2, 6)
    y1 = random.randint(12, 24)
    x2 = random.randint(3, 8)
    y2 = (x1 * y1) // x2
    correct = str(y2)
    options, ans = shuffle_options(correct, [str(y1), str(x2 * y1), str(y1 // x2)])
    steps = [
        f"For inverse proportion: x₁y₁ = x₂y₂  (constant product)",
        f"Given: x₁ = {x1}, y₁ = {y1}, x₂ = {x2}",
        f"Find y₂: y₂ = (x₁ × y₁) / x₂ = ({x1} × {y1}) / {x2} = {x1*y1} / {x2}",
        f"Answer: y₂ = {y2}",
    ]
    return {
        "question": f"If x and y are inversely proportional, and x = {x1} when y = {y1}, find y when x = {x2}.",
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Inverse Proportions",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
