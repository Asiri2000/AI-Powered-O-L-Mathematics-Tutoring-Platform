import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["identify_formula", "calculate_surface_area", "true_false", "concept", "application"])

    if qtype == "identify_formula":
        question = "Which formula is used to find the curved surface area of a cylinder?"
        correct = "2πrh"
        wrongs = ["πr²", "2πr(r + h)", "πr²h"]
        steps = ["CSA (Curved Surface Area) of cylinder = 2πrh", "where r = radius, h = height", "Answer: 2πrh"]

    elif qtype == "calculate_surface_area":
        r = random.randint(2, 5)
        h = random.randint(4, 10)
        val = round(2 * (22 / 7) * r * h, 2)
        question = f"Find the curved surface area of a cylinder of radius {r} cm and height {h} cm. (π = 22/7)"
        correct = f"{val} cm²"
        wrongs = [f"{round((22/7)*r*r, 2)} cm²", f"{round((22/7)*r*r*h, 2)} cm²", f"{round(2*(22/7)*r*(r+h), 2)} cm²"]
        steps = [
            f"Formula: CSA = 2πrh",
            f"= 2 × (22/7) × {r} × {h}",
            f"= {val} cm²",
            f"Answer: {val} cm²",
        ]

    elif qtype == "true_false":
        question = "The total surface area of a cube of side a is 6a²."
        correct = "True"
        wrongs = ["False", "Cannot be determined", "Only for cuboids"]
        steps = ["A cube has 6 equal square faces.", "Area of each face = a²", "TSA = 6 × a² = 6a²", "Answer: True"]

    elif qtype == "concept":
        question = "Which of the following affects the surface area of a sphere?"
        correct = "Radius of the sphere"
        wrongs = ["Height of the sphere", "Length of the diameter only", "Volume of the sphere"]
        steps = ["Surface area of sphere = 4πr²", "Only the radius r affects this.", "Answer: Radius of the sphere"]

    else:
        r = random.randint(3, 6)
        question = f"A sphere has radius {r} cm. What happens to its surface area if the radius is doubled?"
        correct = "It becomes four times"
        wrongs = ["It becomes two times", "It becomes eight times", "It remains the same"]
        steps = [
            "SA = 4πr²",
            f"New radius = 2r = {2*r}. New SA = 4π(2r)² = 4π × 4r² = 16πr²",
            f"Ratio = 16πr² / 4πr² = 4",
            "Answer: It becomes four times",
        ]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Surface Area of Solids",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
