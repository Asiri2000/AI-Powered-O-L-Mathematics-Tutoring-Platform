import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["identify_graph", "read_coordinate", "slope_concept", "equation_of_line", "interpretation"])

    if qtype == "identify_graph":
        question = "Which of the following represents a straight-line graph?"
        correct = "y = 2x + 3"
        wrongs = ["y = x²", "y = 1/x", "x² + y² = 25"]
        steps = ["A straight-line equation has the form y = mx + c.", "y = 2x + 3 has this form.", "Answer: y = 2x + 3"]

    elif qtype == "read_coordinate":
        x = random.randint(1, 5)
        y = random.randint(2, 6)
        question = f"A point has x-coordinate {x} and y-coordinate {y}. How is it written?"
        correct = f"({x}, {y})"
        wrongs = [f"({y}, {x})", f"[{x}, {y}]", f"{x}, {y}"]
        steps = ["Coordinates are written as (x, y) — x first, then y.", f"Answer: ({x}, {y})"]

    elif qtype == "slope_concept":
        question = "What does the gradient (slope) of a straight line represent?"
        correct = "The rate of change of y with respect to x"
        wrongs = ["The y-intercept", "The length of the line", "The area under the graph"]
        steps = ["Gradient = rise / run = Δy / Δx", "It measures how steep the line is — rate of change of y per unit x.", "Answer: The rate of change of y with respect to x"]

    elif qtype == "equation_of_line":
        m = random.choice([1, 2, 3])
        c = random.choice([1, 2, 4])
        question = f"What is the equation of a straight line with gradient {m} and y-intercept {c}?"
        correct = f"y = {m}x + {c}"
        wrongs = [f"y = {c}x + {m}", f"x = {m}y + {c}", f"y = {m+c}x"]
        steps = [f"Standard form: y = mx + c", f"m = {m}, c = {c}", f"Equation: y = {m}x + {c}", f"Answer: y = {m}x + {c}"]

    else:
        question = "If a straight-line graph slopes upwards from left to right, what about its gradient?"
        correct = "The gradient is positive"
        wrongs = ["The gradient is negative", "The gradient is zero", "The gradient is undefined"]
        steps = ["Upward slope = positive gradient.", "Downward slope = negative gradient.", "Horizontal line = gradient 0.", "Answer: The gradient is positive"]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Graphs",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
