import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps
from services.diagram_factory import get_diagram


def generate(difficulty: int = 3):
    qtype = random.choice(["identify_property", "equal_areas", "calculate_area", "concept", "application"])

    if qtype == "identify_property":
        question = "Which plane figures on the same base between the same parallels have equal areas?"
        correct = "Parallelograms"
        wrongs = ["Triangles only", "Circles", "Trapeziums only"]
        steps = [
            "Theorem: Parallelograms on the same base between the same parallels are equal in area.",
            "This is because area = base × height, and height is the same (distance between parallels).",
            "Answer: Parallelograms",
        ]

    elif qtype == "equal_areas":
        question = "Two triangles lie between the same parallel lines and have the same base. What about their areas?"
        correct = "Their areas are equal"
        wrongs = ["One has double the area", "Their areas depend on shape", "Cannot be determined"]
        steps = [
            "Area of triangle = ½ × base × height",
            "Same base and same parallels → same height → same area.",
            "Answer: Their areas are equal",
        ]

    elif qtype == "calculate_area":
        base = random.randint(4, 10)
        height = random.randint(3, 8)
        area = base * height
        question = f"Find the area of a parallelogram with base {base} cm and height {height} cm."
        correct = f"{area} cm²"
        wrongs = [f"{base+height} cm²", f"{2*area} cm²", f"{area//2} cm²"]
        steps = [
            f"Formula: Area of parallelogram = base × height",
            f"= {base} × {height} = {area}",
            f"Answer: {area} cm²",
        ]
        diagram = get_diagram("parallelogram", {"a": base, "b": height})
        options, answer = shuffle_options(correct, wrongs)
        return {
            "question": question, "options": options, "correct_answer": answer,
            "difficulty": difficulty, "concept": "Areas of Plane Figures between Parallel Lines",
            "needs_image": True, "svg_diagram": diagram["content"] if diagram else None, "steps": steps,
        }

    elif qtype == "concept":
        question = "What determines the area of a triangle between two parallel lines?"
        correct = "Base and perpendicular height"
        wrongs = ["Length of sides only", "Angles of the triangle", "Position of the triangle"]
        steps = ["Area = ½ × base × height", "Height = perpendicular distance between parallels.", "Answer: Base and perpendicular height"]

    else:
        question = "Why do triangles on the same base and between the same parallels have equal areas?"
        correct = "They have the same base and height"
        wrongs = ["They have equal sides", "They are congruent", "They have equal angles"]
        steps = ["Area = ½ × base × height", "Same base and same height → same area.", "Answer: They have the same base and height"]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Areas of Plane Figures between Parallel Lines",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
