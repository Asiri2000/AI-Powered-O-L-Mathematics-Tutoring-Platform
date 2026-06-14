import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["identify_formula", "calculate_volume", "true_false", "concept", "application"])

    if qtype == "identify_formula":
        question = "Which formula is used to find the volume of a sphere?"
        correct = "4/3 πr³"
        wrongs = ["πr²", "2πr³", "4πr²"]
        steps = ["Volume of sphere = (4/3)πr³", "where r = radius", "Answer: 4/3 πr³"]

    elif qtype == "calculate_volume":
        r = random.randint(2, 5)
        val = round((4 / 3) * (22 / 7) * (r ** 3), 2)
        question = f"Find the volume of a sphere of radius {r} cm. (π = 22/7)"
        correct = f"{val} cm³"
        wrongs = [f"{round((22/7)*r*r, 2)} cm³", f"{round((22/7)*r**3, 2)} cm³", f"{round(4*(22/7)*r*r, 2)} cm³"]
        steps = [
            f"Formula: V = (4/3)πr³",
            f"= (4/3) × (22/7) × {r}³",
            f"= (4/3) × (22/7) × {r**3} = {val}",
            f"Answer: {val} cm³",
        ]

    elif qtype == "true_false":
        question = "The volume of a cylinder is given by πr²h."
        correct = "True"
        wrongs = ["False", "Only for cones", "Cannot be determined"]
        steps = ["Volume of cylinder = base area × height", "= πr² × h = πr²h", "Answer: True"]

    elif qtype == "concept":
        question = "Which of the following changes the volume of a cube?"
        correct = "Length of its side"
        wrongs = ["Surface texture", "Color of the cube", "Orientation of the cube"]
        steps = ["Volume of cube = s³", "Only the side length s affects volume.", "Answer: Length of its side"]

    else:
        r = random.randint(2, 4)
        h = random.randint(5, 10)
        val = round((22 / 7) * r * r * h, 2)
        question = f"A cylindrical tank has radius {r} m and height {h} m. How much water can it hold? (π = 22/7)"
        correct = f"{val} m³"
        wrongs = [f"{round((22/7)*r*h, 2)} m³", f"{round(2*(22/7)*r*h, 2)} m³", f"{round((22/7)*r*r, 2)} m³"]
        steps = [
            f"Volume = πr²h",
            f"= (22/7) × {r}² × {h} = (22/7) × {r*r} × {h}",
            f"= {val} m³",
            f"Answer: {val} m³",
        ]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Volume of Solids",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
