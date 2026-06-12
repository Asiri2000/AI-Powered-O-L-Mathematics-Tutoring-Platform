import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["solve", "verify", "identify", "concept", "word_problem"])

    # ---- SOLVE LINEAR EQUATION ----
    if qtype == "solve":
        a = random.randint(1, difficulty + 2)
        x = random.randint(1, 5)
        b = random.randint(0, 5)
        c = a * x + b
        question = f"Solve the equation {a}x + {b} = {c}."
        correct = str(x)
        wrongs = [str(x + 1), str(x - 1 if x > 1 else x + 2), str(x + 2)]
        options, ans = shuffle_options(correct, wrongs)
        steps = [
            f"Start: {a}x + {b} = {c}",
            f"Subtract {b} from both sides: {a}x = {c} − {b} = {c-b}",
            f"Divide both sides by {a}: x = {c-b} ÷ {a} = {x}",
            f"Answer: x = {x}",
        ]

    # ---- VERIFY A SOLUTION ----
    elif qtype == "verify":
        a = random.randint(1, difficulty + 2)
        x = random.randint(1, 5)
        b = random.randint(0, 5)
        c = a * x + b
        test_value = random.choice([x, x + 1])
        question = f"Is x = {test_value} a solution of {a}x + {b} = {c}?"
        correct = "True" if test_value == x else "False"
        options, ans = shuffle_options(correct, ["False", "Cannot be determined", "0"])
        steps = [
            f"Substitute x = {test_value} into the left-hand side:",
            f"{a}({test_value}) + {b} = {a*test_value + b}",
            f"Right-hand side = {c}",
            f"LHS {'=' if a*test_value+b==c else '≠'} RHS → Answer: {'True' if a*test_value+b==c else 'False'}",
        ]

    # ---- IDENTIFY CORRECT SOLUTION ----
    elif qtype == "identify":
        a = random.randint(1, difficulty + 2)
        x = random.randint(1, 5)
        b = random.randint(0, 5)
        c = a * x + b
        question = f"Which of the following is the solution of {a}x + {b} = {c}?"
        correct = str(x)
        wrongs = [str(x + 1), str(x - 1 if x > 1 else x + 2), str(c)]
        options, ans = shuffle_options(correct, wrongs)
        steps = [
            f"Try each option by substituting into {a}x + {b} = {c}",
            f"Try x = {x}: {a}({x}) + {b} = {a*x+b} = {c} ✓",
            f"Answer: x = {x}",
        ]

    # ---- CONCEPTUAL QUESTION ----
    elif qtype == "concept":
        question = "What does it mean to solve an equation?"
        correct = "To find the value that makes both sides equal"
        wrongs = ["To simplify only the left-hand side", "To remove all variables", "To change the equation"]
        options, ans = shuffle_options(correct, wrongs)
        steps = [
            "Solving an equation means finding the value of the unknown variable.",
            "The solution makes the left-hand side equal to the right-hand side.",
            "Answer: To find the value that makes both sides equal",
        ]

    # ---- WORD PROBLEM ----
    else:
        x = random.randint(2, 6)
        total = 3 * x + 4
        question = f"A number is multiplied by 3 and then 4 is added to get {total}. What is the number?"
        correct = str(x)
        wrongs = [str(x + 1), str(x - 1), str(total)]
        options, ans = shuffle_options(correct, wrongs)
        steps = [
            f"Let the number be x. Form the equation: 3x + 4 = {total}",
            f"Subtract 4: 3x = {total} − 4 = {total-4}",
            f"Divide by 3: x = {total-4} ÷ 3 = {x}",
            f"Answer: {x}",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Equations",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
