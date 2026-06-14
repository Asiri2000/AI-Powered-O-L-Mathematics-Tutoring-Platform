import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    values = [random.randint(5, 20) for _ in range(4)]
    correct = str(max(values))
    options, ans = shuffle_options(correct, [str(min(values)), str(sum(values)), str(values[0])])
    steps = [
        f"We are given values: {values}",
        f"Compare all values to find the largest.",
        f"The highest value is {max(values)}.",
        f"Answer: {max(values)}",
    ]
    return {
        "question": f"The number of students in four classes are {values}. Which class has the highest number of students?",
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Data Representation",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
