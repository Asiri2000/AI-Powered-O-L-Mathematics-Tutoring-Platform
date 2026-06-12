import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["basic_probability", "dice_probability", "card_probability", "complement_rule", "application"])

    if qtype == "basic_probability":
        question = "A fair coin is tossed once. What is the probability of getting a head?"
        correct = "1/2"
        wrongs = ["1", "0", "2"]
        steps = ["Sample space = {H, T}, 2 outcomes.", "Favourable outcomes = 1 (Head).", "P(H) = 1/2", "Answer: 1/2"]

    elif qtype == "dice_probability":
        question = "A fair die is thrown once. What is the probability of getting a number greater than 4?"
        correct = "1/3"
        wrongs = ["1/6", "1/2", "2/3"]
        steps = ["Numbers > 4: {5, 6} — 2 outcomes.", "Total outcomes = 6.", "P = 2/6 = 1/3", "Answer: 1/3"]

    elif qtype == "card_probability":
        question = "A card is drawn at random from a deck of 52 cards. What is the probability of getting a heart?"
        correct = "1/4"
        wrongs = ["1/13", "1/52", "1/2"]
        steps = ["A deck has 4 suits, each with 13 cards.", "Hearts = 13 cards out of 52.", "P = 13/52 = 1/4", "Answer: 1/4"]

    elif qtype == "complement_rule":
        question = "If P(A) = 0.35, what is P(not A)?"
        correct = "0.65"
        wrongs = ["0.35", "1.35", "0"]
        steps = ["Complement rule: P(A′) = 1 − P(A)", "= 1 − 0.35 = 0.65", "Answer: 0.65"]

    else:
        question = "A bag has 5 red and 3 blue balls. What is the probability of drawing a blue ball?"
        correct = "3/8"
        wrongs = ["5/8", "1/3", "1/2"]
        steps = ["Total balls = 5 + 3 = 8", "Blue balls = 3", "P(blue) = 3/8", "Answer: 3/8"]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Probability",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
