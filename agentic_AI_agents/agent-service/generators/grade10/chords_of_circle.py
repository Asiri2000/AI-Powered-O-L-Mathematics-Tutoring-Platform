import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["equal_chords", "distance", "concept", "diameter"])

    if qtype == "equal_chords":
        correct = "They are equidistant from the center"
        options, ans = shuffle_options(correct, ["They form a diameter", "They intersect at right angles", "They are tangents"])
        question = "What can be said about equal chords of a circle?"
        steps = [
            "Theorem: Equal chords of a circle are equidistant from the centre.",
            "If chord AB = chord CD, then their perpendicular distances from the centre are equal.",
            "Answer: They are equidistant from the center",
        ]

    elif qtype == "distance":
        correct = "The longer chord is nearer to the center"
        options, ans = shuffle_options(correct, ["The shorter chord is nearer", "Both are equally distant", "Distance cannot be compared"])
        question = "Which chord of a circle is nearer to the center?"
        steps = [
            "The longer a chord, the closer it is to the centre.",
            "The diameter is the longest chord and passes through the centre.",
            "Answer: The longer chord is nearer to the center",
        ]

    elif qtype == "diameter":
        correct = "The longest chord of the circle"
        options, ans = shuffle_options(correct, ["The shortest chord", "A tangent line", "A radius"])
        question = "What is a diameter of a circle?"
        steps = [
            "A diameter passes through the centre of the circle.",
            "It connects two points on the circle AND passes through the centre.",
            "It is the longest possible chord.",
            "Answer: The longest chord of the circle",
        ]

    else:
        correct = "A line segment joining two points on a circle"
        options, ans = shuffle_options(correct, ["A line touching the circle", "A radius", "A diameter"])
        question = "What is a chord of a circle?"
        steps = [
            "A chord starts and ends on the circle (circumference).",
            "It does NOT have to pass through the centre.",
            "The diameter is a special chord that DOES pass through the centre.",
            "Answer: A line segment joining two points on a circle",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Chords of a Circle",
        "needs_image": True,
        "svg_diagram": None,
        "steps": steps,
    }
