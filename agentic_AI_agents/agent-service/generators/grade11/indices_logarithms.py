import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["evaluate_indices", "simplify_indices", "logarithm_value", "logarithm_law", "concept"])

    if qtype == "evaluate_indices":
        base = random.randint(2, 4)
        a = random.randint(2, 4)
        b = random.randint(1, 3)
        question = f"Evaluate {base}^{a} × {base}^{b}."
        correct = str(base ** (a + b))
        wrongs = [str(base**a + base**b), str(base**(a*b)), str(base**(abs(a-b)))]
        steps = [
            f"Rule: same base multiplication → add exponents",
            f"{base}^{a} × {base}^{b} = {base}^({a}+{b}) = {base}^{a+b}",
            f"= {base**(a+b)}",
            f"Answer: {base**(a+b)}",
        ]

    elif qtype == "simplify_indices":
        base = random.randint(2, 5)
        a = random.randint(3, 6)
        b = random.randint(1, 3)
        question = f"Simplify {base}^{a} ÷ {base}^{b}."
        correct = f"{base}^{a - b}"
        wrongs = [f"{base}^{a+b}", f"{base}^{a*b}", f"{base}^{b-a}"]
        steps = [
            f"Rule: same base division → subtract exponents",
            f"{base}^{a} ÷ {base}^{b} = {base}^({a}−{b})",
            f"= {base}^{a-b}",
            f"Answer: {base}^{a-b}",
        ]

    elif qtype == "logarithm_value":
        question = "Find the value of log₁₀1."
        correct = "0"
        wrongs = ["1", "10", "Undefined"]
        steps = [
            "log_b(1) = 0 for any base b.",
            "Because b⁰ = 1 for any non-zero b.",
            "So log₁₀(1) = 0.",
            "Answer: 0",
        ]

    elif qtype == "logarithm_law":
        question = "Which of the following is a correct logarithmic law?"
        correct = "log(ab) = log a + log b"
        wrongs = ["log(a + b) = log a + log b", "log(a − b) = log a − log b", "log(ab) = log a × log b"]
        steps = [
            "Product rule of logarithms: log(AB) = log A + log B",
            "log(ab) = log a + log b  ✓",
            "Answer: log(ab) = log a + log b",
        ]

    else:
        question = "What is the meaning of a negative index?"
        correct = "It represents the reciprocal of the base"
        wrongs = ["It makes the value zero", "It removes the base", "It makes the number negative"]
        steps = [
            "Negative exponent rule: a^(−n) = 1/aⁿ",
            "Example: 2^(−3) = 1/2³ = 1/8",
            "Answer: It represents the reciprocal of the base",
        ]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Indices and Logarithms",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
