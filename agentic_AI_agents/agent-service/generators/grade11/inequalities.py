import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["solve_simple_inequality", "identify_solution", "sign_change_rule", "number_line_concept", "application"])

    if qtype == "solve_simple_inequality":
        x = random.randint(2, 6)
        a = random.randint(1, 4)
        question = f"Solve the inequality {a}x < {a * x}."
        correct = f"x < {x}"
        wrongs = [f"x > {x}", f"x = {x}", f"x ≤ {x}"]
        steps = [
            f"Divide both sides by {a} (positive, so sign stays same):",
            f"{a}x < {a*x}  →  x < {x}",
            f"Answer: x < {x}",
        ]

    elif qtype == "identify_solution":
        question = "Which of the following is a solution of x > 3?"
        correct = "5"
        wrongs = ["3", "−1", "0"]
        steps = ["x > 3 means x must be strictly greater than 3.", "5 > 3 ✓", "Answer: 5"]

    elif qtype == "sign_change_rule":
        question = "What happens to an inequality sign when both sides are multiplied by a negative number?"
        correct = "The inequality sign is reversed"
        wrongs = ["The inequality sign remains the same", "The inequality disappears", "The inequality becomes an equation"]
        steps = ["Multiplying by −1 reverses the inequality direction.", "Example: −x > 2  →  x < −2", "Answer: The inequality sign is reversed"]

    elif qtype == "number_line_concept":
        question = "Which symbol represents all real numbers greater than or equal to 4?"
        correct = "x ≥ 4"
        wrongs = ["x > 4", "x ≤ 4", "x < 4"]
        steps = ["≥ means 'greater than OR equal to'.", "x ≥ 4 includes 4 itself.", "Answer: x ≥ 4"]

    else:
        question = "A student must score more than 50 to pass. Which inequality represents this?"
        correct = "Marks > 50"
        wrongs = ["Marks ≥ 50", "Marks < 50", "Marks ≤ 50"]
        steps = ["'More than 50' means strictly greater, not including 50.", "Answer: Marks > 50"]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Inequalities",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
