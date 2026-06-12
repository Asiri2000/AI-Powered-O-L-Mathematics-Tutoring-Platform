import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps
from services.diagram_factory import get_diagram


def generate(difficulty=3):
    qtype = random.choice([
        "angle_sum", "missing_angle", "isosceles",
        "equilateral", "exterior_angle", "right_triangle", "classification"
    ])

    diagram = None

    if qtype == "angle_sum":
        correct = "180°"
        options, ans = shuffle_options(correct, ["90°", "360°", "270°"])
        question = "Find the sum of the interior angles of a triangle."
        steps = [
            "The interior angles of any triangle always add up to 180°.",
            "This is a fundamental theorem in geometry.",
            "Answer: 180°",
        ]
        diagram = get_diagram("triangle", {"a": "a", "b": "b", "c": "c"})

    elif qtype == "missing_angle":
        a = random.randint(30, 80)
        b = random.randint(30, 80)
        c = 180 - (a + b)
        correct = f"{c}°"
        options, ans = shuffle_options(correct, [f"{a}°", f"{b}°", f"{180-c}°"])
        question = f"In a triangle, two angles are {a}° and {b}°. Find the third angle."
        steps = [
            f"Sum of all angles in a triangle = 180°",
            f"Third angle = 180° − {a}° − {b}°",
            f"= 180° − {a+b}° = {c}°",
            f"Answer: {c}°",
        ]

    elif qtype == "isosceles":
        base = random.randint(30, 60)
        equal = (180 - base) // 2
        correct = f"{equal}°"
        options, ans = shuffle_options(correct, [f"{base}°", f"{180-base}°", f"{equal+10}°"])
        question = f"In an isosceles triangle, the base angle is {base}°. Find one of the equal angles."
        steps = [
            f"In an isoscopic triangle, two angles are equal.",
            f"Total = 180°. Base angle = {base}°. Remaining = 180° − {base}° = {180-base}°",
            f"Two equal angles share this: {180-base}° ÷ 2 = {equal}°",
            f"Answer: {equal}°",
        ]

    elif qtype == "equilateral":
        correct = "60°"
        options, ans = shuffle_options(correct, ["45°", "90°", "120°"])
        question = "Find the measure of each angle of an equilateral triangle."
        steps = [
            "An equilateral triangle has all three angles equal.",
            "Total = 180°. Each angle = 180° ÷ 3 = 60°.",
            "Answer: 60°",
        ]

    elif qtype == "exterior_angle":
        a = random.randint(30, 70)
        b = random.randint(30, 70)
        exterior = a + b
        correct = f"{exterior}°"
        options, ans = shuffle_options(correct, [f"{180-exterior}°", f"{a}°", f"{b}°"])
        question = f"The two interior opposite angles of a triangle are {a}° and {b}°. Find the exterior angle."
        steps = [
            "Exterior angle theorem: exterior angle = sum of the two opposite interior angles.",
            f"Exterior angle = {a}° + {b}° = {exterior}°",
            f"Answer: {exterior}°",
        ]

    elif qtype == "right_triangle":
        angle = random.choice([30, 45, 60])
        other = 90 - angle
        correct = f"{other}°"
        options, ans = shuffle_options(correct, [f"{angle}°", "90°", "180°"])
        question = f"In a right-angled triangle, one acute angle is {angle}°. Find the other acute angle."
        steps = [
            f"Sum of angles in triangle = 180°",
            f"Right angle = 90°. One acute angle = {angle}°",
            f"Other angle = 180° − 90° − {angle}° = {other}°",
            f"Answer: {other}°",
        ]
        diagram = get_diagram("right_triangle", {"a": angle, "b": other})

    else:
        correct = "Isosceles"
        options, ans = shuffle_options(correct, ["Scalene", "Equilateral", "Right-angled"])
        question = "A triangle has two equal sides. What type of triangle is this?"
        steps = [
            "A triangle with all sides different = Scalene",
            "A triangle with all sides equal = Equilateral",
            "A triangle with exactly two equal sides = Isosceles",
            "Answer: Isosceles",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Triangles",
        "needs_image": True,
        "svg_diagram": diagram["content"] if diagram else None,
        "steps": steps,
    }
