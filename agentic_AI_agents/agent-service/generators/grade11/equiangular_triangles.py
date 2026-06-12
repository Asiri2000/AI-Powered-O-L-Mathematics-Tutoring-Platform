import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["identify_property", "angle_measure", "true_false", "concept", "application"])

    if qtype == "identify_property":
        question = "Which of the following is true for equiangular triangles?"
        correct = "All corresponding angles are equal"
        wrongs = ["All sides are equal", "They have equal areas only", "Only one angle is equal"]
        steps = ["Equiangular = having equal angles.", "Two triangles equiangular to each other have all corresponding angles equal.", "Answer: All corresponding angles are equal"]

    elif qtype == "angle_measure":
        question = "If a triangle is equiangular, what is the measure of each angle?"
        correct = "60°"
        wrongs = ["45°", "90°", "30°"]
        steps = ["An equiangular triangle has all three angles equal.", "Sum = 180°, each angle = 180° ÷ 3 = 60°.", "Answer: 60°"]

    elif qtype == "true_false":
        question = "All equilateral triangles are equiangular."
        correct = "True"
        wrongs = ["False", "Only some are equiangular", "Cannot be determined"]
        steps = ["Equilateral → all sides equal → all angles equal (each 60°).", "Equal angles means equiangular.", "Answer: True"]

    elif qtype == "concept":
        question = "If two triangles are equiangular, what can be said about their sides?"
        correct = "Their corresponding sides are proportional"
        wrongs = ["Their sides are equal", "Their areas are equal", "Their sides are parallel"]
        steps = ["Equiangular triangles are similar (AA similarity).", "In similar triangles, corresponding sides are in proportion.", "Answer: Their corresponding sides are proportional"]

    else:
        question = "Two triangles are equiangular with sides in ratio 2:3. What is the ratio of their areas?"
        correct = "4 : 9"
        wrongs = ["2 : 3", "3 : 2", "6 : 9"]
        steps = ["For similar triangles, ratio of areas = (ratio of sides)².", "= 2²:3² = 4:9", "Answer: 4 : 9"]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Equiangular Triangles",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
