import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps
from services.diagram_factory import get_diagram


def generate(difficulty):
    shape = random.choice([
        "rectangle",
        "square",
        "triangle",
        "parallelogram",
        "trapezium"
    ])

    # ---------------- RECTANGLE ----------------
    if shape == "rectangle":
        l = random.randint(4, 12)
        w = random.randint(3, 10)
        correct = f"{l * w} cm²"
        options, ans = shuffle_options(correct, [f"{2*l*w} cm²", f"{l+w} cm²", f"{l*w+w} cm²"])
        question = f"Find the area of a rectangle of length {l} cm and width {w} cm."
        steps = [
            "Formula: Area of rectangle = length × width",
            f"Substitute: {l} × {w} = {l*w}",
            f"Answer: {l*w} cm²",
        ]
        diagram = get_diagram("rectangle", {"l": l, "w": w})

    # ---------------- SQUARE ----------------
    elif shape == "square":
        a = random.randint(4, 15)
        correct = f"{a * a} cm²"
        options, ans = shuffle_options(correct, [f"{4*a} cm²", f"{2*a*a} cm²", f"{a*(a+1)} cm²"])
        question = f"Find the area of a square with side {a} cm."
        steps = [
            "Formula: Area of square = side²",
            f"Substitute: {a}² = {a*a}",
            f"Answer: {a*a} cm²",
        ]
        diagram = get_diagram("square", {"a": a})

    # ---------------- TRIANGLE ----------------
    elif shape == "triangle":
        b = random.randint(6, 14)
        h = random.randint(4, 10)
        correct = f"{(b*h)//2} cm²"
        options, ans = shuffle_options(correct, [f"{b*h} cm²", f"{b+h} cm²", f"{(b*h)//3} cm²"])
        question = f"Find the area of a triangle with base {b} cm and height {h} cm."
        steps = [
            "Formula: Area of triangle = ½ × base × height",
            f"Substitute: ½ × {b} × {h} = {(b*h)//2}",
            f"Answer: {(b*h)//2} cm²",
        ]
        diagram = get_diagram("triangle", {"a": b, "b": h, "c": ""})

    # ---------------- PARALLELOGRAM ----------------
    elif shape == "parallelogram":
        b = random.randint(6, 14)
        h = random.randint(4, 10)
        correct = f"{b*h} cm²"
        options, ans = shuffle_options(correct, [f"{2*b*h} cm²", f"{b+h} cm²", f"{b*h+h} cm²"])
        question = f"Find the area of a parallelogram with base {b} cm and height {h} cm."
        steps = [
            "Formula: Area of parallelogram = base × height",
            f"Substitute: {b} × {h} = {b*h}",
            f"Answer: {b*h} cm²",
        ]
        diagram = get_diagram("parallelogram", {"a": b, "b": h})

    # ---------------- TRAPEZIUM ----------------
    else:
        a = random.randint(4, 10)
        b = random.randint(6, 14)
        h = random.randint(4, 8)
        correct = f"{((a+b)*h)//2} cm²"
        options, ans = shuffle_options(correct, [f"{(a+b)*h} cm²", f"{a*b*h} cm²", f"{(a+b)} cm²"])
        question = f"Find the area of a trapezium with parallel sides {a} cm and {b} cm, and height {h} cm."
        steps = [
            "Formula: Area of trapezium = ½ × (sum of parallel sides) × height",
            f"Substitute: ½ × ({a} + {b}) × {h} = ½ × {a+b} × {h} = {((a+b)*h)//2}",
            f"Answer: {((a+b)*h)//2} cm²",
        ]
        diagram = get_diagram("trapezium", {"a": a, "b": b, "h": h})

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Area",
        "needs_image": True,
        "svg_diagram": diagram["content"] if diagram else None,
        "steps": steps,
    }
