import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["solve_linear", "solve_with_brackets", "verify_solution", "identify_solution", "concept"])

    if qtype == "solve_linear":
        a = random.randint(1, 4)
        x = random.randint(1, 6)
        b = random.randint(0, 6)
        c = a * x + b
        question = f"Solve the equation {a}x + {b} = {c}."
        correct = str(x)
        wrongs = [str(x + 1), str(x - 1 if x > 1 else x + 2), str(c)]
        steps = [
            f"Start: {a}x + {b} = {c}",
            f"Subtract {b}: {a}x = {c - b}",
            f"Divide by {a}: x = {(c-b)//a}",
            f"Answer: x = {x}",
        ]

    elif qtype == "solve_with_brackets":
        x = random.randint(1, 5)
        a = random.randint(2, 4)
        b = random.randint(1, 4)
        question = f"Solve the equation {a}(x + {b}) = {a * (x + b)}."
        correct = str(x)
        wrongs = [str(x + b), str(a * x), str(x - b)]
        steps = [
            f"Expand: {a}(x + {b}) = {a}x + {a*b}",
            f"Set equal: {a}x + {a*b} = {a*(x+b)}",
            f"Subtract {a*b}: {a}x = {a*(x+b) - a*b}",
            f"Divide by {a}: x = {x}",
            f"Answer: x = {x}",
        ]

    elif qtype == "verify_solution":
        a = random.randint(1, 3)
        x = random.randint(1, 5)
        b = random.randint(1, 4)
        c = a * x + b
        test_value = random.choice([x, x + 1])
        question = f"Is x = {test_value} a solution of {a}x + {b} = {c}?"
        correct = "True" if test_value == x else "False"
        wrongs = ["Cannot be determined", "0", "Both"]
        steps = [
            f"Substitute x = {test_value}: {a}({test_value}) + {b} = {a*test_value+b}",
            f"Right-hand side = {c}",
            f"{'Equal → True' if a*test_value+b == c else 'Not equal → False'}",
            f"Answer: {'True' if a*test_value+b == c else 'False'}",
        ]

    elif qtype == "identify_solution":
        x = random.randint(1, 6)
        a = random.randint(1, 4)
        b = random.randint(1, 6)
        c = a * x + b
        question = f"Which of the following is the solution of {a}x + {b} = {c}?"
        correct = str(x)
        wrongs = [str(x + 2), str(x - 1 if x > 1 else x + 3), str(b)]
        steps = [
            f"Solve: {a}x + {b} = {c}",
            f"Subtract {b}: {a}x = {c - b}",
            f"Divide by {a}: x = {x}",
            f"Answer: x = {x}",
        ]

    else:
        question = "What does it mean to solve an equation?"
        correct = "To find the value that makes both sides equal"
        wrongs = ["To simplify only the left-hand side", "To remove all variables", "To rearrange the equation"]
        steps = [
            "Solving an equation means finding the unknown variable's value.",
            "The solution satisfies both sides of the equation.",
            "Answer: To find the value that makes both sides equal",
        ]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Equations",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
