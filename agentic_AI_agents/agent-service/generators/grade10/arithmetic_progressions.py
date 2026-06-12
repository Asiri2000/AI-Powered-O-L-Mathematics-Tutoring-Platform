import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    a = random.randint(1, 6)
    d = random.randint(2, 6)
    qtype = random.choice(["nth_term", "common_difference", "sum_n", "concept"])

    # ---- Nth TERM ----
    if qtype == "nth_term":
        n = random.randint(5, 10)
        nth = a + (n - 1) * d
        correct = str(nth)
        options, ans = shuffle_options(
            correct,
            [str(a + n * d), str(a + (n - 2) * d), str(a + (n + 1) * d)]
        )
        question = f"Find the {n}th term of the arithmetic progression {a}, {a+d}, {a+2*d}, ..."
        steps = [
            f"Formula: nth term = a + (n − 1) × d",
            f"Here a = {a}, d = {d}, n = {n}",
            f"Substitute: {a} + ({n} − 1) × {d} = {a} + {(n-1)*d}",
            f"Answer: {nth}",
        ]

    # ---- COMMON DIFFERENCE ----
    elif qtype == "common_difference":
        correct = str(d)
        options, ans = shuffle_options(correct, [str(d + 1), str(d - 1), str(2 * d)])
        question = f"Find the common difference of the AP: {a}, {a+d}, {a+2*d}, ..."
        steps = [
            f"Common difference = any term − previous term",
            f"= {a+d} − {a} = {d}",
            f"Answer: {d}",
        ]

    # ---- SUM OF N TERMS ----
    elif qtype == "sum_n":
        n = random.randint(4, 8)
        s = (n * (2 * a + (n - 1) * d)) // 2
        correct = str(s)
        options, ans = shuffle_options(correct, [str(s + d), str(s - a), str(s + a)])
        question = f"Find the sum of the first {n} terms of the AP: {a}, {a+d}, {a+2*d}, ..."
        steps = [
            f"Formula: Sn = n/2 × [2a + (n−1)d]",
            f"Substitute: {n}/2 × [2×{a} + ({n}−1)×{d}]",
            f"= {n}/2 × [{2*a} + {(n-1)*d}] = {n}/2 × {2*a+(n-1)*d}",
            f"Answer: {s}",
        ]

    # ---- CONCEPT ----
    else:
        correct = "Common difference"
        options, ans = shuffle_options(correct, ["Common ratio", "First term", "Last term"])
        question = "What is the constant difference between consecutive terms of an AP called?"
        steps = [
            "In an Arithmetic Progression (AP), each term differs from the previous by a fixed amount.",
            "This fixed amount is called the Common Difference (d).",
            "For example, in 2, 5, 8, 11 — d = 3.",
            "Answer: Common difference",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Arithmetic Progressions",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
