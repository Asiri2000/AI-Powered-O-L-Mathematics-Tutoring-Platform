import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["coordinates", "slope", "concept", "y_intercept"])

    if qtype == "coordinates":
        m = random.randint(1, 4)
        x = random.randint(1, 4)
        y = m * x
        correct = f"({x},{y})"
        options, ans = shuffle_options(correct, [f"({y},{x})", f"({x},{x})", f"({1},{m})"])
        question = f"State the coordinates of the point where x = {x} on the graph y = {m}x."
        steps = [
            f"The line equation is y = {m}x",
            f"Substitute x = {x}: y = {m} × {x} = {y}",
            f"The point is ({x}, {y})",
            f"Answer: ({x},{y})",
        ]

    elif qtype == "slope":
        m = random.randint(1, 5)
        correct = str(m)
        options, ans = shuffle_options(correct, [str(m+1), str(m-1), str(2*m)])
        question = f"What is the gradient of the straight line y = {m}x?"
        steps = [
            f"The equation y = mx + c is the standard form of a straight line.",
            f"The gradient (slope) is the coefficient of x.",
            f"In y = {m}x, the gradient m = {m}",
            f"Answer: {m}",
        ]

    elif qtype == "concept":
        correct = "y-intercept"
        options, ans = shuffle_options(correct, ["Gradient", "Slope", "Origin"])
        question = "What is the point where a graph cuts the y-axis called?"
        steps = [
            "When a graph crosses the y-axis, x = 0.",
            "The value of y at this point is the y-intercept.",
            "Answer: y-intercept",
        ]

    else:
        c = random.randint(1, 6)
        correct = str(c)
        options, ans = shuffle_options(correct, [str(c+1), str(c-1), str(2*c)])
        question = f"What is the y-intercept of the line y = 3x + {c}?"
        steps = [
            f"In y = mx + c, c is the y-intercept.",
            f"In y = 3x + {c}, c = {c}",
            f"Answer: {c}",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Graphs",
        "needs_image": True,
        "svg_diagram": None,
        "steps": steps,
    }
