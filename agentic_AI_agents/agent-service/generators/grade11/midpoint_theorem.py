import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["state_theorem", "identify_property", "true_false", "application", "concept"])

    if qtype == "state_theorem":
        question = "What does the midpoint theorem state?"
        correct = "The line joining the midpoints of two sides of a triangle is parallel to the third side and half of it"
        wrongs = ["The line joining any two points is parallel to the base", "The midpoint divides the triangle into equal areas", "The line joining midpoints is equal to the third side"]
        steps = ["Midpoint Theorem: The segment joining midpoints of two sides of a triangle...", "...is parallel to the third side and exactly half its length.", "Answer: Parallel and half of the third side"]

    elif qtype == "identify_property":
        question = "In a triangle, a line joining the midpoints of two sides is parallel to:"
        correct = "The third side"
        wrongs = ["The altitude", "The angle bisector", "The median"]
        steps = ["By the Midpoint Theorem, the midsegment is parallel to the third side.", "Answer: The third side"]

    elif qtype == "true_false":
        question = "The line joining the midpoints of two sides of a triangle is half the length of the third side."
        correct = "True"
        wrongs = ["False", "Only for equilateral triangles", "Cannot be determined"]
        steps = ["Midpoint Theorem: midsegment = ½ × third side.", "Answer: True"]

    elif qtype == "application":
        base = random.choice([6, 8, 10, 12])
        half = base / 2
        question = f"In a triangle, the base length is {base} cm. What is the length of the line joining the midpoints of the other two sides?"
        correct = f"{half} cm"
        wrongs = [f"{base} cm", f"{base * 2} cm", f"{base - 2} cm"]
        steps = [
            f"By Midpoint Theorem: midsegment = ½ × base",
            f"= ½ × {base} = {half} cm",
            f"Answer: {half} cm",
        ]

    else:
        question = "Why is the line joining midpoints of two sides of a triangle parallel to the third side?"
        correct = "Because corresponding angles are equal"
        wrongs = ["Because all sides are equal", "Because the triangle is isosceles", "Because areas are equal"]
        steps = ["The midsegment creates equal corresponding angles with the base.", "Equal corresponding angles → parallel lines.", "Answer: Because corresponding angles are equal"]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Mid Point Theorem",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
