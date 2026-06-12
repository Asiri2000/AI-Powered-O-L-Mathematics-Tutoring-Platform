import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty=3):
    qtype = random.choice(["total_frequency", "modal_value", "mean", "concept"])

    if qtype == "total_frequency":
        freqs = [random.randint(2, 6) for _ in range(4)]
        total = sum(freqs)
        correct = str(total)
        options, ans = shuffle_options(correct, [str(total - 1), str(total + 2), str(max(freqs))])
        question = f"Find the total frequency if the frequencies are {freqs}."
        steps = [
            f"Total frequency = sum of all frequencies",
            f"= {' + '.join(map(str, freqs))}",
            f"= {total}",
            f"Answer: {total}",
        ]

    elif qtype == "modal_value":
        correct = "The value with highest frequency"
        options, ans = shuffle_options(correct, ["The average value", "The middle value", "The smallest value"])
        question = "What is the mode of a frequency distribution?"
        steps = [
            "The mode is the most frequently occurring value.",
            "In a frequency table, look for the highest frequency.",
            "The corresponding value is the mode.",
            "Answer: The value with highest frequency",
        ]

    elif qtype == "mean":
        values = [random.randint(5, 15) for _ in range(4)]
        correct = str(sum(values) // len(values))
        options, ans = shuffle_options(correct, [str(max(values)), str(min(values)), str(sum(values))])
        question = f"Find the mean of the values: {values}."
        steps = [
            f"Mean = Sum of values ÷ Number of values",
            f"Sum = {' + '.join(map(str, values))} = {sum(values)}",
            f"Mean = {sum(values)} ÷ {len(values)} = {sum(values) // len(values)}",
            f"Answer: {sum(values) // len(values)}",
        ]

    else:
        correct = "Organizes data systematically"
        options, ans = shuffle_options(correct, ["Finds area", "Calculates speed", "Solves equations"])
        question = "What is the purpose of a frequency distribution table?"
        steps = [
            "A frequency distribution table lists data values with their frequencies.",
            "It helps identify patterns, modes, and ranges quickly.",
            "Answer: Organizes data systematically",
        ]

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Frequency Distributions",
        "needs_image": False,
        "svg_diagram": None,
        "steps": steps,
    }
