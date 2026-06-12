import random
import math
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps
from services.diagram_factory import get_diagram


def generate(difficulty):
    shape = random.choice([
        "rectangle",
        "square",
        "triangle",
        "parallelogram",
        "trapezium",
        "circle"
    ])

    if shape == "rectangle":
        l = random.randint(6, 14)
        w = random.randint(4, 10)
        correct = f"{2*(l+w)} cm"
        wrongs = [f"{l+w} cm", f"{2*l+w} cm", f"{l+2*w} cm"]
        question = f"Find the perimeter of a rectangle of length {l} cm and width {w} cm."
        steps = [
            f"Formula: Perimeter of rectangle = 2 × (length + width)",
            f"Substitute: 2 × ({l} + {w}) = 2 × {l+w}",
            f"Answer: {2*(l+w)} cm",
        ]
        diagram = get_diagram("rectangle", {"l": l, "w": w})

    elif shape == "square":
        a = random.randint(4, 15)
        correct = f"{4*a} cm"
        wrongs = [f"{a*a} cm", f"{2*a} cm", f"{3*a} cm"]
        question = f"Find the perimeter of a square with side {a} cm."
        steps = [
            f"Formula: Perimeter of square = 4 × side",
            f"Substitute: 4 × {a} = {4*a}",
            f"Answer: {4*a} cm",
        ]
        diagram = get_diagram("square", {"a": a})

    elif shape == "triangle":
        a, b, c = random.randint(4, 10), random.randint(5, 12), random.randint(6, 14)
        correct = f"{a+b+c} cm"
        wrongs = [f"{a+b} cm", f"{2*(a+b)} cm", f"{a*b} cm"]
        question = f"Find the perimeter of a triangle with sides {a} cm, {b} cm and {c} cm."
        steps = [
            f"Formula: Perimeter of triangle = sum of all three sides",
            f"Substitute: {a} + {b} + {c} = {a+b+c}",
            f"Answer: {a+b+c} cm",
        ]
        diagram = get_diagram("triangle", {"a": a, "b": b, "c": c})

    elif shape == "parallelogram":
        a, b = random.randint(6, 14), random.randint(4, 10)
        correct = f"{2*(a+b)} cm"
        wrongs = [f"{a+b} cm", f"{a*b} cm", f"{2*a+b} cm"]
        question = f"Find the perimeter of a parallelogram with adjacent sides {a} cm and {b} cm."
        steps = [
            f"Formula: Perimeter of parallelogram = 2 × (side1 + side2)",
            f"Substitute: 2 × ({a} + {b}) = 2 × {a+b}",
            f"Answer: {2*(a+b)} cm",
        ]
        diagram = get_diagram("parallelogram", {"a": a, "b": b})

    elif shape == "trapezium":
        a, b, c, d = [random.randint(4, 12) for _ in range(4)]
        correct = f"{a+b+c+d} cm"
        wrongs = [f"{a+b} cm", f"{2*(a+b)} cm", f"{a*b} cm"]
        question = f"Find the perimeter of a trapezium with sides {a} cm, {b} cm, {c} cm and {d} cm."
        steps = [
            f"Formula: Perimeter = sum of all four sides",
            f"Substitute: {a} + {b} + {c} + {d} = {a+b+c+d}",
            f"Answer: {a+b+c+d} cm",
        ]
        diagram = get_diagram("trapezium", {"a": a, "b": b, "h": c})

    else:  # circle
        r = random.randint(3, 10)
        correct = f"{round(2*math.pi*r, 1)} cm"
        wrongs = [
            f"{round(math.pi*r, 1)} cm",
            f"{round(math.pi*r*r, 1)} cm",
            f"{round(2*r, 1)} cm"
        ]
        question = f"Find the circumference of a circle of radius {r} cm. (Take π = 3.14)"
        steps = [
            f"Formula: Circumference = 2 × π × radius",
            f"Substitute: 2 × 3.14 × {r} = {round(2*math.pi*r, 1)}",
            f"Answer: {round(2*math.pi*r, 1)} cm",
        ]
        diagram = get_diagram("circle", {"r": r})

    options, ans = shuffle_options(correct, wrongs)

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Perimeter",
        "needs_image": True,
        "svg_diagram": diagram["content"] if diagram else None,
        "steps": steps,
    }
