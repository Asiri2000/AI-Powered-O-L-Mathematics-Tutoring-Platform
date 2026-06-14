import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["simplify", "identify_restriction", "evaluate", "concept", "application"])

    if qtype == "simplify":
        question = "Simplify (x² − 9) / (x + 3)."
        correct = "x − 3"
        wrongs = ["x + 3", "x² − 3", "x² + 3"]
        steps = [
            "Factorise numerator: x² − 9 = (x + 3)(x − 3)",
            "Divide by (x + 3): cancel (x + 3)",
            "= x − 3 (provided x ≠ −3)",
            "Answer: x − 3",
        ]

    elif qtype == "identify_restriction":
        question = "For what value of x is the expression 1 / (x − 4) undefined?"
        correct = "x = 4"
        wrongs = ["x = −4", "x = 0", "x = 1"]
        steps = [
            "A fraction is undefined when its denominator = 0.",
            "Set denominator = 0: x − 4 = 0",
            "x = 4",
            "Answer: x = 4",
        ]

    elif qtype == "evaluate":
        x_val = random.randint(1, 5)
        val = round((x_val + 2) / (x_val + 1), 2)
        question = f"Evaluate (x + 2) / (x + 1) when x = {x_val}."
        correct = str(val)
        wrongs = [str(round((x_val+1)/(x_val+2), 2)), str(round((x_val+2)/x_val, 2)), str(round(x_val/(x_val+1), 2))]
        steps = [
            f"Substitute x = {x_val}:",
            f"({x_val} + 2) / ({x_val} + 1) = {x_val+2} / {x_val+1}",
            f"= {val}",
            f"Answer: {val}",
        ]

    elif qtype == "concept":
        question = "Why are restrictions placed on the variable in algebraic fractions?"
        correct = "To avoid division by zero"
        wrongs = ["To simplify the expression", "To remove variables", "To reduce coefficients"]
        steps = [
            "Fractions are undefined when denominator = 0.",
            "We restrict variables to exclude values that make the denominator zero.",
            "Answer: To avoid division by zero",
        ]

    else:
        question = "The expression (x − 5) / (x − 2) represents speed. Why must x ≠ 2?"
        correct = "Because the denominator becomes zero"
        wrongs = ["Because the value becomes negative", "Because the numerator becomes zero", "Because the expression simplifies"]
        steps = [
            "At x = 2: denominator = 2 − 2 = 0",
            "Division by zero is undefined.",
            "Answer: Because the denominator becomes zero",
        ]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Algebraic Fractions",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
