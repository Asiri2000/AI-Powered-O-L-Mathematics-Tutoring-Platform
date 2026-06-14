import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["notation", "elements", "union", "intersection", "concept"])

    if qtype == "notation":
        correct = "{1, 2, 3}"
        options, ans = shuffle_options(correct, ["{1, 2}", "{2, 3, 4}", "{1, 3}"])
        question = "Which of the following represents the set of natural numbers less than 4?"
        steps = [
            "Natural numbers less than 4 are: 1, 2, 3.",
            "In set notation: {1, 2, 3}",
            "Answer: {1, 2, 3}",
        ]

    elif qtype == "elements":
        correct = "3 ∈ A"
        options, ans = shuffle_options(correct, ["5 ∈ A", "6 ∈ A", "7 ∈ A"])
        question = "If A = {1, 2, 3, 4}, which of the following is true?"
        steps = [
            "The symbol ∈ means 'is an element of'.",
            "Check each option: 3 is listed in A = {1, 2, 3, 4}.",
            "Answer: 3 ∈ A",
        ]

    elif qtype == "union":
        correct = "{1, 2, 3, 4, 5}"
        options, ans = shuffle_options(correct, ["{1, 2}", "{3}", "{2, 3}"])
        question = "If A = {1, 2, 3} and B = {3, 4, 5}, what is A ∪ B?"
        steps = [
            "Union (∪) = all elements in either set.",
            "A ∪ B = {1, 2, 3} ∪ {3, 4, 5}",
            "Combine without repeating: {1, 2, 3, 4, 5}",
            "Answer: {1, 2, 3, 4, 5}",
        ]

    elif qtype == "intersection":
        correct = "{3}"
        options, ans = shuffle_options(correct, ["{1, 2, 3, 4, 5}", "{1, 2}", "{4, 5}"])
        question = "If A = {1, 2, 3} and B = {3, 4, 5}, what is A ∩ B?"
        steps = [
            "Intersection (∩) = elements common to both sets.",
            "A = {1, 2, 3}, B = {3, 4, 5}",
            "Common element: 3",
            "Answer: {3}",
        ]

    else:
        correct = "A set with no elements"
        options, ans = shuffle_options(correct, ["A set with one element", "An infinite set", "A universal set"])
        question = "What is an empty set?"
        steps = [
            "An empty set (also called null set) contains no elements.",
            "It is written as { } or ∅.",
            "Answer: A set with no elements",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Sets",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
