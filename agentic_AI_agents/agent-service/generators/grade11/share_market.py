import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["face_value", "market_value", "dividend_calculation", "gain_loss", "concept"])

    if qtype == "face_value":
        question = "What is meant by the face value of a share?"
        correct = "The original value of the share"
        wrongs = ["The current market price", "The selling price", "The profit gained"]
        steps = ["Face value = value printed on the share certificate.", "It is fixed and set by the company.", "Answer: The original value of the share"]

    elif qtype == "market_value":
        question = "What is meant by the market value of a share?"
        correct = "The price at which the share is bought or sold"
        wrongs = ["The value printed on the share", "The dividend amount", "The total profit"]
        steps = ["Market value changes with demand and supply.", "It is the price at which shares are traded.", "Answer: The price at which the share is bought or sold"]

    elif qtype == "dividend_calculation":
        face_value = random.choice([50, 100])
        div_pct = random.choice([5, 10, 12])
        shares = random.choice([20, 50, 100])
        div_per_share = (div_pct / 100) * face_value
        total_div = int(div_per_share * shares)
        question = f"A person owns {shares} shares of face value Rs. {face_value} each, paying a {div_pct}% dividend. Find total dividend."
        correct = f"Rs. {total_div}"
        wrongs = [f"Rs. {int(div_pct*shares)}", f"Rs. {int(face_value*shares)}", f"Rs. {int(div_pct*face_value)}"]
        steps = [
            f"Dividend per share = ({div_pct}/100) × {face_value} = Rs. {div_per_share}",
            f"Total dividend = {div_per_share} × {shares} = Rs. {total_div}",
            f"Answer: Rs. {total_div}",
        ]

    elif qtype == "gain_loss":
        face_value = random.choice([50, 100])
        market_value = face_value + random.choice([10, 20, 30])
        shares = random.choice([10, 20, 50])
        question = f"{shares} shares of face value Rs. {face_value} are bought at Rs. {market_value} each. Is this a gain or loss?"
        correct = "Loss"
        wrongs = ["Gain", "No profit or loss", "Cannot be determined"]
        steps = [
            f"Paid Rs. {market_value} per share but face value is Rs. {face_value}.",
            f"Paying more than face value = buying at a premium = Loss.",
            "Answer: Loss",
        ]

    else:
        question = "Dividend is calculated on which value of a share?"
        correct = "Face value"
        wrongs = ["Market value", "Selling price", "Buying price"]
        steps = ["Dividend % is always applied to the face value, not market value.", "Answer: Face value"]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Share Market",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
