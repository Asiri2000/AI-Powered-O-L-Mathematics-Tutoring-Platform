import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["cube_volume", "cuboid_surface", "cylinder_volume", "sphere_surface"])

    if qtype == "cube_volume":
        a = random.randint(3, 8)
        correct = f"{a**3} cm³"
        options, ans = shuffle_options(correct, [f"{6*a*a} cm³", f"{a*a} cm³", f"{3*a} cm³"])
        question = f"Find the volume of a cube of side {a} cm."
        steps = [
            f"Formula: Volume of cube = side³",
            f"Substitute: {a}³ = {a} × {a} × {a}",
            f"= {a**3}",
            f"Answer: {a**3} cm³",
        ]

    elif qtype == "cuboid_surface":
        l, w, h = random.randint(4, 8), random.randint(3, 6), random.randint(2, 5)
        sa = 2*(l*w + l*h + w*h)
        correct = f"{sa} cm²"
        options, ans = shuffle_options(correct, [f"{l*w*h} cm²", f"{2*(l+w+h)} cm²", f"{l*w + w*h + l*h} cm²"])
        question = f"Find the total surface area of a cuboid: length {l} cm, width {w} cm, height {h} cm."
        steps = [
            f"Formula: TSA = 2(lw + lh + wh)",
            f"= 2({l}×{w} + {l}×{h} + {w}×{h})",
            f"= 2({l*w} + {l*h} + {w*h})",
            f"= 2 × {l*w + l*h + w*h} = {sa}",
            f"Answer: {sa} cm²",
        ]

    elif qtype == "cylinder_volume":
        r = random.randint(3, 6)
        h = random.randint(5, 10)
        vol = round(3.14*r*r*h, 2)
        correct = f"{vol} cm³"
        options, ans = shuffle_options(correct, [f"{round(2*3.14*r*h,2)} cm³", f"{round(3.14*r*r,2)} cm³", f"{round(3.14*r*h,2)} cm³"])
        question = f"Find the volume of a cylinder of radius {r} cm and height {h} cm. (Use π = 3.14)"
        steps = [
            f"Formula: Volume = π r² h",
            f"Substitute: 3.14 × {r}² × {h}",
            f"= 3.14 × {r*r} × {h} = {vol}",
            f"Answer: {vol} cm³",
        ]

    else:
        r = random.randint(3, 7)
        sa = round(4*3.14*r*r, 2)
        correct = f"{sa} cm²"
        options, ans = shuffle_options(correct, [f"{round(3.14*r*r,2)} cm²", f"{round(2*3.14*r*r,2)} cm²", f"{round(4*3.14*r,2)} cm²"])
        question = f"Find the surface area of a sphere of radius {r} cm. (Use π = 3.14)"
        steps = [
            f"Formula: Surface area of sphere = 4πr²",
            f"Substitute: 4 × 3.14 × {r}² = 4 × 3.14 × {r*r}",
            f"= {sa}",
            f"Answer: {sa} cm²",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Surface Area and Volume",
        "needs_image": True,
        "svg_diagram": None,
        "steps": steps,
    }
