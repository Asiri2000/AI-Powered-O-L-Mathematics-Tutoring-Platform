import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty):
    qtype = random.choice([
        "add", "subtract", "multiply", "divide",
        "simplify", "mixed_to_improper", "improper_to_mixed"
    ])

    # ---------------- ADDITION ----------------
    if qtype == "add":
        a, b = random.randint(1, 5), random.randint(2, 9)
        c, d = random.randint(1, 5), random.randint(2, 9)
        correct = f"{a*d + b*c}/{b*d}"
        options, ans = shuffle_options(correct, [f"{a+c}/{b+d}", f"{a*d}/{b*c}", f"{a+b}/{c+d}"])
        question = f"Find the value of {a}/{b} + {c}/{d}."
        steps = [
            f"To add fractions with different denominators, find LCD = {b} × {d} = {b*d}",
            f"Convert: {a}/{b} = {a*d}/{b*d}  and  {c}/{d} = {b*c}/{b*d}",
            f"Add numerators: {a*d} + {b*c} = {a*d+b*c}",
            f"Answer: {a*d+b*c}/{b*d}",
        ]

    # ---------------- SUBTRACTION ----------------
    elif qtype == "subtract":
        a, b = random.randint(3, 7), random.randint(2, 9)
        c, d = random.randint(1, 5), random.randint(2, 9)
        correct = f"{a*d - b*c}/{b*d}"
        options, ans = shuffle_options(correct, [f"{a-c}/{b-d}", f"{a*d}/{b*c}", f"{a-c}/{b}"])
        question = f"Find the value of {a}/{b} − {c}/{d}."
        steps = [
            f"To subtract fractions, find LCD = {b} × {d} = {b*d}",
            f"Convert: {a}/{b} = {a*d}/{b*d}  and  {c}/{d} = {b*c}/{b*d}",
            f"Subtract numerators: {a*d} − {b*c} = {a*d-b*c}",
            f"Answer: {a*d-b*c}/{b*d}",
        ]

    # ---------------- MULTIPLICATION ----------------
    elif qtype == "multiply":
        a, b = random.randint(1, 5), random.randint(2, 7)
        c, d = random.randint(1, 5), random.randint(2, 7)
        correct = f"{a*c}/{b*d}"
        options, ans = shuffle_options(correct, [f"{a+c}/{b+d}", f"{a*d}/{b*c}", f"{a+b}/{c+d}"])
        question = f"Find the value of {a}/{b} × {c}/{d}."
        steps = [
            f"Multiply numerators: {a} × {c} = {a*c}",
            f"Multiply denominators: {b} × {d} = {b*d}",
            f"Answer: {a*c}/{b*d}",
        ]

    # ---------------- DIVISION ----------------
    elif qtype == "divide":
        a, b = random.randint(1, 5), random.randint(2, 7)
        c, d = random.randint(1, 5), random.randint(2, 7)
        correct = f"{a*d}/{b*c}"
        options, ans = shuffle_options(correct, [f"{a*c}/{b*d}", f"{a+d}/{b+c}", f"{a*b}/{c*d}"])
        question = f"Find the value of {a}/{b} ÷ {c}/{d}."
        steps = [
            f"To divide fractions, multiply by the reciprocal of the divisor",
            f"{a}/{b} ÷ {c}/{d}  =  {a}/{b} × {d}/{c}",
            f"Multiply: {a} × {d} = {a*d}  and  {b} × {c} = {b*c}",
            f"Answer: {a*d}/{b*c}",
        ]

    # ---------------- SIMPLIFY ----------------
    elif qtype == "simplify":
        base = random.randint(2, 6)
        num = base * random.randint(2, 4)
        den = base * random.randint(3, 6)
        correct = f"{num//base}/{den//base}"
        options, ans = shuffle_options(correct, [f"{num}/{den}", f"{num//2}/{den//2}", f"{num//3}/{den//3}"])
        question = f"Simplify the fraction {num}/{den}."
        steps = [
            f"Find the HCF of {num} and {den}. HCF = {base}",
            f"Divide both by HCF: {num} ÷ {base} = {num//base}  and  {den} ÷ {base} = {den//base}",
            f"Answer: {num//base}/{den//base}",
        ]

    # ---------------- MIXED → IMPROPER ----------------
    elif qtype == "mixed_to_improper":
        whole = random.randint(1, 4)
        num = random.randint(1, 5)
        den = random.randint(2, 7)
        correct = f"{whole*den + num}/{den}"
        options, ans = shuffle_options(correct, [f"{whole}/{den}", f"{num}/{den}", f"{whole*den}/{num}"])
        question = f"Convert the mixed number {whole} {num}/{den} into an improper fraction."
        steps = [
            f"Multiply whole number by denominator: {whole} × {den} = {whole*den}",
            f"Add the numerator: {whole*den} + {num} = {whole*den+num}",
            f"Place over original denominator: Answer = {whole*den+num}/{den}",
        ]

    # ---------------- IMPROPER → MIXED ----------------
    else:
        den = random.randint(2, 7)
        whole = random.randint(1, 4)
        num = random.randint(1, den - 1)
        improper = whole * den + num
        correct = f"{whole} {num}/{den}"
        options, ans = shuffle_options(correct, [f"{num}/{den}", f"{whole}/{den}", f"{improper}/{den}"])
        question = f"Convert the improper fraction {improper}/{den} into a mixed number."
        steps = [
            f"Divide {improper} by {den}: {improper} ÷ {den} = {whole} remainder {num}",
            f"Whole part = {whole},  Remainder = {num}",
            f"Answer: {whole} {num}/{den}",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Fractions",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
