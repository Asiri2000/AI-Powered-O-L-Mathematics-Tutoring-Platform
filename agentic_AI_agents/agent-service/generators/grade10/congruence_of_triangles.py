import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["sss", "sas", "asa", "rhs", "reason"])

    if qtype == "sss":
        correct = "SSS"
        options, ans = shuffle_options(correct, ["SAS", "ASA", "RHS"])
        question = "Two triangles have three corresponding sides equal. Which congruence rule applies?"
        steps = [
            "SSS = Side-Side-Side congruence.",
            "If all three sides of one triangle equal the three sides of another — they are congruent.",
            "Answer: SSS",
        ]

    elif qtype == "sas":
        correct = "SAS"
        options, ans = shuffle_options(correct, ["SSS", "ASA", "RHS"])
        question = "Two sides and the included angle of one triangle are equal to another. Which rule proves congruence?"
        steps = [
            "SAS = Side-Angle-Side congruence.",
            "Two sides AND the angle between them must match.",
            "Answer: SAS",
        ]

    elif qtype == "asa":
        correct = "ASA"
        options, ans = shuffle_options(correct, ["SSS", "SAS", "RHS"])
        question = "Two angles and the included side of one triangle equal another. Which rule applies?"
        steps = [
            "ASA = Angle-Side-Angle congruence.",
            "Two angles AND the side between them must match.",
            "Answer: ASA",
        ]

    elif qtype == "rhs":
        correct = "RHS"
        options, ans = shuffle_options(correct, ["SSS", "SAS", "ASA"])
        question = "In two right-angled triangles, the hypotenuse and one side are equal. Which rule applies?"
        steps = [
            "RHS = Right angle-Hypotenuse-Side congruence.",
            "Applies only to right-angled triangles.",
            "Hypotenuse and one other side must match.",
            "Answer: RHS",
        ]

    else:
        correct = "Corresponding parts are equal"
        options, ans = shuffle_options(correct, ["Vertically opposite angles", "Alternate angles", "Angles in a straight line"])
        question = "If two triangles are congruent, why are their corresponding sides equal?"
        steps = [
            "Congruent triangles are identical in shape and size.",
            "All corresponding sides AND angles must be equal.",
            "Answer: Corresponding parts are equal",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Congruence of Triangles",
        "needs_image": True,
        "svg_diagram": None,
        "steps": steps,
    }
