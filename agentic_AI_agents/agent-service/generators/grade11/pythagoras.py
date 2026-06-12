import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps
from services.diagram_factory import get_diagram


def generate(difficulty: int = 3):
    qtype = random.choice(["find_hypotenuse", "find_leg", "verify_right_triangle", "concept", "application"])

    if qtype == "find_hypotenuse":
        a = random.choice([3, 5, 6])
        b = random.choice([4, 12, 8])
        c = int((a*a + b*b) ** 0.5)
        question = f"Find the hypotenuse of a right-angled triangle with sides {a} cm and {b} cm."
        correct = f"{c} cm"
        wrongs = [f"{a + b} cm", f"{a * b} cm", f"{abs(a - b)} cm"]
        steps = [
            f"Pythagoras: c² = a² + b²",
            f"c² = {a}² + {b}² = {a*a} + {b*b} = {a*a+b*b}",
            f"c = √{a*a+b*b} = {c} cm",
            f"Answer: {c} cm",
        ]
        diagram = get_diagram("right_triangle", {"a": a, "b": b, "c": c})

    elif qtype == "find_leg":
        hyp = random.choice([5, 10, 13])
        leg = random.choice([3, 6, 5])
        other = int((hyp*hyp - leg*leg) ** 0.5)
        question = f"A right-angled triangle has hypotenuse {hyp} cm and one side {leg} cm. Find the other side."
        correct = f"{other} cm"
        wrongs = [f"{hyp - leg} cm", f"{hyp + leg} cm", f"{leg * 2} cm"]
        steps = [
            f"Use: other² = hypotenuse² − side²",
            f"other² = {hyp}² − {leg}² = {hyp*hyp} − {leg*leg} = {hyp*hyp - leg*leg}",
            f"other = √{hyp*hyp - leg*leg} = {other} cm",
            f"Answer: {other} cm",
        ]
        diagram = get_diagram("right_triangle", {"a": leg, "b": other, "c": hyp})

    elif qtype == "verify_right_triangle":
        question = "Check whether a triangle with sides 6 cm, 8 cm, and 10 cm is right-angled."
        correct = "Yes"
        wrongs = ["No", "Only if angle is 60°", "Cannot be determined"]
        steps = [
            "Check: Is 10² = 6² + 8²?",
            "100 = 36 + 64 = 100 ✓",
            "Answer: Yes, it is right-angled",
        ]
        diagram = get_diagram("right_triangle", {"a": 6, "b": 8, "c": 10})

    elif qtype == "concept":
        question = "Which correctly states Pythagoras's theorem?"
        correct = "Square of hypotenuse = sum of squares of the other two sides"
        wrongs = ["Sum of sides = hypotenuse", "Product of sides = hypotenuse", "Square of one side = sum of others"]
        steps = [
            "Pythagoras's theorem applies to right-angled triangles only.",
            "Theorem: c² = a² + b², where c is the hypotenuse.",
            "Answer: Square of hypotenuse = sum of squares of the other two sides",
        ]
        diagram = None

    else:
        question = "A ladder 13 m long rests against a wall. The foot is 5 m from the wall. How high up the wall?"
        correct = "12 m"
        wrongs = ["8 m", "10 m", "13 m"]
        steps = [
            "The wall, floor, and ladder form a right triangle.",
            "height² = 13² − 5² = 169 − 25 = 144",
            "height = √144 = 12 m",
            "Answer: 12 m",
        ]
        diagram = get_diagram("right_triangle", {"a": 5, "b": 12, "c": 13})

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Pythagoras's Theorem",
        "needs_image": True,
        "svg_diagram": diagram["content"] if diagram else None,
        "steps": steps,
    }
