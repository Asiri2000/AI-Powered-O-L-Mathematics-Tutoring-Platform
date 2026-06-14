import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["identify_chart", "mean_calculation", "mode_median", "interpretation", "concept"])

    if qtype == "identify_chart":
        question = "Which type of diagram is best suited to compare different categories?"
        correct = "Bar chart"
        wrongs = ["Line graph", "Pie chart", "Histogram"]
        steps = ["Bar charts use bars of different heights/lengths to compare categories visually.", "Answer: Bar chart"]

    elif qtype == "mean_calculation":
        values = [random.randint(5, 15) for _ in range(5)]
        total = sum(values)
        mean = round(total / len(values), 2)
        question = f"Find the mean of: {', '.join(map(str, values))}."
        correct = str(mean)
        wrongs = [str(total), str(len(values)), str(round(total / (len(values) - 1), 2))]
        steps = [
            f"Mean = Sum ÷ Count",
            f"Sum = {' + '.join(map(str, values))} = {total}",
            f"Count = {len(values)}",
            f"Mean = {total} ÷ {len(values)} = {mean}",
            f"Answer: {mean}",
        ]

    elif qtype == "mode_median":
        question = "Which measure of central tendency represents the most frequent value?"
        correct = "Mode"
        wrongs = ["Mean", "Median", "Range"]
        steps = ["Mode = value that appears most often in the data set.", "Answer: Mode"]

    elif qtype == "interpretation":
        question = "If the mean of a data set is 20, what is the total of 5 observations?"
        correct = "100"
        wrongs = ["25", "20", "5"]
        steps = ["Mean = Total ÷ Count", "Total = Mean × Count = 20 × 5 = 100", "Answer: 100"]

    else:
        question = "Which of the following is NOT a measure of central tendency?"
        correct = "Range"
        wrongs = ["Mean", "Median", "Mode"]
        steps = ["Measures of central tendency: Mean, Median, Mode.", "Range measures spread, not centre.", "Answer: Range"]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Data Representation and Interpretation",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
