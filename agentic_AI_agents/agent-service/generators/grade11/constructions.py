import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["identify", "true_false", "application", "concept"])

    if qtype == "identify":
        question = "Which instrument is essential to construct a perpendicular bisector?"
        correct = "Compass"
        wrongs = ["Protractor only", "Ruler only", "Set square"]
        steps = ["A compass draws arcs of fixed radius.", "Perpendicular bisectors require two arcs intersecting above and below.", "Answer: Compass"]

    elif qtype == "true_false":
        question = "A perpendicular bisector divides a line segment into two equal parts."
        correct = "True"
        wrongs = ["False", "Only for horizontal lines", "Cannot be determined"]
        steps = ["Perpendicular bisector: meets at 90° AND halves the segment.", "Answer: True"]

    elif qtype == "application":
        question = "Which construction is used to locate a point equidistant from two given points?"
        correct = "Perpendicular bisector"
        wrongs = ["Angle bisector", "Median", "Altitude"]
        steps = ["Every point on the perpendicular bisector of a segment is equidistant from both endpoints.", "Answer: Perpendicular bisector"]

    else:
        question = "Why is a compass used in geometric constructions?"
        correct = "To draw arcs with equal radius"
        wrongs = ["To measure angles", "To draw straight lines", "To calculate area"]
        steps = ["A compass can draw arcs of any fixed radius.", "This is needed to transfer lengths and find intersections.", "Answer: To draw arcs with equal radius"]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Constructions",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
