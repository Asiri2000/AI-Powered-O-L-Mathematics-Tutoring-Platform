import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["scale_distance", "scale_ratio", "concept"])

    if qtype == "scale_distance":
        map_dist = random.randint(2, 6)
        scale = random.choice([1000, 500, 2000])
        actual = map_dist * scale
        correct = f"{actual} cm"
        options, ans = shuffle_options(correct, [f"{map_dist+scale} cm", f"{scale} cm", f"{actual//2} cm"])
        question = f"On a map drawn to a scale of 1 : {scale}, a distance measures {map_dist} cm. Find the actual distance."
        steps = [
            f"Scale 1 : {scale} means 1 cm on map = {scale} cm in reality.",
            f"Actual distance = map distance × scale factor",
            f"= {map_dist} × {scale} = {actual} cm",
            f"Answer: {actual} cm",
        ]

    elif qtype == "scale_ratio":
        correct = "1 : 1000"
        options, ans = shuffle_options(correct, ["1000 : 1", "1 : 100", "10 : 1"])
        question = "Which scale represents a reduction drawing?"
        steps = [
            "A reduction drawing is smaller than the real object.",
            "Scale 1 : 1000 means 1 unit on paper = 1000 units in reality (smaller drawing).",
            "Scales like 1000 : 1 would be enlargements.",
            "Answer: 1 : 1000",
        ]

    else:
        correct = "Ratio of drawing to actual object"
        options, ans = shuffle_options(correct, ["Area of diagram", "Perimeter of diagram", "Volume of object"])
        question = "What does the scale of a diagram represent?"
        steps = [
            "Scale = drawing length : actual length",
            "It tells us how much the actual object has been reduced or enlarged.",
            "Answer: Ratio of drawing to actual object",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Scale Diagrams",
        "needs_image": True,
        "svg_diagram": None,
        "steps": steps,
    }
