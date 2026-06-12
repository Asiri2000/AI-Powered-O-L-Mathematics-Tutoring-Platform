import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["substitution", "rearrange", "concept"])

    if qtype == "substitution":
        l = random.randint(3, 8)
        w = random.randint(2, 6)
        A = l * w
        correct = str(A)
        options, ans = shuffle_options(correct, [str(2*(l+w)), str(l+w), str(A+l)])
        question = f"Using the formula A = l × w, find A when l = {l} and w = {w}."
        steps = [
            f"Formula: A = l × w",
            f"Substitute: A = {l} × {w}",
            f"Calculate: A = {A}",
            f"Answer: {A}",
        ]

    elif qtype == "rearrange":
        correct = "v = u + at"
        options, ans = shuffle_options(correct, ["u = v + at", "a = v + ut", "t = u + va"])
        question = "Which is the correct formula for final velocity?"
        steps = [
            "v = u + at is a standard kinematics formula.",
            "v = final velocity, u = initial velocity, a = acceleration, t = time.",
            "Answer: v = u + at",
        ]

    else:
        correct = "Rearrange the formula"
        options, ans = shuffle_options(correct, ["Change the numbers", "Guess the value", "Remove variables"])
        question = "What should be done to find a required variable in a formula?"
        steps = [
            "When a variable is unknown, isolate it on one side of the formula.",
            "This is called rearranging or transposing the formula.",
            "Answer: Rearrange the formula",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Formula",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
