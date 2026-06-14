"""
Fallback steps generator for any question type that doesn't have
custom step-by-step logic. Returns a generic 3-step guide.
"""


def default_steps(correct_answer: str, concept: str = "") -> list:
    """
    Returns a generic 3-step explanation when a topic-specific
    step-by-step solution is not available.
    """
    return [
        f"Read the question carefully and identify the key information given.",
        f"Recall and apply the correct formula or rule for {concept}." if concept else
        "Recall and apply the correct formula or mathematical rule.",
        f"The correct answer is: {correct_answer}",
    ]
