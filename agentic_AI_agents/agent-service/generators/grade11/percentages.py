import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["convert_percentage", "percentage_of_quantity", "increase_decrease", "concept", "application"])

    if qtype == "convert_percentage":
        question = "Convert 25% into a fraction."
        correct = "1/4"
        wrongs = ["25/100", "2/5", "1/5"]
        steps = [
            "25% = 25/100",
            "Simplify by dividing by 25: 25/100 = 1/4",
            "Answer: 1/4",
        ]

    elif qtype == "percentage_of_quantity":
        percent = random.choice([10, 20, 25, 40])
        number = random.choice([50, 80, 120, 200])
        result = int((percent / 100) * number)
        question = f"Find {percent}% of {number}."
        correct = str(result)
        wrongs = [str(int((percent / 10) * number)), str(int((percent / 100) * (number / 2))), str(int(number / percent))]
        steps = [
            f"Formula: ({percent}/100) × {number}",
            f"= {percent} × {number} ÷ 100",
            f"= {percent * number} ÷ 100 = {result}",
            f"Answer: {result}",
        ]

    elif qtype == "increase_decrease":
        value = random.choice([200, 500, 800])
        percent = random.choice([10, 20, 25])
        new_val = int(value + (percent / 100) * value)
        question = f"A value of Rs. {value} is increased by {percent}%. What is the new value?"
        correct = str(new_val)
        wrongs = [str(int(value - (percent / 100) * value)), str(int(value * percent)), str(value)]
        steps = [
            f"Find {percent}% of {value}: ({percent}/100) × {value} = {int((percent/100)*value)}",
            f"New value = {value} + {int((percent/100)*value)} = {new_val}",
            f"Answer: {new_val}",
        ]

    elif qtype == "concept":
        question = "What does 100% represent?"
        correct = "The whole quantity"
        wrongs = ["Half of the quantity", "Double the quantity", "One part of the quantity"]
        steps = [
            "Per cent means 'per hundred'.",
            "100% = 100/100 = 1 = the whole thing.",
            "Answer: The whole quantity",
        ]

    else:
        question = "A student scored 72 marks out of 90. What is the percentage score?"
        correct = "80%"
        wrongs = ["72%", "90%", "75%"]
        steps = [
            "Percentage = (marks obtained / total marks) × 100",
            "= (72 / 90) × 100",
            "= 0.8 × 100 = 80%",
            "Answer: 80%",
        ]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Percentages",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
