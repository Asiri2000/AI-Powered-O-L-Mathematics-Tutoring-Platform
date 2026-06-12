import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["identify_gp", "find_common_ratio", "find_nth_term", "concept", "application"])

    if qtype == "identify_gp":
        question = "Which of the following is a geometric progression?"
        correct = "2, 4, 8, 16, ..."
        wrongs = ["2, 4, 6, 8, ...", "1, 4, 9, 16, ...", "3, 6, 10, 15, ..."]
        steps = [
            "In a GP, each term is obtained by multiplying by a fixed ratio.",
            "2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16 ✓ (ratio = 2)",
            "Answer: 2, 4, 8, 16, ...",
        ]

    elif qtype == "find_common_ratio":
        a = random.choice([2, 3, 5])
        r = random.choice([2, 3, 4])
        question = f"Find the common ratio of the GP: {a}, {a*r}, {a*(r**2)}, ..."
        correct = str(r)
        wrongs = [str(a), str(r + 1), str(a * r)]
        steps = [
            "Common ratio = any term ÷ previous term",
            f"= {a*r} ÷ {a} = {r}",
            f"Answer: {r}",
        ]

    elif qtype == "find_nth_term":
        a = random.choice([2, 3])
        r = random.choice([2, 3])
        n = random.choice([3, 4])
        term = a * (r ** (n - 1))
        question = f"Find the {n}th term of the GP: {a}, {a*r}, {a*(r**2)}, ..."
        correct = str(term)
        wrongs = [str(a * (r ** n)), str(a * n), str(r ** n)]
        steps = [
            f"Formula: Tn = a × r^(n−1)",
            f"Substitute: T{n} = {a} × {r}^({n}−1) = {a} × {r}^{n-1}",
            f"= {a} × {r**(n-1)} = {term}",
            f"Answer: {term}",
        ]

    elif qtype == "concept":
        question = "What defines a geometric progression?"
        correct = "Each term is obtained by multiplying the previous term by a constant"
        wrongs = ["Each term is obtained by adding a constant", "Each term is a square of the previous term", "Each term increases by 1"]
        steps = [
            "In AP, terms differ by a fixed amount (addition).",
            "In GP, terms change by a fixed ratio (multiplication).",
            "Answer: Each term is obtained by multiplying the previous term by a constant",
        ]

    else:
        question = "A bacteria culture doubles every hour. Which progression represents this growth?"
        correct = "Geometric progression"
        wrongs = ["Arithmetic progression", "Harmonic progression", "Linear progression"]
        steps = [
            "Doubling means multiplying by 2 each time.",
            "Constant ratio → Geometric Progression.",
            "Answer: Geometric progression",
        ]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Geometric Progressions",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
